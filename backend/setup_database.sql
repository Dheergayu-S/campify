-- ============================================
-- SMART CAMPUS FINDER - DATABASE SETUP
-- Run this in pgAdmin after creating database 'campus_v2'
-- ============================================

-- Create Tables
CREATE TABLE IF NOT EXISTS campuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    campus_id INTEGER REFERENCES campuses(id)
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    campus_id INTEGER REFERENCES campuses(id),
    fees INTEGER,
    eligibility TEXT,
    stream VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course_id INTEGER REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS points_of_interest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    building_id INTEGER REFERENCES buildings(id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    college_email VARCHAR(255),
    verification_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing data
DELETE FROM exams;
DELETE FROM courses;
DELETE FROM points_of_interest;
DELETE FROM buildings;
DELETE FROM campuses;

-- Reset sequences
ALTER SEQUENCE campuses_id_seq RESTART WITH 1;
ALTER SEQUENCE courses_id_seq RESTART WITH 1;
ALTER SEQUENCE exams_id_seq RESTART WITH 1;

-- ============================================
-- INSERT ALL 41 COLLEGES
-- ============================================

INSERT INTO campuses (name, location) VALUES
('Maharaja''s College', 'JLB Road, Mysore - 570005'),
('Yuvaraja''s College (Autonomous)', 'JLB Road, Mysore - 570005'),
('University Evening College', 'JLB Road, Mysore - 570005'),
('University Fine Arts College', 'Manasagangothri, Mysore - 570006'),
('School of Engineering (UOM)', 'Manasagangothri, Mysore - 570006'),
('GFGC Kuvempunagar', 'Kuvempunagar, Mysore - 570023'),
('GFGC for Women, Vijayanagar', 'Vijayanagar, Mysore - 570017'),
('GFGC Siddharthanagar', 'Siddharthanagar, Mysore - 570011'),
('Maharani''s Arts College for Women', 'JLB Road, Mysore - 570005'),
('Maharani''s Science College for Women', 'JLB Road, Mysore - 570005'),
('Maharani''s Commerce & Management College', 'JLB Road, Mysore - 570005'),
('GFGC T. Narasipura', 'T. Narasipura, Mysore District'),
('GFGC Hullahalli', 'Hullahalli, Nanjanagud Taluk'),
('GFGC K.R. Nagar', 'K.R. Nagar, Mysore District'),
('GFGC Bannur', 'Bannur, Mysore District'),
('SBRR Mahajana First Grade College', 'Jayalakshmipuram, Mysore - 570012'),
('St. Philomena''s College', 'Bannimantap, Mysore - 570015'),
('Teresian College', 'Siddharthanagar, Mysore - 570011'),
('MMK & SDM Mahila Maha Vidyalaya', 'Krishnamurthypuram, Mysore - 570004'),
('JSS College of Arts, Commerce & Science', 'Ooty Road, Mysore - 570025'),
('JSS College for Women', 'Saraswathipuram, Mysore - 570009'),
('Vidyavardhaka First Grade College', 'Sheshadri Iyer Road, Mysore - 570001'),
('Basudev Somani College', 'Kuvempunagar, Mysore - 570023'),
('Mysore Institute of Commerce & Arts (MICA)', 'Mysore - 570001'),
('Sarada Vilas College', 'Krishnamurthypuram, Mysore - 570004'),
('D. Banumaiah''s Arts & Commerce College', 'Sayyaji Rao Road, Mysore - 570001'),
('Seshadripuram Degree College', 'Hebbal, Mysore - 570016'),
('MIT First Grade College', 'Industrial Suburb, Mysore - 570008'),
('Sri Kaveri First Grade College', 'Kuvempunagar, Mysore - 570023'),
('Mallamma Marimallappa College', 'Ramavilas Road, Mysore - 570024'),
('SJCE (JSS Science & Technology University)', 'Manasagangothri, Mysore - 570006'),
('National Institute of Engineering (NIE)', 'Manandavadi Road, Mysore - 570008'),
('Vidyavardhaka College of Engineering (VVCE)', 'Gokulam, Mysore - 570002'),
('GSSS Institute of Engineering for Women', 'KRS Road, Mysore - 570016'),
('Maharaja Institute of Technology (MITM)', 'Belavadi, Mysore - 570018'),
('ATME College of Engineering', 'Bannur Road, Mysore - 570028'),
('Vidya Vikas Institute of Engineering (VVIET)', 'Bannur Road, Mysore - 570028'),
('Mysore College of Engineering (MYCEM)', 'T. Narasipura Road, Mysore'),
('B.N. Bahadur Institute of Management (BIMS)', 'Manasagangothri, Mysore - 570006'),
('University School of Design', 'Manasagangothri, Mysore - 570006'),
('Bharath Matha First Grade College', 'Koppa, Periyapatna Taluk - 571107');

-- ============================================
-- INSERT COURSES
-- ============================================

INSERT INTO courses (name, campus_id, fees, eligibility, stream) VALUES
-- 1. Maharaja's College
('B.Com', 1, 18000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 1, 15000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('BBA', 1, 25000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),

-- 2. Yuvaraja's College
('B.Sc Computer Science', 2, 22000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('BCA', 2, 35000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),
('MCA', 2, 55000, 'Any Graduation with Mathematics at 10+2 or degree level. 50% marks (45% for SC/ST)', 'Computer Applications'),

-- 3. University Evening College
('B.Com', 3, 12000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 3, 10000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),

-- 4. University Fine Arts College
('BA Psychology', 4, 15000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),

-- 5. School of Engineering UOM
('B.Tech CSE', 5, 85000, '10+2 with Physics and Mathematics (45% aggregate)', 'Engineering'),
('B.E Computer Science', 5, 80000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 6. GFGC Kuvempunagar
('B.Com', 6, 8000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 6, 8000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 6, 10000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('BBA', 6, 12000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),

-- 7. GFGC for Women Vijayanagar
('B.Com', 7, 8000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 7, 8000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 7, 10000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),

-- 8. GFGC Siddharthanagar
('B.Com', 8, 8000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 8, 8000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 8, 10000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),

-- 9. Maharani's Arts College for Women
('BA Psychology', 9, 10000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('BCA', 9, 25000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 10. Maharani's Science College for Women
('B.Sc Computer Science', 10, 12000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('BCA', 10, 28000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 11. Maharani's Commerce & Management College
('B.Com', 11, 12000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 11, 20000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),
('MBA', 11, 45000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 12. GFGC T. Narasipura
('B.Com', 12, 6000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 12, 6000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),

-- 13. GFGC Hullahalli
('B.Com', 13, 5000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 13, 5000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),

-- 14. GFGC K.R. Nagar
('B.Com', 14, 6000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 14, 6000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 14, 8000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),

-- 15. GFGC Bannur
('B.Com', 15, 6000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BA Psychology', 15, 6000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 15, 8000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),

-- 16. SBRR Mahajana
('B.Sc Computer Science', 16, 30000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('B.Com', 16, 25000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BCA', 16, 40000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 17. St. Philomena's College
('B.Sc Computer Science', 17, 28000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('BA Psychology', 17, 22000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Com', 17, 24000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 18. Teresian College
('BA Psychology', 18, 25000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 18, 30000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('B.Com', 18, 26000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 19. MMK & SDM Mahila
('B.Com', 19, 22000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('B.Sc Computer Science', 19, 25000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('BCA', 19, 35000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 20. JSS College of Arts, Commerce & Science
('B.Sc Computer Science', 20, 35000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('B.Com', 20, 28000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BCA', 20, 45000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),
('MCA', 20, 65000, 'Any Graduation with Mathematics at 10+2 or degree level. 50% marks (45% for SC/ST)', 'Computer Applications'),

-- 21. JSS College for Women
('BA Psychology', 21, 20000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Sc Computer Science', 21, 28000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('B.Com', 21, 22000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 22. Vidyavardhaka First Grade College
('BA Psychology', 22, 20000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Com', 22, 22000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BCA', 22, 38000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 23. Basudev Somani College
('BA Psychology', 23, 18000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Com', 23, 20000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 23, 30000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),

-- 24. MICA
('B.Com', 24, 28000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 24, 35000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),
('MBA', 24, 60000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 25. Sarada Vilas College
('B.Sc Computer Science', 25, 30000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Science'),
('B.Com', 25, 25000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 26. D. Banumaiah's College
('BA Psychology', 26, 18000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Com', 26, 20000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 27. Seshadripuram Degree College
('B.Com', 27, 25000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 27, 32000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),
('MBA', 27, 55000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 28. MIT First Grade College
('B.Com', 28, 22000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BCA', 28, 35000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),

-- 29. Sri Kaveri First Grade College
('B.Com', 29, 20000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 29, 28000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),

-- 30. Mallamma Marimallappa College
('BA Psychology', 30, 15000, '10+2 in any stream from a recognized board', 'Arts / Commerce'),
('B.Com', 30, 18000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),

-- 31. SJCE JSS STU
('B.Tech CSE', 31, 125000, '10+2 with Physics and Mathematics (45% aggregate)', 'Engineering'),
('B.E Computer Science', 31, 120000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),
('MCA', 31, 85000, 'Any Graduation with Mathematics at 10+2 or degree level. 50% marks (45% for SC/ST)', 'Computer Applications'),
('MBA', 31, 95000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 32. NIE
('B.E Computer Science', 32, 110000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),
('MBA', 32, 80000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 33. VVCE
('B.E Computer Science', 33, 95000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),
('MBA', 33, 70000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 34. GSSS Institute of Engineering for Women
('B.E Computer Science', 34, 85000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 35. MITM
('B.Tech CSE', 35, 95000, '10+2 with Physics and Mathematics (45% aggregate)', 'Engineering'),
('B.E Computer Science', 35, 90000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 36. ATME College of Engineering
('B.E Computer Science', 36, 88000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 37. VVIET
('B.E Computer Science', 37, 82000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 38. MYCEM
('B.E Computer Science', 38, 75000, '10+2 with Physics, Chemistry, and Mathematics (PCM)', 'Engineering'),

-- 39. BIMS
('BBA', 39, 50000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management'),
('MBA', 39, 85000, 'Any Bachelor''s Degree with 50% (45% for reserved categories)', 'Management'),

-- 40. University School of Design
('B.Arch', 40, 150000, '10+2 with Mathematics as a mandatory subject (45% aggregate)', 'Specialized'),

-- 41. Bharath Matha First Grade College
('BCA', 41, 38000, '10+2 (any stream) with minimum 45% aggregate (40% for SC/ST/Cat-I)', 'Computer Applications'),
('B.Com', 41, 34000, '10+2 in any stream (Commerce preferred)', 'Arts / Commerce'),
('BBA', 41, 36000, '10+2 in any stream (Arts, Commerce, or Science)', 'Management');

-- ============================================
-- INSERT ENTRANCE EXAMS (Auto-generated)
-- ============================================

DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN SELECT id, name FROM courses LOOP
        IF rec.name = 'BCA' THEN
            INSERT INTO exams (name, course_id) VALUES ('Merit-based', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('UUCMS Selection', rec.id);
        ELSIF rec.name = 'MCA' THEN
            INSERT INTO exams (name, course_id) VALUES ('Karnataka PGCET', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('KMAT', rec.id);
        ELSIF rec.name = 'B.Sc Computer Science' THEN
            INSERT INTO exams (name, course_id) VALUES ('Merit-based (State Portal)', rec.id);
        ELSIF rec.name = 'B.Tech CSE' THEN
            INSERT INTO exams (name, course_id) VALUES ('KCET', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('COMEDK', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('JEE Main', rec.id);
        ELSIF rec.name = 'B.E Computer Science' THEN
            INSERT INTO exams (name, course_id) VALUES ('KCET', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('COMEDK', rec.id);
        ELSIF rec.name = 'BBA' THEN
            INSERT INTO exams (name, course_id) VALUES ('Merit-based', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('UUCMS Selection', rec.id);
        ELSIF rec.name = 'MBA' THEN
            INSERT INTO exams (name, course_id) VALUES ('Karnataka PGCET', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('KMAT', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('CAT', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('MAT', rec.id);
        ELSIF rec.name = 'B.Com' THEN
            INSERT INTO exams (name, course_id) VALUES ('Merit-based', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('UUCMS Selection', rec.id);
        ELSIF rec.name = 'BA Psychology' THEN
            INSERT INTO exams (name, course_id) VALUES ('Merit-based', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('UUCMS Selection', rec.id);
        ELSIF rec.name = 'B.Arch' THEN
            INSERT INTO exams (name, course_id) VALUES ('NATA', rec.id);
            INSERT INTO exams (name, course_id) VALUES ('JEE Main Paper 2', rec.id);
        END IF;
    END LOOP;
END $$;

-- Verify
SELECT 'Campuses: ' || COUNT(*) FROM campuses
UNION ALL SELECT 'Courses: ' || COUNT(*) FROM courses
UNION ALL SELECT 'Exams: ' || COUNT(*) FROM exams;
