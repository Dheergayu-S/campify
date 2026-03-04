from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.wishlist import Wishlist
from app.models.campus import Campus
from app.models.user import User
from app.auth import get_current_user

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])


@router.get("/")
def get_wishlist(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all campus IDs in user's wishlist"""
    items = db.query(Wishlist).filter(Wishlist.user_id == user.id).all()
    return [item.campus_id for item in items]


@router.post("/{campus_id}")
def add_to_wishlist(campus_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Add a college to wishlist"""
    if not db.query(Campus).filter(Campus.id == campus_id).first():
        raise HTTPException(status_code=404, detail="College not found")

    existing = db.query(Wishlist).filter(
        Wishlist.user_id == user.id, Wishlist.campus_id == campus_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already in wishlist")

    item = Wishlist(user_id=user.id, campus_id=campus_id)
    db.add(item)
    db.commit()
    return {"message": "Added to wishlist"}


@router.delete("/{campus_id}")
def remove_from_wishlist(campus_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Remove a college from wishlist"""
    item = db.query(Wishlist).filter(
        Wishlist.user_id == user.id, Wishlist.campus_id == campus_id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Not in wishlist")

    db.delete(item)
    db.commit()
    return {"message": "Removed from wishlist"}
