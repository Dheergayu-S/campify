from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.building import Building
from app.schemas.building_schema import BuildingCreate, BuildingRead

router = APIRouter(prefix="/api/buildings", tags=["buildings"])


@router.get("/", response_model=List[BuildingRead])
def get_all_buildings(db: Session = Depends(get_db)):
    return db.query(Building).all()


@router.get("/{building_id}", response_model=BuildingRead)
def get_building(building_id: int, db: Session = Depends(get_db)):
    return db.query(Building).filter(Building.id == building_id).first()


@router.post("/", response_model=BuildingRead)
def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    db_building = Building(**building.model_dump())
    db.add(db_building)
    db.commit()
    db.refresh(db_building)
    return db_building
