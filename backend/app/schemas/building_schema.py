from pydantic import BaseModel


class BuildingCreate(BaseModel):
    name: str
    campus_id: int


class BuildingRead(BaseModel):
    id: int
    name: str
    campus_id: int

    class Config:
        from_attributes = True
