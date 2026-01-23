📘 SMART_CAMPUS_MASTER_SPEC.md
(Complete Architecture + Rules + Functionalities + API Contracts + DB Schema + UI Layout)
🏛️ SMART CAMPUS FINDER — MASTER SPECIFICATION

This document defines the complete, final architecture for the Smart Campus Finder project.
Every agent must follow this specification strictly. No feature deviation is allowed.

1️⃣ PROJECT SUMMARY

Smart Campus Finder is a web application that allows users to search and filter colleges based on:

Location

Courses Offered

Fees

Hostel, infrastructure, and facility details are out of scope as per guide instructions.

The project must remain simple, fast, and portfolio-ready.

2️⃣ TECH STACK
Frontend

React.js

HTML + CSS or Tailwind

Axios for API requests

Backend

Node.js

Express.js

PostgreSQL 16

pg (node-postgres) library

Deployment

Frontend → Vercel

Backend → Render

Database → PostgreSQL (Neon/Supabase/local)

3️⃣ FUNCTIONAL SCOPE (STRICT)
Features INCLUDED

Display list of colleges

Filter by:

Location

Courses Offered

Fees range

Responsive UI

Clean college cards with basic details

Features EXCLUDED (Do NOT include)

Hostel availability

Hostel fees

Infrastructure details

Amenities/facilities

Reviews, ratings, comments

Authentication/login

Admin panel

These exclusions are mandatory.

4️⃣ DATABASE SCHEMA (PostgreSQL 16 ONLY)
Table: colleges
CREATE TABLE colleges (
  id SERIAL PRIMARY KEY,
  college_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  fees INT NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20)
);

Table: courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) UNIQUE NOT NULL
);

Table: college_courses

(Many-to-many join table)

CREATE TABLE college_courses (
  college_id INT REFERENCES colleges(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  PRIMARY KEY (college_id, course_id)
);

5️⃣ BACKEND API SPECIFICATION

Base URL: /api/colleges

GET /api/colleges
Query Parameters:
location   (optional)
course     (optional)
minFee     (optional)
maxFee     (optional)

SQL Logic:

Dynamic filtering must use safe parameterized queries.

Sample query logic:

SELECT c.id, c.college_name, c.location, c.fees,
       ARRAY(
           SELECT course_name 
           FROM courses cr 
           JOIN college_courses cc ON cc.course_id = cr.id
           WHERE cc.college_id = c.id
       ) AS courses
FROM colleges c
WHERE ($1::text IS NULL OR c.location = $1)
  AND ($2::int IS NULL OR c.fees >= $2)
  AND ($3::int IS NULL OR c.fees <= $3)
  AND ($4::text IS NULL OR EXISTS (
        SELECT 1 FROM courses cr
        JOIN college_courses cc ON cc.course_id = cr.id
        WHERE cc.college_id = c.id AND cr.course_name = $4
      ));

Response Format:
[
  {
    "id": 1,
    "college_name": "ABC College",
    "location": "Mysore",
    "fees": 45000,
    "courses": ["BCA", "BBA"],
    "contact_email": "info@abc.com",
    "contact_phone": "9876543210"
  }
]

6️⃣ BACKEND RULES

Use Express.js router structure

Use async/await

Use pg (node-postgres)

Input validation required

Return empty array, not errors, when no colleges match

NO authentication

NO admin dashboard

NO additional models

7️⃣ FRONTEND ARCHITECTURE (REACT)
Folder Structure
src/
  components/
    Filters.jsx
    CollegeCard.jsx
  pages/
    Home.jsx
  api/
    colleges.js

Components
Filters.jsx

Contains:

Location dropdown

Courses dropdown

Fee range slider (min–max)

"Apply Filters" button

CollegeCard.jsx

Shows:

College name

Location

Fees

List of courses

Contact info

Home.jsx

Fetch all colleges on load

Re-fetch when filters change

Handle loading and empty results

8️⃣ FRONTEND RULES

Do NOT add authentication

Do ALTER USER postgres PASSWORD 'campus123';ergayuyulska;fkjNOT add extra pages (keep it one-page + components)
Do NOT add extra pages (keep it one-page + components)

Keep UI minimal, professional, responsive

Frontend must always call backend via Axios

No additional filters allowed (hostel, infrastructure, etc.)

9️⃣ UI/UX BEHAVIOR SPEC
Filters Bar

Clean, simple design

Dropdowns and sliders

Mobile friendly (collapse into accordion)

Results

Grid layout

Smooth spacing

Cards must align

Error states:

“No colleges found” message

Loading spinner

🔟 DEPLOYMENT RULES
Frontend

Build → upload to Vercel

Must set VITE_API_BASE_URL for API

Backend

Deploy on Render

CORS must allow frontend domain

ENV variables:

PG_HOST

PG_PORT

PG_USER

PG_PASSWORD

PG_DATABASE

Database

Use external cloud PostgreSQL (Neon/Supabase) or permanent local instance

🔟+1 CODE QUALITY RULES

Consistent naming (camelCase for JS, snake_case for SQL)

Use .env for all secrets

Never hardcode database credentials

All SQL must be parameterized

All agents must follow this spec exactly

🔟+2 DO NOT VIOLATE RULES

❌ No hostel details
❌ No infrastructure
❌ No facilities
❌ No reviews
❌ No ratings
❌ No admin login
❌ No complex ML features
❌ No deviation in API path or schema

This spec is strict.

Day 2 (what we did so far):
Progress So Far:
Step	Status
✅ Created project structure	backend and frontend folders with all files
✅ Set up pgAdmin 4	Connected to Local PostgreSQL 16
✅ Changed PostgreSQL password	Set to campus123
✅ Updated .env	Added DB credentials
What's Left:
Step	Status
⏳ Create smart_campus database	Next
⏳ Create tables in database	Pending
⏳ Install Python dependencies	Pending
⏳ Run backend server	Pending
⏳ Install frontend dependencies	Pending
⏳ Run frontend	Pending
Ready to continue? Say "next" and I'll guide you to create the database.