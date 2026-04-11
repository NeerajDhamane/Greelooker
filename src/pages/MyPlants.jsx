import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

const PLANTS = [
  { id:1, emoji:'🪴', name:'Monstera',    room:'Living room', health:90,  color:'var(--accent)', care:'💧 Next: Tomorrow', tag:'Tropical' },
  { id:2, emoji:'🌵', name:'Cactus',      room:'Bedroom',     health:100, color:'var(--accent)', care:'✅ Next: 20 Mar',   tag:'Succulent' },
  { id:3, emoji:'🌿', name:'Pothos',      room:'Kitchen',     health:75,  color:'#f59e0b',       care:'🌱 Next: 15 Mar',  tag:'Climber' },
  { id:4, emoji:'🌴', name:'Areca Palm',  room:'Balcony',     health:95,  color:'var(--accent)', care:'☀️ Next: 12 Mar',  tag:'Palm' },
  { id:5, emoji:'🌸', name:'Peace Lily',  room:'Bedroom',     health:82,  color:'var(--accent)', care:'💧 Next: 3 days',  tag:'Flowering' },
  { id:6, emoji:'🎋', name:'Lucky Bamboo',room:'Study',       health:88,  color:'var(--accent)', care:'💧 Next: 5 days',  tag:'Lucky' },
]

const ROOMS = ['All rooms', 'Living room', 'Bedroom', 'Kitchen', 'Balcony', 'Study']

const MyPlants = () => {
  const [isMobile,     setIsMobile]     = useState(window.innerWidth <= 768)
  const [plants,       setPlants]       = useState(PLANTS)
  const [activeRoom,   setActiveRoom]   = useState('All rooms')
  const [searchQuery,  setSearchQuery]  = useState('')
  const [showToast,    setShowToast]    = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleAddPlant = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  const filtered = plants.filter(p => {
    const roomMatch  = activeRoom === 'All rooms' || p.room === activeRoom
    const nameMatch  = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return roomMatch && nameMatch
  })

  const healthyCount = plants.filter(p => p.health >= 85).length
  const warnCount    = plants.filter(p => p.health < 85 && p.health >= 60).length
  const poorCount    = plants.filter(p => p.health < 60).length

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>

      <Sidebar />

      {/* ── MAIN ── */}
      <div style={{
        flex:1, overflowY:'auto',
        padding: isMobile ? '20px 16px 100px' : '40px',
        display:'flex', flexDirection:'column', gap:'28px',
      }}>

        {/* Header row */}
        <div style={{ display:'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent:'space-between', gap:'12px', flexDirection: isMobile ? 'column' : 'row' }}>
          <div>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? '22px' : '26px', fontWeight:'700', color:'var(--text-hero)', margin:0 }}>
              My Plants
            </h1>
            <p style={{ fontSize:'13px', marginTop:'4px', color:'var(--text-muted)' }}>
              {plants.length} plants across {ROOMS.length - 1} rooms
            </p>
          </div>

          {/* Add plant button */}
          <button onClick={handleAddPlant} style={{
            display:'flex', alignItems:'center', gap:'6px',
            padding:'10px 20px', borderRadius:'50px',
            border:'none', background:'var(--accent)', color:'#fff',
            fontSize:'13px', fontWeight:'700', cursor:'pointer',
            fontFamily:"'DM Sans', sans-serif", flexShrink:0,
          }}>
            + Add plant
          </button>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
          {[
            { label:'Healthy',   count: healthyCount, bg:'#dcfce7', color:'#166534', emoji:'✅' },
            { label:'Watch',     count: warnCount,    bg:'#fef3c7', color:'#92400e', emoji:'⚠️' },
            { label:'Needs care',count: poorCount,    bg:'#fee2e2', color:'#991b1b', emoji:'❌' },
          ].map(s => (
            <div key={s.label} style={{ borderRadius:'16px', padding: isMobile ? '14px' : '16px 20px', background: s.bg, display:'flex', flexDirection:'column', gap:'4px' }}>
              <div style={{ fontSize: isMobile ? '18px' : '20px' }}>{s.emoji}</div>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight:'800', color: s.color }}>{s.count}</div>
              <div style={{ fontSize:'11px', fontWeight:'600', color: s.color }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SEARCH + FILTER ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>

          {/* Search bar */}
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'14px', pointerEvents:'none' }}>🔍</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your plants..."
              style={{
                width:'100%', boxSizing:'border-box',
                padding:'10px 14px 10px 38px',
                borderRadius:'50px',
                border:'1.5px solid var(--border)',
                background:'var(--surface)',
                color:'var(--text-hero)',
                fontSize:'14px',
                fontFamily:"'DM Sans', sans-serif",
                outline:'none',
              }}
            />
          </div>

          {/* Room filter pills */}
          <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'4px' }}>
            {ROOMS.map(room => (
              <button key={room} onClick={() => setActiveRoom(room)} style={{
                padding:'6px 16px', borderRadius:'50px', flexShrink:0,
                border:'1.5px solid var(--border)',
                background: activeRoom === room ? 'var(--accent)' : 'var(--surface)',
                color:       activeRoom === room ? '#fff'          : 'var(--text-muted)',
                fontSize:'12px', fontWeight:'600', cursor:'pointer',
                fontFamily:"'DM Sans', sans-serif",
                transition:'all 0.2s',
              }}>
                {room}
              </button>
            ))}
          </div>
        </div>

        {/* ── PLANT GRID ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>🌱</div>
            <div style={{ fontSize:'15px', fontWeight:'600' }}>No plants found</div>
            <div style={{ fontSize:'13px', marginTop:'4px' }}>Try a different room or search</div>
          </div>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap:'16px',
          }}>
            {filtered.map(p => (
              <PlantCard key={p.id} p={p} isMobile={isMobile} />
            ))}
          </div>
        )}

      </div>

      {/* ── TOAST ── */}
      {showToast && (
        <div style={{
          position:'fixed', bottom: isMobile ? '90px' : '32px',
          left:'50%', transform:'translateX(-50%)',
          padding:'12px 24px', borderRadius:'50px',
          background:'var(--text-hero)', color:'#fff',
          fontSize:'13px', fontWeight:'600',
          boxShadow:'0 4px 24px rgba(0,0,0,0.15)',
          zIndex:999, whiteSpace:'nowrap',
        }}>
          🌱 Add plant — coming in Week 3!
        </div>
      )}

    </div>
  )
}

