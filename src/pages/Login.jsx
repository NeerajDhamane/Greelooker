import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../api/api'
import { BRAND_NAME } from '../config/brand'
import GoogleSignInButton from '../components/GoogleSignInButton'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  // ── Shared success handler for password login AND Google sign-in ──
  const handleAuthSuccess = (data) => {
    const userData = {
      id:    data.id,
      name:  data.name,
      phone: data.phone,
      token: data.token,
    }
    login(userData)
    toast.success(`Welcome back, ${userData.name}! 🌿`)
    navigate('/dashboard')
  }

  // ── Phone + password submit ────────────────────────────────────
  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', {
        phone:    formData.phone,
        password: formData.password,
      })
      handleAuthSuccess(res.data.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid phone or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 16px', background:'var(--bg)' }}>

      <div style={{
        display:'flex', flexDirection:'column', gap:'28px',
        borderRadius:'24px', padding:'48px',
        background:'var(--surface)', border:'1.5px solid var(--border)',
        width:'420px', maxWidth:'100%',
        boxShadow:'0 8px 40px rgba(26,46,26,0.08)',
      }}>

        {/* Logo */}
        <div style={{ textAlign:'center', fontFamily:"'Playfair Display', serif", fontWeight:'700', fontSize:'20px', color:'var(--text-hero)' }}>
          {BRAND_NAME}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

          <div style={{ textAlign:'center' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
              Welcome back 🌿
            </h2>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
              Log in with your phone number and password
            </p>
          </div>

          {/* Phone input */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Phone Number</label>
            <div style={{ display:'flex', gap:'8px' }}>
              <button type="button" style={{ padding:'12px', borderRadius:'16px', fontSize:'14px', fontWeight:'600', flexShrink:0, background:'var(--pill)', border:'1.5px solid var(--border)', color:'var(--text-body)', cursor:'default' }}>
                🇮🇳 +91
              </button>
              <input
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Enter a valid 10-digit Indian mobile number',
                  },
                })}
                style={{
                  flex:1, padding:'12px 16px', borderRadius:'16px', fontSize:'14px', outline:'none',
                  border: `1.5px solid ${errors.phone ? '#ef4444' : 'var(--border)'}`,
                  background:'var(--surface)', color:'var(--text-hero)',
                  fontFamily:"'DM Sans', sans-serif",
                }}
              />
            </div>
            {errors.phone && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>⚠️ {errors.phone.message}</p>
            )}
          </div>

          {/* Password input */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize:'12px', color:'var(--accent)', fontWeight:'600' }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
              style={{
                padding:'12px 16px', borderRadius:'16px', fontSize:'14px', outline:'none',
                border: `1.5px solid ${errors.password ? '#ef4444' : 'var(--border)'}`,
                background:'var(--surface)', color:'var(--text-hero)',
                fontFamily:"'DM Sans', sans-serif",
              }}
            />
            {errors.password && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>⚠️ {errors.password.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting || loading} style={{
            width:'100%', padding:'14px', borderRadius:'50px',
            fontWeight:'600', fontSize:'14px', cursor:'pointer',
            background:'var(--text-hero)', color:'var(--surface)',
            border:'none', opacity: (isSubmitting || loading) ? 0.6 : 1,
            fontFamily:"'DM Sans', sans-serif",
          }}>
            {loading ? 'Logging in...' : 'Log in →'}
          </button>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', fontSize:'12px', color:'var(--text-muted)' }}>
            <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
            or continue with
            <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
          </div>

          <GoogleSignInButton onAuth={handleAuthSuccess} />

          {/* Register link */}
          <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color:'var(--accent)', fontWeight:'600' }}>Register</Link>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login
