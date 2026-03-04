from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import campus_router, building_router, poi_router, course_router, exam_router, auth_router, admin_router, wishlist_router

app = FastAPI(title="StudySeekers API")

# CORS - allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(campus_router)
app.include_router(building_router)
app.include_router(poi_router)
app.include_router(course_router)
app.include_router(exam_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(wishlist_router)


@app.get("/")
def root():
    return {"message": "StudySeekers API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
