import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('gl_user') || 'null')
  )

  const login = (userData) => {
    localStorage.setItem('gl_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('gl_user')
    setUser(null)
  }

  // Merges a partial update (e.g. new name/phone from Settings) into the
  // cached user object, so the change shows up immediately in the
  // Navbar/Sidebar without requiring a logout/login cycle.
  const updateUser = (partial) => {
    setUser((prev) => {
      const next = { ...prev, ...partial }
      localStorage.setItem('gl_user', JSON.stringify(next))
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)