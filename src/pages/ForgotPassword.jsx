import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/api'
import { BRAND_NAME } from '../config/brand'

const ForgotPassword = () => {
  const [loading, setLoading]   = useState(false)
  const [sent, setSent]         = useState(false)
  const [devLink, setDevLink]   = useState(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/forgot-password', { phone: formData.phone })
      setSent(true)
      // See authController.forgotPassword — this app has no SMS/email
      // provider wired up yet, so the dev build hands back the reset
      // link directly instead of texting/emailing it.
      if (res.data.data.devResetLink) {
        setDevLink(res.data.data.devResetLink)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
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

        {!sent ? (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

            <div style={{ textAlign:'center' }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'24px', fontWeight:'700', color:'var(--text-hero)', margin:'0 0 8px' }}>
                Forgot password? 🔑
              </h2>
              <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
                Enter your phone number and we'll send you a reset link
              </p>
            </div>

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

            <button type="submit" disabled={isSubmitting || loading} style={{
              width:'100%', padding:'14px', borderRadius:'50px',
              fontWeight:'600', fontSize:'14px', cursor:'pointer',
              background:'var(--text-hero)', color:'var(--surface)',
              border:'none', opacity: (isSubmitting || loading) ? 0.6 : 1,
              fontFamily:"'DM Sans', sans-serif",
            }}>
              {loading ? 'Sending...' : 'Send reset link →'}
            </button>

            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--text-muted)' }}>
              <Link to="/login" style={{ color:'var(--accent)', fontWeight:'600' }}>← Back to login</Link>
            </div>

          </form>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'20px', textAlign:'center' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'22px', fontWeight:'700', color:'var(--text-hero)', margin:0 }}>
              Check your messages 📩
            </h2>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', margin:0 }}>
              If that phone number is registered, we've sent a link to reset your password. It expires in 15 minutes.
            </p>

            {devLink && (
              <div style={{ padding:'16px', borderRadius:'16px', background:'var(--pill)', border:'1px solid var(--border)', fontSize:'12px', color:'var(--text-body)', wordBreak:'break-all', textAlign:'left' }}>
                <strong>Dev mode:</strong> no SMS/email provider is configured yet, so here's your reset link directly —{' '}
                <Link to={devLink.replace(window.location.origin, '')} style={{ color:'var(--accent)', fontWeight:'600' }}>
                  {devLink}
                </Link>
              </div>
            )}

            <Link to="/login" style={{ color:'var(--accent)', fontWeight:'600', fontSize:'14px' }}>← Back to login</Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword
