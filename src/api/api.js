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

// RESPONSE interceptor — only redirect on 401 if user is already logged in
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoggedIn = localStorage.getItem('gl_user')
    const is401      = error.response?.status === 401
    const isAuthRoute = error.config?.url?.includes('/auth/')

    // Only force logout if logged in user gets 401 on a protected route
    if (is401 && isLoggedIn && !isAuthRoute) {
      localStorage.removeItem('gl_user')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api