from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.models.database import get_db
from app.models.models import User
from app.services.user_id_service import generate_user_id

router = APIRouter()

class UserCreateRequest(BaseModel):
    grade_level: Optional[str] = None
    class_level: Optional[int] = None

class UserResponse(BaseModel):
    user_id: str
    user: dict
    
    class Config:
        from_attributes = True

@router.post("", response_model=UserResponse)
async def create_user(
    request: UserCreateRequest,
    db: Session = Depends(get_db)
):
    """
    Create a new user with an 8-digit numeric ID.
    Can create user without grade/class (for initial ID generation),
    or with grade/class (for complete user creation).
    """
    try:
        user_id = generate_user_id(db)
        
        # If grade_level and class_level are provided, create complete user
        if request.grade_level and request.class_level:
            if request.grade_level not in ['SMP', 'SMA']:
                raise HTTPException(status_code=400, detail="grade_level must be 'SMP' or 'SMA'")
            if request.class_level not in range(7, 13):
                raise HTTPException(status_code=400, detail="class_level must be between 7 and 12")
            
            user = User(
                id=user_id,
                grade_level=request.grade_level,
                class_level=request.class_level
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Create user with default values (will be updated later)
            user = User(
                id=user_id,
                grade_level='SMP',  # Default, will be updated
                class_level=7  # Default, will be updated
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        return UserResponse(
            user_id=user_id,
            user={
                "id": user.id,
                "grade_level": user.grade_level,
                "class_level": user.class_level,
                "created_at": user.created_at.isoformat() if user.created_at else None
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        # Log the error and return a more helpful message
        import traceback
        error_detail = str(e)
        error_type = type(e).__name__
        
        # Check for common database errors
        if "relation" in error_detail.lower() and "does not exist" in error_detail.lower():
            raise HTTPException(
                status_code=500,
                detail=f"Database tables not found. Please run migrations first. Error: {error_type}: {error_detail}"
            )
        elif "could not translate host name" in error_detail.lower() or "no such host is known" in error_detail.lower():
            raise HTTPException(
                status_code=500,
                detail=f"Database hostname cannot be resolved. Possible causes: 1) Supabase project is paused (check Supabase dashboard), 2) Network/DNS issue, 3) Incorrect DATABASE_URL. Error: {error_type}: {error_detail}"
            )
        elif "connection" in error_detail.lower() or "connect" in error_detail.lower() or "operationalerror" in error_type.lower():
            raise HTTPException(
                status_code=500,
                detail=f"Database connection failed. Check: 1) DATABASE_URL in .env file, 2) Supabase project is active, 3) Network connectivity. Error: {error_type}: {error_detail}"
            )
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Internal server error: {error_type}: {error_detail}"
            )

@router.get("/{user_id}")
async def get_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    """Get user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "grade_level": user.grade_level,
        "class_level": user.class_level,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }

class UserUpdateRequest(BaseModel):
    grade_level: Optional[str] = None
    class_level: Optional[int] = None

@router.patch("/{user_id}")
async def update_user(
    user_id: str,
    request: UserUpdateRequest,
    db: Session = Depends(get_db)
):
    """Update user's grade level and class level"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if request.grade_level:
        if request.grade_level not in ['SMP', 'SMA']:
            raise HTTPException(status_code=400, detail="grade_level must be 'SMP' or 'SMA'")
        user.grade_level = request.grade_level
    
    if request.class_level:
        if request.class_level not in range(7, 13):
            raise HTTPException(status_code=400, detail="class_level must be between 7 and 12")
        user.class_level = request.class_level
    
    db.commit()
    db.refresh(user)
    
    return {
        "id": user.id,
        "grade_level": user.grade_level,
        "class_level": user.class_level,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }

@router.get("/{user_id}/validate")
async def validate_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    """Validate if user ID exists"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"valid": True, "user_id": user_id}

