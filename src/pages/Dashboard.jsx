import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'
import toast from 'react-hot-toast'

const getHealthColor = (score) => {
  if (score >= 85) return 'var(--accent)'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

const Dashboard = () => {
  const { user } = useAuth()
  const [seasonalOpen, setSeasonalOpen] = useState(false)
  const [seasonalTab,  setSeasonalTab]  = useState('do')
  const [isMobile,     setIsMobile]     = useState(window.innerWidth <= 768)
  const [plants,       setPlants]       = useState([])
  const [loadingPlants, setLoadingPlants] = useState(true)
  const [analysing,    setAnalysing]    = useState({})

  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [completingTask, setCompletingTask] = useState({})
  const [completedToday, setCompletedToday] = useState([]) // tasks checked off this session

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Fetch user's plants from backend ─────────────────────────
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoadingPlants(true)
        const res = await api.get('/plants/user-plants/me')
        const mapped = res.data.data.map(p => ({
          id:       p.id,
          emoji:    p.emoji  || '🪴',
          name:     p.name,
          room:     p.room,
          health:   p.healthScore,
          color:    getHealthColor(p.healthScore),
          care:     p.careText,
          aiClass:  '',
          aiText:   '',
        }))
        setPlants(mapped)
      } catch (err) {
        console.error('Failed to fetch plants:', err)
        // Fallback to mock data if API fails
        setPlants([
          { id:1, emoji:'🪴', name:'Monstera',   room:'Living room', health:90,  color:'var(--accent)', care:'💧 Next: Tomorrow', aiClass:'', aiText:'' },
          { id:2, emoji:'🌵', name:'Cactus',     room:'Bedroom',     health:100, color:'var(--accent)', care:'✅ Next: 20 Mar',   aiClass:'', aiText:'' },
          { id:3, emoji:'🌿', name:'Pothos',     room:'Kitchen',     health:75,  color:'#f59e0b',       care:'🌱 Next: 15 Mar',  aiClass:'', aiText:'' },
          { id:4, emoji:'🌴', name:'Areca Palm', room:'Balcony',     health:95,  color:'var(--accent)', care:'☀️ Next: 12 Mar',  aiClass:'', aiText:'' },
        ])
      } finally {
        setLoadingPlants(false)
      }
    }
    fetchPlants()
  }, [])

  // ── Fetch real care tasks — computed from actual watering schedules (Bug #6) ──
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoadingTasks(true)
        const res = await api.get('/users/care-tasks')
        setTasks(res.data.data)
      } catch (err) {
        console.error('Failed to fetch care tasks:', err)
      } finally {
        setLoadingTasks(false)
      }
    }
    fetchTasks()
  }, [])

  const now        = new Date()
  const days       = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months     = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const seasons    = ['Winter','Winter','Pre-Summer','Summer','Summer','Monsoon','Monsoon','Monsoon','Post-Monsoon','Post-Monsoon','Winter','Winter']
  const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} · Mumbai`
  const monthBadge = `${months[now.getMonth()]} · ${seasons[now.getMonth()]}`

  // Marking a task done logs a real care action — it can't be
  // unchecked afterward, same as you can't "un-water" a plant.
  const completeTask = async (task) => {
    if (completingTask[task.userPlantId] || completedToday.includes(task.userPlantId)) return

    setCompletingTask(prev => ({ ...prev, [task.userPlantId]: true }))
    try {
      await api.post('/users/care-log', {
        user_plant_id: task.userPlantId,
        action: 'watered',
      })
      setCompletedToday(prev => [...prev, task.userPlantId])
      toast.success(`${task.name} watered! 💧`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to log care')
    } finally {
      setCompletingTask(prev => ({ ...prev, [task.userPlantId]: false }))
    }
  }

  const taskBadge = (daysOverdue) => {
    if (daysOverdue >= 3) return { style: 'urgent', text: `${daysOverdue}d overdue` }
    if (daysOverdue >= 1) return { style: 'daily',  text: `${daysOverdue}d overdue` }
    return { style: 'weekly', text: 'Due today' }
  }

  const analysePhoto = (e, plantId) => {
    if (!e.target.files[0]) return
    setAnalysing(prev => ({ ...prev, [plantId]: true }))
    const results = {
      1: { health:85,  color:'#f59e0b',      aiClass:'warn', aiText:'⚠️ Slight overwatering. Let soil dry before next water.' },
      2: { health:100, color:'var(--accent)', aiClass:'good', aiText:'✅ Thriving! Perfect condition for this season.' },
      3: { health:60,  color:'#ef4444',       aiClass:'bad',  aiText:'❌ Yellowing leaves. Needs fertiliser + more indirect light.' },
      4: { health:92,  color:'var(--accent)', aiClass:'good', aiText:'✅ Healthy. Consider rotating 90° for even growth.' },
    }
    setTimeout(() => {
      const r = results[plantId] || { health:88, color:'var(--accent)', aiClass:'good', aiText:'✅ Looking healthy!' }
      setPlants(prev => prev.map(p => p.id === plantId ? { ...p, ...r } : p))
      setAnalysing(prev => ({ ...prev, [plantId]: false }))
    }, 1500)
  }

  const pendingTasks = tasks.filter(t => !completedToday.includes(t.userPlantId))
  const doneTasks    = tasks.filter(t =>  completedToday.includes(t.userPlantId))

  // Greeting based on time
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const userName = user?.name || 'there'

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>

      <Sidebar />

      {/* ── MAIN FEED ── */}
      <div style={{
        flex:1, overflowY:'auto', display:'flex', flexDirection:'column',
        gap:'24px', padding: isMobile ? '20px 16px 100px' : '40px',
      }}>

        {/* Greeting */}
        <div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? '22px' : '26px', fontWeight:'700', color:'var(--text-hero)', margin:0 }}>
            {greeting}, {userName} 🌿
          </h1>
          <p style={{ fontSize:'13px', marginTop:'4px', color:'var(--text-muted)' }}>{dateString}</p>
        </div>

        {/* ── SEASONAL CARD ── */}
        <div>
          <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'12px' }}>🌦️ This month</p>
          <div style={{ borderRadius:'20px', overflow:'hidden', border:'1.5px solid var(--border)' }}>
            <div style={{ background:'var(--text-hero)', padding: isMobile ? '14px 16px' : '16px 24px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}
              onClick={() => setSeasonalOpen(!seasonalOpen)}>
              {isMobile ? (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', flex:1, minWidth:0 }}>
                    <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--soft-leaf)', background:'rgba(201,219,178,0.1)', border:'1px solid rgba(201,219,178,0.2)', padding:'4px 10px', borderRadius:'50px', flexShrink:0 }}>
                      {monthBadge}
                    </span>
                    <span style={{ fontSize:'13px', fontWeight:'500', color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      Repot now before it's too late
                    </span>
                  </div>
                  <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px', transition:'transform 0.3s', transform: seasonalOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink:0 }}>▼</span>
                </>
              ) : (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--soft-leaf)', background:'rgba(201,219,178,0.1)', border:'1px solid rgba(201,219,178,0.2)', padding:'5px 14px', borderRadius:'50px' }}>
                      {monthBadge}
                    </span>
                    <span style={{ fontSize:'14px', fontWeight:'500', color:'#fff' }}>
                      Mumbai is heating up — repot now before it's too late
                    </span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <div style={{ display:'flex', gap:'8px' }}>
                      {['🌡️ 28–38°C','💧 Dry','☀️ High UV'].map(p => (
                        <span key={p} style={{ fontSize:'11px', padding:'4px 12px', borderRadius:'50px', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>{p}</span>
                      ))}
                    </div>
                    <span style={{ color:'rgba(255,255,255,0.5)', transition:'transform 0.3s', transform: seasonalOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  </div>
                </>
              )}
            </div>

            {seasonalOpen && (
              isMobile ? (
                <div>
                  <div style={{ display:'flex', background:'var(--surface)', borderBottom:'1.5px solid var(--border)' }}>
                    {[['do','✅ Do this month'],['avoid','❌ Avoid']].map(([tab, label]) => (
                      <button key={tab} onClick={() => setSeasonalTab(tab)}
                        style={{ flex:1, padding:'12px', border:'none', background: seasonalTab===tab ? 'var(--pill)' : 'transparent', color: seasonalTab===tab ? 'var(--accent)' : 'var(--text-muted)', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", borderBottom: seasonalTab===tab ? '2px solid var(--accent)' : '2px solid transparent', transition:'all 0.2s' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding:'16px', background:'var(--surface)', display:'flex', flexDirection:'column', gap:'8px' }}>
                    {seasonalTab === 'do' ? (
                      ['🪴 Repot root-bound plants before peak heat','💧 Water more frequently — soil dries faster','🌿 Move sensitive plants from west windows','🌱 Apply fertiliser before growth slows'].map(t => (
                        <div key={t} style={{ fontSize:'13px', padding:'10px 14px', borderRadius:'12px', background:'var(--pill)', color:'var(--text-body)', lineHeight:'1.5' }}>{t}</div>
                      ))
                    ) : (
                      ["🚫 Don't repot stressed or wilting plants","🚫 Avoid overwatering — roots rot in warm soil","🚫 No direct afternoon sun past 2pm"].map(t => (
                        <div key={t} style={{ fontSize:'13px', padding:'10px 14px', borderRadius:'12px', background:'#fef2f2', color:'#7f1d1d', lineHeight:'1.5' }}>{t}</div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px', padding:'32px', background:'var(--text-hero)' }}>
                    <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'22px', fontWeight:'700', color:'#fff', lineHeight:'1.3', margin:0 }}>
                      The heat is<br/>
                      <em style={{ fontStyle:'italic', color:'var(--soft-leaf)' }}>coming to Mumbai</em>
                    </h2>
                    <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:'1.7', margin:0 }}>
                      March marks the shift to dry pre-summer. This is your last window to prep before stress sets in.
                    </p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                      {['🌡️ 28–38°C','💧 Humidity dropping','☀️ High UV','🌬️ Dry winds'].map(c => (
                        <span key={c} style={{ fontSize:'11px', padding:'4px 12px', borderRadius:'50px', fontWeight:'500', color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>{c}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px', borderRadius:'16px', marginTop:'auto', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize:'28px' }}>🌵</span>
                      <div>
                        <div style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--soft-leaf)' }}>🌟 Plant of the month</div>
                        <div style={{ fontWeight:'700', color:'#fff', fontSize:'14px' }}>Snake Plant</div>
                        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)' }}>Thrives in heat, low water, perfect for Mumbai summers</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px', padding:'32px', background:'var(--surface)' }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent)', margin:0 }}>✅ Do this month</p>
                      {['🪴 Repot root-bound plants before peak heat','💧 Water more frequently — soil dries faster','🌿 Move sensitive plants from west windows','🌱 Apply fertiliser before growth slows'].map(t => (
                        <div key={t} style={{ fontSize:'13px', padding:'8px 16px', borderRadius:'12px', background:'var(--pill)', color:'var(--text-body)', lineHeight:'1.5' }}>{t}</div>
                      ))}
                    </div>
                    <div style={{ height:'1.5px', background:'var(--border)' }} />
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'#dc2626', margin:0 }}>❌ Avoid this month</p>
                      {["🚫 Don't repot stressed or wilting plants","🚫 Avoid overwatering — roots rot in warm soil","🚫 No direct afternoon sun past 2pm"].map(t => (
                        <div key={t} style={{ fontSize:'13px', padding:'8px 16px', borderRadius:'12px', background:'#fef2f2', color:'#7f1d1d', lineHeight:'1.5' }}>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── CARE TASKS ── */}
        <div>
          <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'12px' }}>🔔 Care tasks for today</p>
          {loadingTasks ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {[1,2].map(i => (
                <div key={i} style={{ height:'56px', borderRadius:'16px', background:'var(--surface)', border:'1.5px solid var(--border)' }} />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ padding:'20px', borderRadius:'16px', background:'var(--surface)', border:'1.5px solid var(--border)', textAlign:'center', color:'var(--text-muted)', fontSize:'13px' }}>
              🌿 Nothing due today — your plants are all watered on schedule.
            </div>
          ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {pendingTasks.map(t => {
              const badge = taskBadge(t.daysOverdue)
              return (
              <div key={t.userPlantId} onClick={() => completeTask(t)}
                style={{ display:'flex', alignItems:'center', gap: isMobile ? '12px' : '16px', padding: isMobile ? '12px 16px' : '16px 20px', borderRadius:'16px', cursor: completingTask[t.userPlantId] ? 'default' : 'pointer', background:'var(--surface)', border:'1.5px solid var(--border)', opacity: completingTask[t.userPlantId] ? 0.6 : 1 }}>
                <div style={{ width:'22px', height:'22px', border:'2px solid var(--border)', background:'var(--surface)', borderRadius:'50%', flexShrink:0 }} />
                <span style={{ fontSize: isMobile ? '18px' : '20px' }}>💧</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize: isMobile ? '13px' : '14px', fontWeight:'600', color:'var(--text-hero)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>Water {t.name}</div>
                  <div style={{ fontSize:'11px', marginTop:'2px', color:'var(--text-muted)' }}>{t.room}</div>
                </div>
                <span style={{ fontSize:'11px', fontWeight:'700', padding:'4px 10px', borderRadius:'50px', flexShrink:0, background: badge.style==='weekly'?'#dcfce7':badge.style==='daily'?'#fef3c7':'#fee2e2', color: badge.style==='weekly'?'#166534':badge.style==='daily'?'#92400e':'#991b1b' }}>
                  {badge.text}
                </span>
              </div>
            )})}
            {doneTasks.length > 0 && (
              <>
                <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'8px', color:'var(--text-muted)' }}>
                  ✓ Completed ({doneTasks.length})
                </p>
                {doneTasks.map(t => (
                  <div key={t.userPlantId}
                    style={{ display:'flex', alignItems:'center', gap: isMobile ? '12px' : '16px', padding: isMobile ? '12px 16px' : '16px 20px', borderRadius:'16px', opacity:0.5, background:'var(--pill)', border:'1.5px solid var(--border)' }}>
                    <div style={{ width:'22px', height:'22px', background:'var(--accent)', color:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', flexShrink:0 }}>✓</div>
                    <span style={{ fontSize: isMobile ? '18px' : '20px' }}>💧</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', fontWeight:'600', color:'var(--text-muted)', textDecoration:'line-through' }}>Water {t.name}</div>
                      <div style={{ fontSize:'11px', marginTop:'2px', color:'var(--text-muted)' }}>{t.room}</div>
                    </div>
                    <span style={{ fontSize:'11px', fontWeight:'700', padding:'4px 10px', borderRadius:'50px', flexShrink:0, background:'var(--border)', color:'var(--text-muted)' }}>
                      Done
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
          )}
        </div>

        {/* ── MY PLANTS ── */}
        <div>
          <p style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'12px' }}>🪴 My plants</p>

          {loadingPlants ? (
            // Skeleton loading
            <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap:'16px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ borderRadius:'20px', padding:'20px', background:'var(--surface)', border:'1.5px solid var(--border)', display:'flex', flexDirection:'column', gap:'12px' }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:'var(--border)', animation:'pulse 1.5s infinite' }} />
                  <div style={{ height:'14px', borderRadius:'8px', background:'var(--border)', width:'70%' }} />
                  <div style={{ height:'10px', borderRadius:'8px', background:'var(--border)', width:'50%' }} />
                  <div style={{ height:'4px',  borderRadius:'8px', background:'var(--border)' }} />
                </div>
              ))}
            </div>
          ) : plants.length === 0 ? (
            // Empty state
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>🌱</div>
              <div style={{ fontSize:'15px', fontWeight:'600' }}>No plants yet</div>
              <div style={{ fontSize:'13px', marginTop:'4px' }}>Add your first plant from My Plants page</div>
            </div>
          ) : (
            <>
              {!isMobile && (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
                  {plants.map(p => (
                    <PlantCard key={p.id} p={p} analysing={analysing} analysePhoto={analysePhoto} isMobile={false} />
                  ))}
                </div>
              )}
              {isMobile && (
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  {plants.map(p => (
                    <PlantCard key={p.id} p={p} analysing={analysing} analysePhoto={analysePhoto} isMobile={true} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

// ── PLANT CARD ────────────────────────────────────────────────────────────────
const PlantCard = ({ p, analysing, analysePhoto, isMobile }) => (
  isMobile ? (
    <div style={{ display:'flex', gap:'16px', padding:'16px', borderRadius:'16px', background:'var(--surface)', border:'1.5px solid var(--border)', alignItems:'center' }}>
      <div style={{ fontSize:'36px', flexShrink:0 }}>{p.emoji}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <div style={{ fontSize:'15px', fontWeight:'700', color:'var(--text-hero)' }}>{p.name}</div>
          <div style={{ fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)', flexShrink:0 }}>{p.health}%</div>
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-muted)', marginBottom:'8px' }}>{p.room}</div>
        <div style={{ height:'4px', background:'var(--border)', borderRadius:'50px', overflow:'hidden', marginBottom:'8px' }}>
          <div style={{ height:'100%', width:`${p.health}%`, background:p.color, borderRadius:'50px', transition:'width 0.6s ease' }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
          <div style={{ fontSize:'11px', fontWeight:'600', padding:'4px 10px', borderRadius:'50px', background:'var(--pill)', color:'var(--accent)' }}>{p.care}</div>
          {analysing[p.id] ? (
            <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>🔍 Analysing...</div>
          ) : (
            <label style={{ fontSize:'11px', fontWeight:'600', padding:'4px 12px', borderRadius:'50px', background:'var(--pill)', border:'1.5px solid var(--border)', color:'var(--accent)', cursor:'pointer' }}>
              📷 {p.aiText ? 'Retake' : 'Photo'}
              <input type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => analysePhoto(e, p.id)} />
            </label>
          )}
        </div>
        {p.aiText && (
          <div style={{ marginTop:'8px', fontSize:'12px', borderRadius:'10px', padding:'8px 12px', lineHeight:'1.5', background: p.aiClass==='good'?'#dcfce7':p.aiClass==='warn'?'#fef3c7':'#fee2e2', color: p.aiClass==='good'?'#166534':p.aiClass==='warn'?'#92400e':'#991b1b' }}>
            {p.aiText}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div style={{ display:'flex', flexDirection:'column', gap:'12px', borderRadius:'20px', padding:'20px', background:'var(--surface)', border:'1.5px solid var(--border)' }}>
      <div style={{ fontSize:'30px' }}>{p.emoji}</div>
      <div>
        <div style={{ fontSize:'14px', fontWeight:'700', color:'var(--text-hero)' }}>{p.name}</div>
        <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{p.room}</div>
      </div>
      <div style={{ height:'4px', background:'var(--border)', borderRadius:'50px', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${p.health}%`, background:p.color, borderRadius:'50px', transition:'width 0.6s ease' }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', color:'var(--text-muted)' }}>
        <span>Health</span><span>{p.health}%</span>
      </div>
      <div style={{ fontSize:'11px', fontWeight:'600', padding:'4px 12px', borderRadius:'50px', width:'fit-content', background:'var(--pill)', color:'var(--accent)' }}>{p.care}</div>
      {analysing[p.id] ? (
        <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>🔍 Analysing...</div>
      ) : (
        <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', fontWeight:'600', padding:'4px 12px', borderRadius:'50px', width:'fit-content', background:'var(--pill)', border:'1.5px solid var(--border)', color:'var(--accent)', cursor:'pointer' }}>
          📷 {p.aiText ? 'Retake photo' : 'Take photo'}
          <input type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => analysePhoto(e, p.id)} />
        </label>
      )}
      {p.aiText && (
        <div style={{ fontSize:'11px', borderRadius:'12px', padding:'8px 12px', lineHeight:'1.5', background: p.aiClass==='good'?'#dcfce7':p.aiClass==='warn'?'#fef3c7':'#fee2e2', color: p.aiClass==='good'?'#166534':p.aiClass==='warn'?'#92400e':'#991b1b' }}>
          {p.aiText}
        </div>
      )}
    </div>
  )
)

export default Dashboard