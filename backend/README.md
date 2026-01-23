# Smart Campus Finder - Backend

## Tech Stack
- FastAPI
- SQLAlchemy 2.x
- PostgreSQL (pg8000 driver)
- Pydantic v2
- Uvicorn

## Setup

1. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure `.env` with your PostgreSQL credentials.

4. Run server:
```bash
uvicorn app.main:app --reload --port 8000
```

API will be available at http://localhost:8000
