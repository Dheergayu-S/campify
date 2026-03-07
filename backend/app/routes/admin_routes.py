from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.campus import Campus
from app.models.course import Course
from app.models.user import User
from app.auth import get_admin_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/admin", tags=["Admin"])


# Schemas
class CampusCreate(BaseModel):
    name: str
    location: str
    website: Optional[str] = None

class CampusUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None

class CourseCreate(BaseModel):
    name: str
    campus_id: int
    fees: int
    eligibility: Optional[str] = None
    stream: Optional[str] = None

class CourseUpdate(BaseModel):
    name: Optional[str] = None
    fees: Optional[int] = None
    eligibility: Optional[str] = None
    stream: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None


import re

def validate_college_name(name: str):
    if not re.match(r"^[A-Za-z .,'()&\-]+$", name):
        raise HTTPException(status_code=400, detail="College name must contain only letters and basic punctuation (no numbers)")

def validate_fees(fees: int):
    if fees < 0:
        raise HTTPException(status_code=400, detail="Fees cannot be negative")
    if fees > 1000000:
        raise HTTPException(status_code=400, detail="Fees cannot exceed ₹10,00,000 (10 lakhs)")


# Dashboard Stats
@router.get("/stats")
def get_stats(admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    from sqlalchemy import func
    return {
        "total_colleges": db.query(Campus).count(),
        "total_courses": db.query(func.count(func.distinct(Course.name))).scalar(),
        "total_users": db.query(User).count()
    }


# College CRUD
@router.post("/colleges")
def add_college(data: CampusCreate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    validate_college_name(data.name)
    campus = Campus(name=data.name, location=data.location, website=data.website)
    db.add(campus)
    db.commit()
    db.refresh(campus)
    return {"message": "College added", "id": campus.id, "name": campus.name}


@router.put("/colleges/{college_id}")
def update_college(college_id: int, data: CampusUpdate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    college = db.query(Campus).filter(Campus.id == college_id).first()
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    if data.name:
        validate_college_name(data.name)
        college.name = data.name
    if data.location:
        college.location = data.location
    if data.website is not None:
        college.website = data.website
    db.commit()
    return {"message": "College updated"}


@router.delete("/colleges/{college_id}")
def delete_college(college_id: int, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    college = db.query(Campus).filter(Campus.id == college_id).first()
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    db.query(Course).filter(Course.campus_id == college_id).delete()
    db.delete(college)
    db.commit()
    return {"message": f"'{college.name}' deleted"}


# Course CRUD
@router.post("/courses")
def add_course(data: CourseCreate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    if not db.query(Campus).filter(Campus.id == data.campus_id).first():
        raise HTTPException(status_code=404, detail="College not found")
    validate_fees(data.fees)
    course = Course(name=data.name, campus_id=data.campus_id, fees=data.fees,
                    eligibility=data.eligibility, stream=data.stream)
    db.add(course)
    db.commit()
    return {"message": "Course added", "id": course.id}


@router.put("/courses/{course_id}")
def update_course(course_id: int, data: CourseUpdate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    if data.name:
        course.name = data.name
    if data.fees:
        validate_fees(data.fees)
        course.fees = data.fees
    if data.eligibility:
        course.eligibility = data.eligibility
    if data.stream:
        course.stream = data.stream
    db.commit()
    return {"message": "Course updated"}


@router.delete("/courses/{course_id}")
def delete_course(course_id: int, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"message": f"'{course.name}' deleted"}


# Users List
@router.get("/users")
def get_users(admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users]


# Update User (change role)
@router.put("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot modify your own account")
    if data.name:
        user.name = data.name
    if data.role and data.role in ('user', 'admin'):
        user.role = data.role
    db.commit()
    return {"message": f"User '{user.name}' updated"}


# Delete User
@router.delete("/users/{user_id}")
def delete_user(user_id: int, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    db.delete(user)
    db.commit()
    return {"message": f"User '{user.name}' deleted"}
