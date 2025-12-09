from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import uuid

from app.models.database import get_db
from app.models.models import User, Topic, Question, Session as DbSession, SessionItem, UserQuestionState

router = APIRouter()

class CreateSessionRequest(BaseModel):
    user_id: str
    topic_id: str
    session_size: int = 15

class QuestionResponse(BaseModel):
    id: str
    sequence: int
    type: str # 'mcq'
    prompt_text: str
    prompt_image_url: Optional[str] = None
    options: List[str]
    
class TopicSummary(BaseModel):
    id: str
    name: str

class CreateSessionResponse(BaseModel):
    session_id: str
    topic: TopicSummary
    questions: List[QuestionResponse]

@router.post("", response_model=CreateSessionResponse)
async def create_session(request: CreateSessionRequest, db: Session = Depends(get_db)):
    """
    Start a new practice session for a topic.
    Algorithm:
    1. Priority 1: Questions due for review (FSRS)
    2. Priority 2: New questions never seen
    3. Priority 3: (Optional fallback) Random review if exhausted
    """
    # 1. Validate User & Topic
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    topic = db.query(Topic).filter(Topic.id == request.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    # 2. Fetch Questions
    now = datetime.now(timezone.utc)
    
    # Priority 1: Due Questions
    # Join with UserQuestionState to check next_due_at
    due_questions = db.query(Question)\
        .join(UserQuestionState, Question.id == UserQuestionState.question_id)\
        .filter(
            UserQuestionState.user_id == request.user_id,
            Question.topic_id == request.topic_id,
            UserQuestionState.next_due_at <= now,
            Question.class_level == user.class_level
        )\
        .order_by(UserQuestionState.next_due_at.asc())\
        .limit(request.session_size)\
        .all()
        
    # Priority 2: New Questions
    remaining_slots = request.session_size - len(due_questions)
    new_questions = []
    
    if remaining_slots > 0:
        # Subquery for questions user has already seen
        seen_questions_subquery = db.query(UserQuestionState.question_id).filter(
            UserQuestionState.user_id == request.user_id
        )
        
        new_questions = db.query(Question).filter(
            Question.topic_id == request.topic_id,
            Question.class_level == user.class_level,
            ~Question.id.in_(seen_questions_subquery)
        )\
        .order_by(func.random())\
        .limit(remaining_slots)\
        .all()
        
    session_questions = due_questions + new_questions
    
    # Priority 3: Fallback (if total < session_size, just fill with random already-done questions)
    # This ensures the user can always practice even if "mastered" everything.
    remaining_slots = request.session_size - len(session_questions)
    if remaining_slots > 0:
         # Exclude questions we already picked
         picked_ids = [q.id for q in session_questions]
         
         extra_questions = db.query(Question).filter(
             Question.topic_id == request.topic_id,
             Question.class_level == user.class_level,
             ~Question.id.in_(picked_ids)
         )\
         .order_by(func.random())\
         .limit(remaining_slots)\
         .all()
         
         session_questions.extend(extra_questions)
    
    if not session_questions:
        # Should only happen if the topic has literally 0 questions in DB
        raise HTTPException(status_code=400, detail="No questions available for this topic/level")

    # 3. Create Session Record
    session_id = str(uuid.uuid4())
    session = DbSession(
        id=session_id,
        user_id=request.user_id,
        topic_id=request.topic_id,
        status="in_progress",
        started_at=now
    )
    db.add(session)
    
    # 4. Create Session Items
    response_questions = []
    for idx, q in enumerate(session_questions):
        sequence = idx + 1
        item = SessionItem(
            id=str(uuid.uuid4()),
            session_id=session_id,
            question_id=q.id,
            sequence=sequence
        )
        db.add(item)
        
        # Handle options safely
        options = q.options
        if isinstance(options, str):
            import json
            try:
                options = json.loads(options)
            except:
                options = []
        elif options is None:
            options = []
            
        response_questions.append(QuestionResponse(
            id=q.id,
            sequence=sequence,
            type=q.type,
            prompt_text=q.prompt_text,
            prompt_image_url=q.prompt_image_url,
            options=options
        ))
        
    db.commit()
    db.refresh(session)
    
    return CreateSessionResponse(
        session_id=session_id,
        topic=TopicSummary(id=topic.id, name=topic.name),
        questions=response_questions
    )

class SubmitAnswerRequest(BaseModel):
    user_id: str
    question_id: str
    answer: str # The option string or key, e.g. "A" or "A) ..."

class SubmitAnswerResponse(BaseModel):
    success: bool
    is_correct: bool
    correct_answer: str # We reveal it immediately per PRD "Immediately see which ones I got wrong" (Wait, PRD says session summary? 
                        # PRD 6.3 "Brief 'Tersimpan' confirmation", then "After last question... Session Summary".
                        # But 6.4 implies we show results at end.
                        # HOWEVER, MVP goals 2.1.2 says "Show them what they got wrong immediately after each session".
                        # Let's stick to PRD 8.2 API Contract: "We don't reveal the correct answer yet (wait for session summary)"
                        # So I will NOT return correct_answer here, just is_correct for internal logic if needed?
                        # Actually PRD 8.2 says: "is_correct": false. So we DO tell them.
    

@router.post("/{session_id}/answer", response_model=SubmitAnswerResponse)
async def submit_answer(
    session_id: str, 
    request: SubmitAnswerRequest, 
    db: Session = Depends(get_db)
):
    """
    Submit an answer for a question in a session.
    """
    now = datetime.now(timezone.utc)
    
    # 1. Get Session Item
    # We join with Session to verify user_id ownership implicitly or explicitly
    session_item = db.query(SessionItem).join(DbSession)\
        .filter(
            SessionItem.session_id == session_id,
            SessionItem.question_id == request.question_id,
            DbSession.user_id == request.user_id,
            DbSession.status == "in_progress"
        ).first()
        
    if not session_item:
        raise HTTPException(status_code=404, detail="Session item not found or session not active")
        
    # 2. Validate Answer
    question = db.query(Question).filter(Question.id == request.question_id).first()
    if not question:
         raise HTTPException(status_code=404, detail="Question not found")
    
    # Simple MCQ check: exact match of the option key (e.g. "A") or the full text?
    # Models.py says `correct_option`. Let's assume frontend sends "A".
    # We'll normalize to be safe.
    
    user_ans = (request.answer or "").strip()
    correct_opt = (question.correct_option or "")
    
    is_correct = (user_ans.lower() == correct_opt.lower())
    
    # 3. Update Session Item
    session_item.user_answer = user_ans
    session_item.is_correct = is_correct
    session_item.answered_at = now
    
    db.commit()
    
    # Note: We do NOT update FSRS state here. That happens at session completion.
    
    return SubmitAnswerResponse(
        success=True,
        is_correct=is_correct,
        correct_answer="" # Hidden for now as per PRD 8.2
    )

# Missing: POST /{session_id}/complete
