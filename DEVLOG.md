# STUDYSEEKERS — Development Log

## Project Summary
StudySeekers is a college discovery platform for students in Southern Karnataka.
Built as a BCA final year project (2025-2026).

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL 16 + SQLAlchemy 2.x |
| Auth | JWT (python-jose + passlib) |
| Tools | Git, GitHub, VS Code, pgAdmin 4 |

## Features Implemented
- Search & filter colleges (location, course, stream, fees)
- 41 colleges across Southern Karnataka
- 10 unique courses (BCA, B.Com, BBA, MBA, MCA, etc.)
- JWT authentication (login/register with validation)
- Admin panel (CRUD colleges, courses, users)
- Wishlist (save/unsave colleges)
- Responsive Stripe-themed UI with CSS variables
- College cards with expandable course details

## Database Tables
- campuses (id, name, location, region, stream, min_fee, max_fee, contact, website)
- courses (id, campus_id, course_name, duration, fee)
- users (id, email, password_hash, name, role, created_at)
- wishlists (id, user_id, campus_id, created_at)
- buildings (id, campus_id, name, type)
- pois (id, campus_id, name, category)
- exams (id, course_id, exam_name)

## API Endpoints (15 total)
- POST /api/auth/register — Register new user
- POST /api/auth/login — Login user
- GET /api/auth/me — Get current user
- GET /api/campuses — List/filter campuses
- GET /api/campuses/{id} — Campus details
- GET /api/courses — List courses
- GET /api/buildings — List buildings
- GET /api/pois — List points of interest
- GET /api/exams — List exams
- GET /api/wishlist — Get user wishlist
- POST /api/wishlist/{campus_id} — Toggle wishlist
- POST /api/admin/campuses — Add campus
- PUT /api/admin/campuses/{id} — Update campus
- DELETE /api/admin/campuses/{id} — Delete campus
- GET /api/admin/users — List users
