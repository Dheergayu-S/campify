from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Building(Base):
    __tablename__ = "buildings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    campus_id = Column(Integer, ForeignKey("campuses.id"))
    
    campus = relationship("Campus", back_populates="buildings")
    points_of_interest = relationship("PointOfInterest", back_populates="building")
