import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Recommend from './pages/Recommend'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Commercials from './pages/Commercials'
import Gifting from './pages/Gifting'
import Accessories from './pages/Accessories'
import NotFound from './pages/NotFound'
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/commercials" element={<Commercials />} />
          <Route path="/gifting" element={<Gifting />} />
          <Route path="/accessories" element={<Accessories />} />

          {/* Protected routes — need login */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/recommend" element={<PrivateRoute><Recommend /></PrivateRoute>} />
          <Route path="/myplants" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App