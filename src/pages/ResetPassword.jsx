import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/api'
import { BRAND_NAME } from '../config/brand'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token    = searchParams.get('token')
  const [loading, setLoading] = useState(false)
  const navigate  = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch('password')

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      await api.post('/auth/reset-password', {
        token,
        password:        formData.password,
        confirmPassword: formData.confirmPassword,
      })
      toast.success('Password updated! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'That reset link is invalid or has expired.')
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

        <div style={{ textAlign:'center', fontFamily:"'Playfair Display', serif", fontWeight:'700', fontSize:'20px', color:'var(--text-hero)' }}>
          {BRAND_NAME}
        </div>

        {!token ? (
          <div style={{ display:'flex', flexDirection:'column', gap:'20px', textAlign:'center' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'22px', fontWeight:'700', color:'var(--text-hero)', margin:0 }}>
              Missing reset link 🔒
            </h2>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
              This page needs a valid reset link. Request a new one below.
            </p>
            <Link to="/forgot-password" style={{ color:'var(--accent)', fontWeight:'600', fontSize:'14px' }}>
              Request reset link →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

            <div style={{ textAlign:'center' }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
                Set a new password 🔑
              </h2>
              <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
                Choose a new password for your account
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>New Password</label>
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

            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-body)' }}>Confirm New Password</label>
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
              {loading ? 'Updating...' : 'Update password →'}
            </button>

            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
              <Link to="/login" style={{ color:'var(--accent)', fontWeight:'600' }}>← Back to login</Link>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}

export default ResetPassword
