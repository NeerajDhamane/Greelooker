import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../api/api'
import { BRAND_NAME } from '../config/brand'
import GoogleSignInButton from '../components/GoogleSignInButton'

const Register = () => {
  const [loading, setLoading]         = useState(false)
  const [duplicatePhoneError, setDuplicatePhoneError] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch('password')

  // ── Shared success handler for password register AND Google sign-in ──
  const handleAuthSuccess = (data, welcomeName) => {
    const userData = {
      id:    data.id,
      name:  data.name,
      phone: data.phone,
      token: data.token,
    }
    login(userData)
    toast.success(`Welcome to ${BRAND_NAME}, ${welcomeName || userData.name}! 🌱`)
    navigate('/dashboard')
  }

  // ── Real registration — no more OTP, no more fake mock-token fallback ──
  const onSubmit = async (formData) => {
    setLoading(true)
    setDuplicatePhoneError(false)

    try {
      const res = await api.post('/auth/register', {
        name:            formData.name,
        phone:           formData.phone,
        password:        formData.password,
        confirmPassword: formData.confirmPassword,
      })
      handleAuthSuccess(res.data.data, formData.name)

    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'

      // Bug #1 fix: previously this branch faked a successful login with
      // a mock token, which then failed the first real API call and
      // silently bounced the person back to /login. Now it shows a real
      // error with a link to actually log in instead.
      if (err.response?.status === 400 && msg.toLowerCase().includes('already')) {
        setDuplicatePhoneError(true)
        toast.error('That phone number is already registered.')
        return
      }

      toast.error(msg)
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

        <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

          <div style={{ textAlign:'center' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
              Create account 🌱
            </h2>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
              Join {BRAND_NAME} and find your perfect plants
            </p>
          </div>

          {/* Name */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Full Name</label>
            <input
              type="text"
              placeholder="Rohit Sharma"
              {...register('name', {
                required: 'Name is required',
                minLength: { value:2, message:'Name must be at least 2 characters' },
              })}
              style={{
                padding:'12px 16px', borderRadius:'16px', fontSize:'14px', outline:'none',
                border: `1.5px solid ${errors.name ? '#ef4444' : 'var(--border)'}`,
                background:'var(--surface)', color:'var(--text-hero)',
                fontFamily:"'DM Sans', sans-serif",
              }}
            />
            {errors.name && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>⚠️ {errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
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
                  onChange: () => setDuplicatePhoneError(false),
                })}
                style={{
                  flex:1, padding:'12px 16px', borderRadius:'16px', fontSize:'14px', outline:'none',
                  border: `1.5px solid ${(errors.phone || duplicatePhoneError) ? '#ef4444' : 'var(--border)'}`,
                  background:'var(--surface)', color:'var(--text-hero)',
                  fontFamily:"'DM Sans', sans-serif",
                }}
              />
            </div>
            {errors.phone && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>⚠️ {errors.phone.message}</p>
            )}
            {duplicatePhoneError && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>
                ⚠️ This phone is already registered.{' '}
                <Link to="/login" style={{ color:'var(--accent)', fontWeight:'600' }}>Log in instead</Link>
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: { value:8, message:'Password must be at least 8 characters' },
              })}
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

          {/* Confirm password */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              style={{
                padding:'12px 16px', borderRadius:'16px', fontSize:'14px', outline:'none',
                border: `1.5px solid ${errors.confirmPassword ? '#ef4444' : 'var(--border)'}`,
                background:'var(--surface)', color:'var(--text-hero)',
                fontFamily:"'DM Sans', sans-serif",
              }}
            />
            {errors.confirmPassword && (
              <p style={{ fontSize:'12px', color:'#ef4444', margin:0 }}>⚠️ {errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting || loading} style={{
            width:'100%', padding:'14px', borderRadius:'50px',
            fontWeight:'600', fontSize:'14px', cursor:'pointer',
            background:'var(--text-hero)', color:'var(--surface)',
            border:'none', opacity: (isSubmitting || loading) ? 0.6 : 1,
            fontFamily:"'DM Sans', sans-serif",
          }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', fontSize:'12px', color:'var(--text-muted)' }}>
            <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
            or continue with
            <div style={{ flex:1, height:'1.5px', background:'var(--border)' }} />
          </div>

          <GoogleSignInButton onAuth={(data) => handleAuthSuccess(data)} />

          {/* Login link */}
          <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'var(--accent)', fontWeight:'600' }}>Log in</Link>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Register
