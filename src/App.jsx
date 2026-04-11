import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home        from './pages/Home'
import Login       from './pages/Login'
import Register    from './pages/Register'
import Recommend   from './pages/Recommend'
import Dashboard   from './pages/Dashboard'
import Commercials from './pages/Commercials'
import Gifting     from './pages/Gifting'
import Accessories from './pages/Accessories'
import Settings    from './pages/Settings'
import MyPlants    from './pages/MyPlants'
import NotFound    from './pages/NotFound'
import Navbar      from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>

          {/* ── Public ── */}
          <Route path="/"            element={<Home />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/commercials" element={<Commercials />} />
          <Route path="/gifting"     element={<Gifting />} />
          <Route path="/accessories" element={<Accessories />} />

          {/* ── Protected ── */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/recommend" element={<PrivateRoute><Recommend /></PrivateRoute>} />
          <Route path="/myplants"  element={<PrivateRoute><MyPlants  /></PrivateRoute>} />
          <Route path="/settings"  element={<PrivateRoute><Settings  /></PrivateRoute>} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App