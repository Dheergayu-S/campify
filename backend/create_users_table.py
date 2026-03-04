import pg8000

conn = pg8000.connect(
    user='postgres',
    password='campus123',
    host='localhost',
    port=5432,
    database='campus_v2'
)
conn.autocommit = True
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users CASCADE")

cur.execute("""
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        is_verified BOOLEAN DEFAULT FALSE,
        college_email VARCHAR(255),
        verification_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

print("users table created successfully!")
cur.close()
conn.close()
