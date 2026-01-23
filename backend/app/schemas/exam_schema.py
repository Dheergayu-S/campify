from pydantic import BaseModel


class ExamCreate(BaseModel):
    name: str
    course_id: int


class ExamRead(BaseModel):
    id: int
    name: str
    course_id: int

    class Config:
        from_attributes = True
