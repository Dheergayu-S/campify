from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    fees = Column(Integer, nullable=False)
    eligibility = Column(Text, nullable=True)
    stream = Column(String(100), nullable=True)  # Engineering, Science, Management, etc.
    campus_id = Column(Integer, ForeignKey("campuses.id"), nullable=False)
    
    campus = relationship("Campus", back_populates="courses")
    exams = relationship("Exam", back_populates="course")
