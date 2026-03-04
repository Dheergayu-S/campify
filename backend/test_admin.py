import urllib.request, json

# Test admin login
data = json.dumps({'email': 'admin@studyseekers.in', 'password': 'admin123'}).encode()
req = urllib.request.Request('http://127.0.0.1:8000/api/auth/login', data=data, headers={'Content-Type': 'application/json'})
r = urllib.request.urlopen(req)
result = json.loads(r.read())
print("LOGIN:", result)
token = result['access_token']

# Test admin stats
req2 = urllib.request.Request('http://127.0.0.1:8000/api/admin/stats', headers={'Authorization': f'Bearer {token}'})
r2 = urllib.request.urlopen(req2)
print("STATS:", json.loads(r2.read()))
