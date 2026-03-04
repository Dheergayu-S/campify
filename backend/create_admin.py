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

# Check if admin already exists
cur.execute("SELECT id FROM users WHERE email = 'admin@studyseekers.in'")
if cur.fetchone():
    print("Admin user already exists!")
else:
    from app.auth import hash_password
    hashed = hash_password('admin123')
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role) VALUES (%s, %s, %s, %s)",
        ('Admin', 'admin@studyseekers.in', hashed, 'admin')
    )
    print("Admin user created!")

cur.execute("SELECT id, name, email, role FROM users")
for row in cur.fetchall():
    print(row)

cur.close()
conn.close()
