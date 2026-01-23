from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.poi import PointOfInterest
from app.schemas.poi_schema import PoiCreate, PoiRead

router = APIRouter(prefix="/api/pois", tags=["points_of_interest"])


@router.get("/", response_model=List[PoiRead])
def get_all_pois(db: Session = Depends(get_db)):
    return db.query(PointOfInterest).all()


@router.get("/{poi_id}", response_model=PoiRead)
def get_poi(poi_id: int, db: Session = Depends(get_db)):
    return db.query(PointOfInterest).filter(PointOfInterest.id == poi_id).first()


@router.post("/", response_model=PoiRead)
def create_poi(poi: PoiCreate, db: Session = Depends(get_db)):
    db_poi = PointOfInterest(**poi.model_dump())
    db.add(db_poi)
    db.commit()
    db.refresh(db_poi)
    return db_poi
