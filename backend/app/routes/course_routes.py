from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.course import Course
from app.schemas.course_schema import CourseCreate, CourseRead

router = APIRouter(prefix="/api/courses", tags=["courses"])


@router.get("/", response_model=List[CourseRead])
def get_all_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()


@router.get("/{course_id}", response_model=CourseRead)
def get_course(course_id: int, db: Session = Depends(get_db)):
    return db.query(Course).filter(Course.id == course_id).first()


@router.post("/", response_model=CourseRead)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course
