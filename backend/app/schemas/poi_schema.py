from pydantic import BaseModel
from typing import Optional


class PoiCreate(BaseModel):
    name: str
    category: Optional[str] = None
    building_id: int


class PoiRead(BaseModel):
    id: int
    name: str
    category: Optional[str]
    building_id: int

    class Config:
        from_attributes = True
