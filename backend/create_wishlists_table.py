import psycopg2

conn = psycopg2.connect(host='localhost', port=5432, dbname='campus_v2', user='postgres', password='campus123')
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    campus_id INTEGER NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, campus_id)
)
""")

conn.commit()
print("Wishlists table created successfully")

cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'wishlists'")
print([r[0] for r in cur.fetchall()])
conn.close()
