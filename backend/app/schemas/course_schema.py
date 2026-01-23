from pydantic import BaseModel


class CourseCreate(BaseModel):
    name: str
    fees: int
    campus_id: int


class CourseRead(BaseModel):
    id: int
    name: str
    fees: int
    campus_id: int

    class Config:
        from_attributes = True
