import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// REQUEST interceptor — attaches token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('gl_user') || 'null')
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// RESPONSE interceptor — handles 401 (not logged in)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('gl_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api