// ── PLANT CARD ────────────────────────────────────────────────────────────────
const PlantCard = ({ p, isMobile }) => (
  <div style={{
    borderRadius:'20px', padding:'20px',
    background:'var(--surface)', border:'1.5px solid var(--border)',
    display:'flex', flexDirection:'column', gap:'12px',
    cursor:'pointer',
    transition:'transform 0.2s, box-shadow 0.2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none' }}
  >
    {/* Emoji + tag */}
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
      <div style={{ fontSize: isMobile ? '32px' : '36px' }}>{p.emoji}</div>
      <span style={{ fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)' }}>
        {p.tag}
      </span>
    </div>

    {/* Name + room */}
    <div>
      <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight:'700', color:'var(--text-hero)' }}>{p.name}</div>
      <div style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'2px' }}>{p.room}</div>
    </div>

    {/* Health bar */}
    <div>
      <div style={{ height:'4px', background:'var(--border)', borderRadius:'50px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${p.health}%`, background:p.color, borderRadius:'50px' }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px', fontSize:'11px', color:'var(--text-muted)' }}>
        <span>Health</span>
        <span style={{ fontWeight:'700', color: p.health >= 85 ? 'var(--accent)' : p.health >= 60 ? '#f59e0b' : '#dc2626' }}>
          {p.health}%
        </span>
      </div>
    </div>

    {/* Care badge */}
    <div style={{ fontSize:'11px', fontWeight:'600', padding:'5px 12px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)', width:'fit-content' }}>
      {p.care}
    </div>

  </div>
)

export default MyPlants