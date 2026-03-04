from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.campus import Campus
from app.models.building import Building
from app.models.course import Course
from app.schemas.campus_schema import CampusCreate, CampusRead

router = APIRouter(prefix="/api/campuses", tags=["campuses"])


def campus_to_response(campus: Campus) -> dict:
    """Convert campus to response with fee range"""
    courses = campus.courses
    min_fee = min((c.fees for c in courses), default=None)
    max_fee = max((c.fees for c in courses), default=None)
    
    return {
        "id": campus.id,
        "name": campus.name,
        "location": campus.location,
        "website": campus.website,
        "courses": [
            {
                "id": c.id, 
                "name": c.name, 
                "fees": c.fees,
                "eligibility": c.eligibility,
                "stream": c.stream,
                "exams": [{"id": e.id, "name": e.name} for e in c.exams]
            } for c in courses
        ],
        "min_fee": min_fee,
        "max_fee": max_fee
    }


@router.get("/")
def get_all_campuses(db: Session = Depends(get_db)):
    campuses = db.query(Campus).all()
    return [campus_to_response(c) for c in campuses]


@router.get("/{campus_id}")
def get_campus(campus_id: int, db: Session = Depends(get_db)):
    campus = db.query(Campus).filter(Campus.id == campus_id).first()
    if campus:
        return campus_to_response(campus)
    return None


@router.get("/{campus_id}/buildings")
def get_campus_buildings(campus_id: int, db: Session = Depends(get_db)):
    buildings = db.query(Building).filter(Building.campus_id == campus_id).all()
    return [{"id": b.id, "name": b.name} for b in buildings]


@router.post("/", response_model=CampusRead)
def create_campus(campus: CampusCreate, db: Session = Depends(get_db)):
    db_campus = Campus(**campus.model_dump())
    db.add(db_campus)
    db.commit()
    db.refresh(db_campus)
    return db_campus
