import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [screen, setScreen] = useState('details')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const { login } = useAuth()

  const sendOTP = () => {
    if (name.trim() === '') {
      alert('Please enter your name')
      return
    }
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit number')
      return
    }
    setScreen('otp')
    setTimeout(() => document.querySelectorAll('.otp-box')[0]?.focus(), 100)
  }

  const handleOTP = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.querySelectorAll('.otp-box')[index + 1]?.focus()
    }
  }

  const verifyOTP = () => {
  const code = otp.join('')
  if (code.length !== 6) {
    alert('Please enter the full 6-digit OTP')
    return
  }
  login({ name: name, phone: phone })
  window.location.href = '/dashboard'
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>

      <div className="flex flex-col gap-7 rounded-3xl p-12"
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--border)',
          width: '420px',
          boxShadow: '0 8px 40px rgba(26,46,26,0.08)',
        }}>

        {/* Logo */}
        <div className="text-center font-bold text-xl"
          style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-hero)' }}>
          GreeLooker
        </div>

        {/* ── SCREEN 1 — Details ── */}
        {screen === 'details' && (
          <div className="flex flex-col gap-5">

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-hero)' }}>
                Create account 🌱
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Join GreeLooker and find your perfect plants
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-body)' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Rohit Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-hero)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-body)' }}>
                Phone Number
              </label>
              <div className="flex gap-2">
                <button className="px-3 py-3 rounded-2xl text-sm font-semibold flex-shrink-0"
                  style={{ background: 'var(--pill)', border: '1.5px solid var(--border)', color: 'var(--text-body)' }}>
                  🇮🇳 +91
                </button>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{
                    border: '1.5px solid var(--border)',
                    background: 'var(--surface)',
                    color: 'var(--text-hero)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
            </div>

            <button onClick={sendOTP}
              className="w-full py-3 rounded-full font-semibold text-sm cursor-pointer"
              style={{ background: 'var(--text-hero)', color: 'var(--surface)', border: 'none' }}>
              Send OTP →
            </button>

            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              or continue with
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            <button className="w-full py-3 rounded-full font-semibold text-sm cursor-pointer flex items-center justify-center gap-3"
              style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', color: 'var(--text-body)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>
                Log in
              </Link>
            </div>

          </div>
        )}

        {/* ── SCREEN 2 — OTP ── */}
        {screen === 'otp' && (
          <div className="flex flex-col gap-5">

            <button onClick={() => { setScreen('details'); setOtp(['','','','','','']) }}
              className="text-sm cursor-pointer flex items-center gap-2"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}>
              ← Back
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-hero)' }}>
                Verify OTP 🔐
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Enter the 6-digit code sent to your number
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm"
              style={{ background: 'var(--pill)', border: '1px solid var(--border)', color: 'var(--text-body)' }}>
              📱 OTP sent to +91 {phone}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-body)' }}>
                Enter OTP
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTP(e.target.value.replace(/\D/g, ''), i)}
                    className="otp-box text-center font-bold outline-none"
                    style={{
                      width: '48px', height: '54px',
                      border: '1.5px solid var(--border)',
                      borderRadius: '14px', fontSize: '20px',
                      color: 'var(--text-hero)',
                      background: 'var(--surface)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                ))}
              </div>
            </div>

            <button onClick={verifyOTP}
              className="w-full py-3 rounded-full font-semibold text-sm cursor-pointer"
              style={{ background: 'var(--text-hero)', color: 'var(--surface)', border: 'none' }}>
              Create Account →
            </button>

            <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Didn't receive it?{' '}
              <span onClick={() => setOtp(['','','','','',''])}
                className="cursor-pointer"
                style={{ color: 'var(--accent)', fontWeight: '600' }}>
                Resend OTP
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Register