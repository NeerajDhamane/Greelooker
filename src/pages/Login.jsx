import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../api/api'

const Login = () => {
  const [screen,   setScreen]   = useState('phone')
  const [phone,    setPhone]    = useState('')
  const [otp,      setOtp]      = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [loading,  setLoading]  = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  // ── STEP 1: Phone submit ─────────────────────────────────────
  const onPhoneSubmit = (data) => {
    setPhone(data.phone)
    setScreen('otp')
    setTimeout(() => document.querySelectorAll('.otp-box')[0]?.focus(), 100)
  }

  // ── OTP box handler ──────────────────────────────────────────
  const handleOTP = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.querySelectorAll('.otp-box')[index + 1]?.focus()
    }
  }

  // ── STEP 2: Verify OTP → call real backend ───────────────────
  const verifyOTP = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setOtpError('Please enter the full 6-digit OTP')
      toast.error('Please enter the full 6-digit OTP')
      return
    }

    setLoading(true)
    setOtpError('')

    try {
      const res = await api.post('/auth/login', {
        phone:    phone,
        password: code,
      })

      const userData = {
        id:    res.data.id,
        name:  res.data.name,
        phone: res.data.phone,
        token: res.data.token,
      }

      login(userData)
      toast.success(`Welcome back, ${userData.name}! 🌿`)
      navigate('/dashboard')

    } catch (err) {
      // Stay on OTP screen, show error — never redirect
      setOtpError('Incorrect OTP. Please try again.')
      toast.error('Incorrect OTP. Please try again.')
      setOtp(['', '', '', '', '', ''])
      setTimeout(() => document.querySelectorAll('.otp-box')[0]?.focus(), 100)

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
          GreeLooker
        </div>

        {/* ── SCREEN 1 — Phone ── */}
        {screen === 'phone' && (
          <form onSubmit={handleSubmit(onPhoneSubmit)} style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

            <div style={{ textAlign:'center' }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
                Welcome back 🌿
              </h2>
              <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
                Enter your phone number to get started
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

            {/* Send OTP */}
            <button type="submit" disabled={isSubmitting} style={{
              width:'100%', padding:'14px', borderRadius:'50px',
              fontWeight:'600', fontSize:'14px', cursor:'pointer',
              background:'var(--text-hero)', color:'var(--surface)',
              border:'none', opacity: isSubmitting ? 0.6 : 1,
              fontFamily:"'DM Sans', sans-serif",
            }}>
              {isSubmitting ? 'Sending...' : 'Send OTP →'}
            </button>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px', fontSize:'12px', color:'var(--text-muted)' }}>
              <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
              or continue with
              <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
            </div>

            {/* Google btn */}
            <button type="button" style={{
              width:'100%', padding:'14px', borderRadius:'50px',
              fontWeight:'600', fontSize:'14px', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'12px',
              background:'var(--surface)', border:'1.5px solid var(--border)', color:'var(--text-body)',
              fontFamily:"'DM Sans', sans-serif",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Register link */}
            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color:'var(--accent)', fontWeight:'600' }}>Register</Link>
            </div>

          </form>
        )}

        {/* ── SCREEN 2 — OTP ── */}
        {screen === 'otp' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

            <button onClick={() => { setScreen('phone'); setOtp(['','','','','','']); setOtpError('') }}
              style={{ background:'none', border:'none', color:'var(--text-muted)', fontSize:'14px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", display:'flex', alignItems:'center', gap:'8px', padding:0 }}>
              ← Back
            </button>

            <div style={{ textAlign:'center' }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
                Verify OTP 🔐
              </h2>
              <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
                Enter the 6-digit code used during registration
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderRadius:'16px', fontSize:'14px', background:'var(--pill)', border:'1px solid var(--border)', color:'var(--text-body)' }}>
                📱 Logging in as +91 {phone}
              </div>
              <div style={{ fontSize:'12px', color:'var(--text-muted)', textAlign:'center' }}>
                💡 Use the 6-digit code you set during registration
              </div>
            </div>

            {/* OTP boxes */}
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Enter OTP</label>
              <div style={{ display:'flex', gap:'8px', justifyContent:'center' }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTP(e.target.value.replace(/\D/g, ''), i)}
                    className="otp-box"
                    style={{
                      width:'48px', height:'54px', textAlign:'center',
                      fontWeight:'700', fontSize:'20px', outline:'none',
                      border: `1.5px solid ${otpError ? '#ef4444' : 'var(--border)'}`,
                      borderRadius:'14px', color:'var(--text-hero)',
                      background:'var(--surface)', fontFamily:"'DM Sans', sans-serif",
                    }}
                  />
                ))}
              </div>
              {otpError && (
                <p style={{ fontSize:'12px', color:'#ef4444', textAlign:'center', margin:0 }}>⚠️ {otpError}</p>
              )}
            </div>

            <button onClick={verifyOTP} disabled={loading} style={{
              width:'100%', padding:'14px', borderRadius:'50px',
              fontWeight:'600', fontSize:'14px', cursor:'pointer',
              background:'var(--text-hero)', color:'var(--surface)',
              border:'none', opacity: loading ? 0.6 : 1,
              fontFamily:"'DM Sans', sans-serif",
            }}>
              {loading ? 'Verifying...' : 'Verify & Login →'}
            </button>

            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color:'var(--accent)', fontWeight:'600' }}>Register</Link>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Login