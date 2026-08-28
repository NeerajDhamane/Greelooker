import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home        from './pages/Home'
import Login       from './pages/Login'
import Register    from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword  from './pages/ResetPassword'
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
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <Navbar />
        <Routes>

          {/* ── Public ── */}
          <Route path="/"            element={<Home />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password"  element={<ResetPassword />} />
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
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App