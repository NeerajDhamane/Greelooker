import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [seasonalOpen, setSeasonalOpen] = useState(false)
  const [tasks, setTasks] = useState([
    { id:1, icon:'🌱', title:'Fertilise Pothos',  sub:'Kitchen · Next: 15 Mar',      badge:'weekly', badgeText:'Weekly', done:false },
    { id:2, icon:'☀️', title:'Rotate Areca Palm', sub:'Balcony · Next: 12 Mar',      badge:'daily',  badgeText:'3 days', done:false },
    { id:3, icon:'💧', title:'Water Monstera',    sub:'Living room · Next: Tomorrow', badge:'urgent', badgeText:'Daily',  done:false },
  ])
  const [plants, setPlants] = useState([
    { id:1, emoji:'🪴', name:'Monstera',   room:'Living room', health:90,  color:'var(--accent)', care:'💧 Next: Tomorrow', aiClass:'', aiText:'' },
    { id:2, emoji:'🌵', name:'Cactus',     room:'Bedroom',     health:100, color:'var(--accent)', care:'✅ Next: 20 Mar',   aiClass:'', aiText:'' },
    { id:3, emoji:'🌿', name:'Pothos',     room:'Kitchen',     health:75,  color:'#f59e0b',       care:'🌱 Next: 15 Mar',  aiClass:'', aiText:'' },
    { id:4, emoji:'🌴', name:'Areca Palm', room:'Balcony',     health:95,  color:'var(--accent)', care:'☀️ Next: 12 Mar',  aiClass:'', aiText:'' },
  ])
  const [analysing, setAnalysing] = useState({})

  const now = new Date()
  const days    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months  = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const seasons = ['Winter','Winter','Pre-Summer','Summer','Summer','Monsoon','Monsoon','Monsoon','Post-Monsoon','Post-Monsoon','Winter','Winter']
  const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} · Mumbai`
  const monthBadge = `${months[now.getMonth()]} · ${seasons[now.getMonth()]}`

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const analysePhoto = (e, plantId) => {
    if (!e.target.files[0]) return
    setAnalysing(prev => ({ ...prev, [plantId]: true }))
    const results = {
      1: { health:85,  color:'#f59e0b',       aiClass:'warn', aiText:'⚠️ Slight overwatering. Let soil dry before next water.' },
      2: { health:100, color:'var(--accent)',  aiClass:'good', aiText:'✅ Thriving! Perfect condition for this season.' },
      3: { health:60,  color:'#ef4444',        aiClass:'bad',  aiText:'❌ Yellowing leaves. Needs fertiliser + more indirect light.' },
      4: { health:92,  color:'var(--accent)',  aiClass:'good', aiText:'✅ Healthy. Consider rotating 90° for even growth.' },
    }
    setTimeout(() => {
      const r = results[plantId]
      setPlants(prev => prev.map(p => p.id === plantId ? { ...p, ...r } : p))
      setAnalysing(prev => ({ ...prev, [plantId]: false }))
    }, 1500)
  }

  const pendingTasks = tasks.filter(t => !t.done)
  const doneTasks    = tasks.filter(t =>  t.done)

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>

      <Sidebar />

      {/* ── MAIN FEED ── */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-10">

        {/* Greeting */}
        <div>
          <h1 className="font-bold" style={{ fontFamily:"'Playfair Display', serif", fontSize:'26px', color:'var(--text-hero)' }}>
            Good morning, Arjun 🌿
          </h1>
          <p className="text-sm mt-1" style={{ color:'var(--text-muted)' }}>{dateString}</p>
        </div>

        {/* ── SEASONAL CARD ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-muted)' }}>🌦️ This month</p>
          <div className="overflow-hidden rounded-3xl" style={{ border:'1.5px solid var(--border)' }}>

            <div className="flex items-center justify-between px-6 py-4 cursor-pointer"
              style={{ background:'var(--text-hero)' }}
              onClick={() => setSeasonalOpen(!seasonalOpen)}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ color:'var(--soft-leaf)', background:'rgba(201,219,178,0.1)', border:'1px solid rgba(201,219,178,0.2)' }}>
                  {monthBadge}
                </span>
                <span className="text-sm font-medium" style={{ color:'#fff' }}>
                  Mumbai is heating up — repot now before it's too late
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {['🌡️ 28–38°C','💧 Dry','☀️ High UV'].map(p => (
                    <span key={p} className="text-xs px-3 py-1 rounded-full"
                      style={{ color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>
                      {p}
                    </span>
                  ))}
                </div>
                <span style={{ color:'rgba(255,255,255,0.5)', display:'inline-block', transition:'transform 0.3s', transform: seasonalOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </div>
            </div>

            {seasonalOpen && (
              <div className="grid grid-cols-2">

                <div className="flex flex-col gap-4 p-8" style={{ background:'var(--text-hero)' }}>
                  <h2 className="font-bold leading-snug"
                    style={{ fontFamily:"'Playfair Display', serif", fontSize:'22px', color:'#fff' }}>
                    The heat is<br/>
                    <em style={{ fontStyle:'italic', color:'var(--soft-leaf)' }}>coming to Mumbai</em>
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.5)' }}>
                    March marks the shift to dry pre-summer. This is your last window to prep before stress sets in.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['🌡️ 28–38°C','💧 Humidity dropping','☀️ High UV','🌬️ Dry winds'].map(c => (
                      <span key={c} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl mt-auto"
                    style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize:'28px' }}>🌵</span>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase" style={{ color:'var(--soft-leaf)' }}>🌟 Plant of the month</div>
                      <div className="font-bold" style={{ color:'#fff' }}>Snake Plant</div>
                      <div className="text-xs" style={{ color:'rgba(255,255,255,0.45)' }}>Thrives in heat, low water, perfect for Mumbai summers</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-8" style={{ background:'var(--surface)' }}>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color:'var(--accent)' }}>✅ Do this month</p>
                    {['🪴 Repot root-bound plants before peak heat','💧 Water more frequently — soil dries faster','🌿 Move sensitive plants from west windows','🌱 Apply fertiliser before growth slows'].map(t => (
                      <div key={t} className="text-sm px-4 py-2 rounded-xl leading-relaxed"
                        style={{ background:'var(--pill)', color:'var(--text-body)' }}>{t}</div>
                    ))}
                  </div>
                  <div style={{ height:'1.5px', background:'var(--border)' }} />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color:'#dc2626' }}>❌ Avoid this month</p>
                    {["🚫 Don't repot stressed or wilting plants","🚫 Avoid overwatering — roots rot in warm soil","🚫 No direct afternoon sun past 2pm"].map(t => (
                      <div key={t} className="text-sm px-4 py-2 rounded-xl leading-relaxed"
                        style={{ background:'#fef2f2', color:'#7f1d1d' }}>{t}</div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* ── CARE TASKS ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-muted)' }}>🔔 Care tasks for today</p>
          <div className="flex flex-col gap-2">

            {pendingTasks.map(t => (
              <div key={t.id} onClick={() => toggleTask(t.id)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer"
                style={{ background:'var(--surface)', border:'1.5px solid var(--border)' }}>
                <div className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width:'22px', height:'22px', border:'2px solid var(--border)', background:'var(--surface)' }} />
                <span style={{ fontSize:'20px' }}>{t.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color:'var(--text-hero)' }}>{t.title}</div>
                  <div className="text-xs mt-0.5" style={{ color:'var(--text-muted)' }}>{t.sub}</div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  t.badge === 'weekly' ? 'bg-green-100 text-green-800' :
                  t.badge === 'daily'  ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{t.badgeText}</span>
              </div>
            ))}

            {doneTasks.length > 0 && (
              <>
                <p className="text-xs font-bold tracking-widest uppercase mt-2 px-1" style={{ color:'var(--text-muted)' }}>
                  ✓ Completed ({doneTasks.length})
                </p>
                {doneTasks.map(t => (
                  <div key={t.id} onClick={() => toggleTask(t.id)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer opacity-50"
                    style={{ background:'var(--pill)', border:'1.5px solid var(--border)' }}>
                    <div className="flex items-center justify-center rounded-full flex-shrink-0 text-xs font-bold"
                      style={{ width:'22px', height:'22px', background:'var(--accent)', color:'#fff' }}>✓</div>
                    <span style={{ fontSize:'20px' }}>{t.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold line-through" style={{ color:'var(--text-muted)' }}>{t.title}</div>
                      <div className="text-xs mt-0.5" style={{ color:'var(--text-muted)' }}>{t.sub}</div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background:'var(--border)', color:'var(--text-muted)' }}>{t.badgeText}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* ── MY PLANTS ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'var(--text-muted)' }}>🪴 My plants</p>
          <div className="grid grid-cols-4 gap-4">
            {plants.map(p => (
              <div key={p.id} className="flex flex-col gap-3 rounded-2xl p-5"
                style={{ background:'var(--surface)', border:'1.5px solid var(--border)' }}>

                <div style={{ fontSize:'30px' }}>{p.emoji}</div>
                <div>
                  <div className="text-sm font-bold" style={{ color:'var(--text-hero)' }}>{p.name}</div>
                  <div className="text-xs" style={{ color:'var(--text-muted)' }}>{p.room}</div>
                </div>

                <div className="rounded-full overflow-hidden" style={{ height:'4px', background:'var(--border)' }}>
                  <div className="h-full rounded-full" style={{ width:`${p.health}%`, background:p.color, transition:'width 0.6s ease' }} />
                </div>
                <div className="flex justify-between text-xs" style={{ color:'var(--text-muted)' }}>
                  <span>Health</span><span>{p.health}%</span>
                </div>

                <div className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                  style={{ background:'var(--pill)', color:'var(--accent)' }}>
                  {p.care}
                </div>

                {analysing[p.id] ? (
                  <div className="text-xs" style={{ color:'var(--text-muted)' }}>🔍 Analysing...</div>
                ) : (
                  <label className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full w-fit cursor-pointer"
                    style={{ background:'var(--pill)', border:'1.5px solid var(--border)', color:'var(--accent)' }}>
                    📷 {p.aiText ? 'Retake photo' : 'Take photo'}
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => analysePhoto(e, p.id)} />
                  </label>
                )}

                {p.aiText && (
                  <div className="text-xs rounded-xl px-3 py-2 leading-relaxed"
                    style={{
                      background: p.aiClass === 'good' ? '#dcfce7' : p.aiClass === 'warn' ? '#fef3c7' : '#fee2e2',
                      color:      p.aiClass === 'good' ? '#166534' : p.aiClass === 'warn' ? '#92400e' : '#991b1b',
                    }}>
                    {p.aiText}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
