from pydantic import BaseModel
from typing import Optional, List


class ExamInCourse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CourseInCampus(BaseModel):
    id: int
    name: str
    fees: int
    eligibility: Optional[str] = None
    stream: Optional[str] = None
    exams: List[ExamInCourse] = []

    class Config:
        from_attributes = True


class CampusCreate(BaseModel):
    name: str
    location: str


class CampusRead(BaseModel):
    id: int
    name: str
    location: str
    courses: List[CourseInCampus] = []
    min_fee: Optional[int] = None
    max_fee: Optional[int] = None

    class Config:
        from_attributes = True
