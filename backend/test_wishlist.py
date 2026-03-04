import requests

# Login
r = requests.post('http://localhost:8000/api/auth/login', json={'email': 'admin@studyseekers.in', 'password': 'admin123'})
print('LOGIN:', r.status_code)
token = r.json()['access_token']
h = {'Authorization': f'Bearer {token}'}

# Test get wishlist
r2 = requests.get('http://localhost:8000/api/wishlist/', headers=h)
print('GET WISHLIST:', r2.status_code, r2.text)

# Test add to wishlist
r3 = requests.post('http://localhost:8000/api/wishlist/1', headers=h)
print('ADD:', r3.status_code, r3.text)

# Test get again
r4 = requests.get('http://localhost:8000/api/wishlist/', headers=h)
print('AFTER ADD:', r4.status_code, r4.text)

# Test remove
r5 = requests.delete('http://localhost:8000/api/wishlist/1', headers=h)
print('REMOVE:', r5.status_code, r5.text)
