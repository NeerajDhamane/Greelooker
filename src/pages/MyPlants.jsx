import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api/api'
import toast from 'react-hot-toast'

const healthColor = (score) => {
  if (score >= 85) return 'var(--accent)'
  if (score >= 60) return '#f59e0b'
  return '#dc2626'
}

const MyPlants = () => {
  const navigate = useNavigate()
  const [isMobile,     setIsMobile]     = useState(window.innerWidth <= 768)
  const [plants,       setPlants]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [activeRoom,   setActiveRoom]   = useState('All rooms')
  const [searchQuery,  setSearchQuery]  = useState('')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Real fetch from the backend — no more hardcoded PLANTS array (Bug #4) ──
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true)
        const res = await api.get('/plants/user-plants/me')
        setPlants(res.data.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load your plants')
      } finally {
        setLoading(false)
      }
    }
    fetchPlants()
  }, [])

  // Room list is derived from the plants you actually own, not a fixed list.
  const rooms = ['All rooms', ...new Set(plants.map(p => p.room).filter(Boolean))]

  const filtered = plants.filter(p => {
    const roomMatch = activeRoom === 'All rooms' || p.room === activeRoom
    const nameMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return roomMatch && nameMatch
  })

  const healthyCount = plants.filter(p => p.healthScore >= 85).length
  const warnCount    = plants.filter(p => p.healthScore < 85 && p.healthScore >= 60).length
  const poorCount    = plants.filter(p => p.healthScore < 60).length

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
              {plants.length} plant{plants.length !== 1 ? 's' : ''} across {rooms.length - 1} room{rooms.length - 1 !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Add plant → real flow via the recommendation quiz (Bug #4) */}
          <button onClick={() => navigate('/recommend')} style={{
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
          {rooms.length > 1 && (
            <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'4px' }}>
              {rooms.map(room => (
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
          )}
        </div>

        {/* ── PLANT GRID ── */}
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap:'16px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ borderRadius:'20px', padding:'20px', background:'var(--surface)', border:'1.5px solid var(--border)', display:'flex', flexDirection:'column', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--border)' }} />
                <div style={{ height:'14px', borderRadius:'8px', background:'var(--border)', width:'70%' }} />
                <div style={{ height:'4px',  borderRadius:'8px', background:'var(--border)' }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 && plants.length > 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>🌱</div>
            <div style={{ fontSize:'15px', fontWeight:'600' }}>No plants found</div>
            <div style={{ fontSize:'13px', marginTop:'4px' }}>Try a different room or search</div>
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>🌱</div>
            <div style={{ fontSize:'15px', fontWeight:'600' }}>No plants yet</div>
            <div style={{ fontSize:'13px', marginTop:'4px' }}>Take the quiz to find plants for your space</div>
            <button onClick={() => navigate('/recommend')} style={{ marginTop:'16px', padding:'10px 24px', borderRadius:'50px', border:'none', background:'var(--accent)', color:'#fff', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans', sans-serif" }}>
              Find my plants →
            </button>
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

    </div>
  )
}

// ── PLANT CARD ────────────────────────────────────────────────────────────────
const PlantCard = ({ p, isMobile }) => (
  <div style={{
    borderRadius:'20px', padding:'20px',
    background:'var(--surface)', border:'1.5px solid var(--border)',
    display:'flex', flexDirection:'column', gap:'12px',
    transition:'transform 0.2s, box-shadow 0.2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none' }}
  >
    {/* Emoji + care level tag */}
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
      <div style={{ fontSize: isMobile ? '32px' : '36px' }}>{p.emoji}</div>
      {p.careLevel && (
        <span style={{ fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)', textTransform:'capitalize' }}>
          {p.careLevel} care
        </span>
      )}
    </div>

    {/* Name + room */}
    <div>
      <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight:'700', color:'var(--text-hero)' }}>{p.name}</div>
      <div style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'2px' }}>{p.room}</div>
    </div>

    {/* Health bar — derived from real watering schedule, not a fixed number */}
    <div>
      <div style={{ height:'4px', background:'var(--border)', borderRadius:'50px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${p.healthScore}%`, background: healthColor(p.healthScore), borderRadius:'50px' }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px', fontSize:'11px', color:'var(--text-muted)' }}>
        <span>Health</span>
        <span style={{ fontWeight:'700', color: healthColor(p.healthScore) }}>
          {p.healthScore}%
        </span>
      </div>
    </div>

    {/* Care badge */}
    <div style={{ fontSize:'11px', fontWeight:'600', padding:'5px 12px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)', width:'fit-content' }}>
      {p.careText}
    </div>

  </div>
)

export default MyPlants
