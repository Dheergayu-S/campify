import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL
})

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

export default api
