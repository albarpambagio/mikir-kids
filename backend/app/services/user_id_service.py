import random
from sqlalchemy.orm import Session
from app.models.models import User

def generate_user_id(db: Session) -> str:
    """
    Generate a unique 8-digit numeric user ID.
    Returns a string like "12345678"
    """
    max_attempts = 100
    for _ in range(max_attempts):
        # Generate 8-digit number
        user_id = str(random.randint(10000000, 99999999))
        
        # Check if ID already exists
        existing_user = db.query(User).filter(User.id == user_id).first()
        if not existing_user:
            return user_id
    
    raise Exception("Failed to generate unique user ID after multiple attempts")

