import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const Settings = () => {
  const { user, logout } = useAuth()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Profile fields
  const [name,  setName]  = useState(user?.name  || 'Arjun')
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210')
  const [saved, setSaved] = useState(false)

  // Notification toggles
  const [notifs, setNotifs] = useState({
    waterReminder:   true,
    fertReminder:    true,
    seasonalTips:    true,
    weeklyReport:    false,
    promotions:      false,
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleNotif = (key) =>
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>

      <Sidebar />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex:1, overflowY:'auto',
        padding: isMobile ? '20px 16px 100px' : '40px',
        display:'flex', flexDirection:'column', gap:'32px',
      }}>

        {/* Page title */}
        <div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? '22px' : '26px', fontWeight:'700', color:'var(--text-hero)', margin:0 }}>
            Settings
          </h1>
          <p style={{ fontSize:'13px', marginTop:'4px', color:'var(--text-muted)' }}>
            Manage your profile and preferences
          </p>
        </div>

        {/* ── PROFILE SECTION ── */}
        <Section label="👤 Profile">
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

            {/* Avatar row */}
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--pill)', border:'2px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>
                🌿
              </div>
              <div>
                <div style={{ fontSize:'14px', fontWeight:'700', color:'var(--text-hero)' }}>{name}</div>
                <div style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'2px' }}>{phone}</div>
              </div>
            </div>

            <Divider />

            {/* Name field */}
            <Field label="Full name">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                placeholder="Your name"
              />
            </Field>

            {/* Phone field */}
            <Field label="Phone number">
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ ...inputStyle, color:'var(--text-muted)' }}
                placeholder="+91 XXXXX XXXXX"
              />
            </Field>

            {/* Save button */}
            <button onClick={handleSave} style={{
              alignSelf:'flex-start',
              padding:'10px 24px',
              borderRadius:'50px',
              border:'none',
              background: saved ? 'var(--leaf)' : 'var(--accent)',
              color:'#fff',
              fontSize:'13px',
              fontWeight:'700',
              cursor:'pointer',
              fontFamily:"'DM Sans', sans-serif",
              transition:'background 0.3s',
            }}>
              {saved ? '✅ Saved!' : 'Save changes'}
            </button>

          </div>
        </Section>

        {/* ── NOTIFICATIONS ── */}
        <Section label="🔔 Notifications">
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>

            {[
              { key:'waterReminder', label:'Watering reminders',   sub:'Daily alerts when your plants need water' },
              { key:'fertReminder',  label:'Fertiliser reminders', sub:'Alerts on scheduled fertilisation days' },
              { key:'seasonalTips',  label:'Seasonal tips',        sub:'Monthly care tips based on Mumbai weather' },
              { key:'weeklyReport',  label:'Weekly plant report',   sub:'Summary of your plant health every Sunday' },
              { key:'promotions',    label:'Offers & promotions',   sub:'Deals on plants, pots and accessories' },
            ].map((item, i, arr) => (
              <div key={item.key}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', padding:'14px 0' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text-hero)' }}>{item.label}</div>
                    <div style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'2px' }}>{item.sub}</div>
                  </div>
                  <Toggle on={notifs[item.key]} onToggle={() => toggleNotif(item.key)} />
                </div>
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}

          </div>
        </Section>

        {/* ── ACCOUNT SECTION ── */}
        <Section label="⚙️ Account">
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>

            <AccountRow label="App version"   value="v1.0.0 — Week 2" />
            <Divider />
            <AccountRow label="Logged in as"  value={phone} />
            <Divider />

            {/* Logout */}
            <div style={{ paddingTop:'16px' }}>
              <button onClick={logout} style={{
                padding:'10px 24px',
                borderRadius:'50px',
                border:'1.5px solid #dc2626',
                background:'transparent',
                color:'#dc2626',
                fontSize:'13px',
                fontWeight:'700',
                cursor:'pointer',
                fontFamily:"'DM Sans', sans-serif",
              }}>
                Log out
              </button>
            </div>

          </div>
        </Section>

      </div>
    </div>
  )
}

// ── SMALL REUSABLE PIECES ─────────────────────────────────────────────────────

const Section = ({ label, children }) => (
  <div>
    <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'12px', marginTop:0 }}>
      {label}
    </p>
    <div style={{ borderRadius:'20px', padding:'24px', background:'var(--surface)', border:'1.5px solid var(--border)' }}>
      {children}
    </div>
  </div>
)

const Field = ({ label, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
    <label style={{ fontSize:'11px', fontWeight:'700', color:'var(--text-muted)', letterSpacing:'0.05em' }}>
      {label.toUpperCase()}
    </label>
    {children}
  </div>
)

const Divider = () => (
  <div style={{ height:'1.5px', background:'var(--border)', margin:'0' }} />
)

const AccountRow = ({ label, value }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0' }}>
    <span style={{ fontSize:'14px', color:'var(--text-body)' }}>{label}</span>
    <span style={{ fontSize:'13px', color:'var(--text-muted)', fontWeight:'600' }}>{value}</span>
  </div>
)

const Toggle = ({ on, onToggle }) => (
  <div onClick={onToggle} style={{
    width:'44px', height:'24px', borderRadius:'50px', flexShrink:0,
    background: on ? 'var(--accent)' : 'var(--border)',
    position:'relative', cursor:'pointer',
    transition:'background 0.25s',
  }}>
    <div style={{
      position:'absolute', top:'3px',
      left: on ? '23px' : '3px',
      width:'18px', height:'18px', borderRadius:'50%',
      background:'#fff',
      transition:'left 0.25s',
      boxShadow:'0 1px 4px rgba(0,0,0,0.15)',
    }} />
  </div>
)

const inputStyle = {
  padding:'10px 14px',
  borderRadius:'12px',
  border:'1.5px solid var(--border)',
  background:'var(--bg)',
  color:'var(--text-hero)',
  fontSize:'14px',
  fontFamily:"'DM Sans', sans-serif",
  outline:'none',
  width:'100%',
  boxSizing:'border-box',
}

export default Settings