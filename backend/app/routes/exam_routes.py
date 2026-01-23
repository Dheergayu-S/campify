from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.exam import Exam
from app.schemas.exam_schema import ExamCreate, ExamRead

router = APIRouter(prefix="/api/exams", tags=["exams"])


@router.get("/", response_model=List[ExamRead])
def get_all_exams(db: Session = Depends(get_db)):
    return db.query(Exam).all()


@router.get("/{exam_id}", response_model=ExamRead)
def get_exam(exam_id: int, db: Session = Depends(get_db)):
    return db.query(Exam).filter(Exam.id == exam_id).first()


@router.post("/", response_model=ExamRead)
def create_exam(exam: ExamCreate, db: Session = Depends(get_db)):
    db_exam = Exam(**exam.model_dump())
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    return db_exam
