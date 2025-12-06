from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, JSON, Numeric, Text, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(8), primary_key=True)  # 8-digit numeric ID
    grade_level = Column(String(3), nullable=False)  # SMP or SMA
    class_level = Column(Integer, nullable=False)  # 7-12
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint("grade_level IN ('SMP', 'SMA')", name="check_grade_level"),
        CheckConstraint("class_level BETWEEN 7 AND 12", name="check_class_level"),
    )

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    short_code = Column(String, nullable=False)
    grade_level = Column(String(3), nullable=False)
    class_levels = Column(JSON, nullable=False)  # Array of integers

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(String, primary_key=True)
    topic_id = Column(String, ForeignKey("topics.id"), nullable=False)
    grade_level = Column(String(3), nullable=False)
    class_level = Column(Integer, nullable=False)
    
    prompt_text = Column(Text, nullable=False)
    prompt_image_url = Column(String, nullable=True)
    
    type = Column(String(10), nullable=False)  # 'mcq' only
    options = Column(JSON, nullable=False)  # Array for MCQ
    correct_option = Column(String, nullable=False)  # For MCQ
    
    explanation_text = Column(Text, nullable=True)
    
    source_year = Column(Integer, nullable=True)
    source_package = Column(String, nullable=True)
    source_number = Column(Integer, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint("type = 'mcq'", name="check_question_type"),
    )

class UserQuestionState(Base):
    __tablename__ = "user_question_state"
    
    user_id = Column(String(8), ForeignKey("users.id"), primary_key=True)
    question_id = Column(String, ForeignKey("questions.id"), primary_key=True)
    
    state = Column(String(20), nullable=False, default="new")  # new, learning, review, relearning
    stability = Column(Numeric, nullable=False, default=0)
    difficulty = Column(Numeric, nullable=False, default=0)
    reps = Column(Integer, nullable=False, default=0)
    lapses = Column(Integer, nullable=False, default=0)
    
    last_result_correct = Column(Boolean, nullable=True)
    last_reviewed_at = Column(DateTime(timezone=True), nullable=True)
    next_due_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(String, primary_key=True)
    user_id = Column(String(8), ForeignKey("users.id"), nullable=False)
    topic_id = Column(String, ForeignKey("topics.id"), nullable=False)
    
    status = Column(String(20), nullable=False, default="in_progress")
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    __table_args__ = (
        CheckConstraint("status IN ('in_progress', 'completed', 'abandoned')", name="check_session_status"),
    )

class SessionItem(Base):
    __tablename__ = "session_items"
    
    id = Column(String, primary_key=True)
    session_id = Column(String, ForeignKey("sessions.id"), nullable=False)
    question_id = Column(String, ForeignKey("questions.id"), nullable=False)
    
    sequence = Column(Integer, nullable=False)
    user_answer = Column(String, nullable=True)
    is_correct = Column(Boolean, nullable=True)
    answered_at = Column(DateTime(timezone=True), nullable=True)

