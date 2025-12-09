ction from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, case, and_, desc
from typing import List
from datetime import datetime, timedelta
from pydantic import BaseModel

from app.models.database import get_db
from app.models.models import User, UserQuestionState, Question, Topic, Session

router = APIRouter()

class DashboardStatsResponse(BaseModel):
    questions_due: int
    topics_mastered: int
    current_streak: int

class TopicStatResponse(BaseModel):
    topic_id: str
    name: str
    thumbnail_url: str | None = None
    questions_due: int
    total_questions: int
    mastery_level: int # 0-100 percentage
    status: str # "locked", "new", "in_progress", "mastered"

@router.get("/{user_id}/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(user_id: str, db: Session = Depends(get_db)):
    """
    Get aggregated dashboard statistics:
    - Questions due for review
    - Number of topics mastered (or active)
    - Current daily streak
    """
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    now = datetime.now()

    # 1. Questions Due
    # Count questions where next_due_at <= now AND state is not 'new'
    questions_due = db.query(UserQuestionState).filter(
        UserQuestionState.user_id == user_id,
        UserQuestionState.next_due_at <= now,
        UserQuestionState.state != 'new'
    ).count()

    # 2. Topics Mastered
    # For MVP: Count topics where the user has at least 5 questions with stability > 3 (arbitrary threshold)
    # Simplified for now: Just user "Active Topics" (topics with at least 1 answered question)
    active_topics_count = db.query(func.count(func.distinct(Question.topic_id)))\
        .join(UserQuestionState, UserQuestionState.question_id == Question.id)\
        .filter(UserQuestionState.user_id == user_id)\
        .scalar()

    # 3. Current Streak
    # Get recent sessions to calculate streak
    sessions = db.query(Session.started_at)\
        .filter(Session.user_id == user_id)\
        .order_by(Session.started_at.desc())\
        .limit(30)\
        .all()
    
    current_streak = 0
    if sessions:
        last_date = None
        today = now.date()
        
        # Check if user practiced today
        has_practiced_today = False
        session_dates = sorted(list(set(s.started_at.date() for s in sessions)), reverse=True)
        
        if not session_dates:
            current_streak = 0
        else:
            if session_dates[0] == today:
                current_streak = 1
                last_date = today
                session_dates.pop(0)
            elif session_dates[0] == today - timedelta(days=1):
                # Haven't practiced today but practiced yesterday
                last_date = today - timedelta(days=1)
            else:
                # Streak broken
                current_streak = 0
            
            # Count backwards
            if current_streak > 0 or last_date:
                check_date = last_date - timedelta(days=1)
                for date in session_dates:
                    if date == check_date:
                        current_streak += 1
                        check_date -= timedelta(days=1)
                    else:
                        break

    return DashboardStatsResponse(
        questions_due=questions_due,
        topics_mastered=active_topics_count or 0,
        current_streak=current_streak
    )

@router.get("/{user_id}/topics", response_model=List[TopicStatResponse])
async def get_dashboard_topics(user_id: str, db: Session = Depends(get_db)):
    """
    Get topic stats for the dashboard grid.
    Returns topics for the user's grade/class.
    """
    from sqlalchemy import case, func, and_
    from datetime import timezone

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get all active topics for grade
    topics = db.query(Topic).filter(Topic.grade_level == user.grade_level).all()
    
    filtered_topics_map = {}
    filtered_topic_ids = []
    
    for topic in topics:
        if user.class_level in topic.class_levels:
            filtered_topics_map[topic.id] = topic
            filtered_topic_ids.append(topic.id)
            
    if not filtered_topic_ids:
        return []

    now = datetime.now(timezone.utc)
    
    # Optimized Query:
    # 1. Join Questions with UserQuestionState
    # 2. Filter by topic IDs and user's class level
    # 3. Group by Topic
    # 4. Calculate aggregates
    
    results = db.query(
        Question.topic_id,
        func.count(Question.id).label("total_questions"),
        func.count(UserQuestionState.question_id).label("user_questions"),
        func.sum(
            case(
                (UserQuestionState.next_due_at <= now, 1),
                else_=0
            ) 
        ).label("questions_due")
    ).outerjoin(
        UserQuestionState, 
        and_(
            Question.id == UserQuestionState.question_id,
            UserQuestionState.user_id == user_id
        )
    ).filter(
        Question.topic_id.in_(filtered_topic_ids),
        Question.class_level == user.class_level
    ).group_by(Question.topic_id).all()
    
    stats = []
    
    # Process results
    for row in results:
        topic = filtered_topics_map.get(row.topic_id)
        if not topic: continue
        
        total_questions = row.total_questions or 0
        questions_due = int(row.questions_due or 0)
        # user_questions counts non-null UserQuestionState joins
        user_answered_count = row.user_questions or 0

        if total_questions == 0:
            continue
            
        if user_answered_count == 0:
             mastery = 0
             status = "new"
        else:
             mastery = int((user_answered_count / total_questions) * 100)
             if mastery > 90:
                 status = "mastered"
             else:
                 status = "in_progress"
                 
        stats.append(TopicStatResponse(
            topic_id=topic.id,
            name=topic.name,
            questions_due=questions_due,
            total_questions=total_questions,
            mastery_level=mastery,
            status=status
        ))
        
    return stats
