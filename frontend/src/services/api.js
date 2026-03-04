import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL
})

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const registerUser = async (data) => {
  const response = await api.post('/api/auth/register', data)
  return response.data
}

export const loginUser = async (data) => {
  const response = await api.post('/api/auth/login', data)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me')
  return response.data
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Campus API
export const getCampuses = async () => {
  const response = await api.get('/api/campuses/')
  return response.data
}

export const getCampus = async (id) => {
  const response = await api.get(`/api/campuses/${id}`)
  return response.data
}

export const getCampusBuildings = async (campusId) => {
  const response = await api.get(`/api/campuses/${campusId}/buildings`)
  return response.data
}

export const getBuildings = async () => {
  const response = await api.get('/api/buildings/')
  return response.data
}

export const getPois = async () => {
  const response = await api.get('/api/pois/')
  return response.data
}

// Admin API
export const getAdminStats = async () => {
  const response = await api.get('/api/admin/stats')
  return response.data
}

export const addCollege = async (data) => {
  const response = await api.post('/api/admin/colleges', data)
  return response.data
}

export const updateCollege = async (id, data) => {
  const response = await api.put(`/api/admin/colleges/${id}`, data)
  return response.data
}

export const deleteCollege = async (id) => {
  const response = await api.delete(`/api/admin/colleges/${id}`)
  return response.data
}

export const addCourse = async (data) => {
  const response = await api.post('/api/admin/courses', data)
  return response.data
}

export const updateCourse = async (id, data) => {
  const response = await api.put(`/api/admin/courses/${id}`, data)
  return response.data
}

export const deleteCourse = async (id) => {
  const response = await api.delete(`/api/admin/courses/${id}`)
  return response.data
}

export const getAdminUsers = async () => {
  const response = await api.get('/api/admin/users')
  return response.data
}

// Wishlist API
export const getWishlist = async () => {
  const response = await api.get('/api/wishlist/')
  return response.data
}

export const addToWishlist = async (campusId) => {
  const response = await api.post(`/api/wishlist/${campusId}`)
  return response.data
}

export const removeFromWishlist = async (campusId) => {
  const response = await api.delete(`/api/wishlist/${campusId}`)
  return response.data
}

export default api
