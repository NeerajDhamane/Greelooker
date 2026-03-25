import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const ALL_PLANTS = [
  {
    name:'Monstera Deliciosa', sci:'Monstera deliciosa',
    img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
    score:98, scoreHigh:true,
    tags:['Medium light','Low water','Large','Air purifier'],
    why:'Perfect for your living room. Thrives in Mumbai humidity and indirect light from windows.',
    care:'low', size:'large', filter:'air',
    placement:[
      { icon:'📍', text:'Place 3–5 feet from your window — bright indirect light is ideal, avoid harsh afternoon sun.' },
      { icon:'🔄', text:'Rotate 90° every 2 weeks so all leaves get equal light exposure.' },
      { icon:'💧', text:'Water only when top 2 inches of soil are dry. Mumbai humidity means less frequent watering.' },
      { icon:'📏', text:'Leave at least 2 feet of clearance — Monsteras spread wide as they grow.' },
    ]
  },
  {
    name:'Pothos', sci:'Epipremnum aureum',
    img:'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80',
    score:96, scoreHigh:true,
    tags:['Low–medium light','Very low water','Trailing'],
    why:'Incredibly adaptable. Trails beautifully near windows and tolerates Mumbai heat very well.',
    care:'low', size:'small', filter:'',
    placement:[
      { icon:'📍', text:'Ideal on a high shelf near the window — let the vines trail down naturally.' },
      { icon:'☀️', text:'Works in low light corners too, but grows faster with some indirect light.' },
      { icon:'💧', text:'Water every 7–10 days. Yellowing leaves = overwatering in your climate.' },
      { icon:'✂️', text:'Trim long vines to encourage bushier growth and better shape.' },
    ]
  },
  {
    name:'Snake Plant', sci:'Sansevieria trifasciata',
    img:'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',
    score:94, scoreHigh:true,
    tags:['Any light','Very low water','Air purifier'],
    why:'Survives anything. Ideal for high floors where light varies. Top air purifier.',
    care:'low', size:'small', filter:'air',
    placement:[
      { icon:'📍', text:'Great in corners, hallways or next to the TV — tolerates low light perfectly.' },
      { icon:'🌬️', text:'On higher floors, keep away from direct AC vents — cold dry air dries leaves.' },
      { icon:'💧', text:'Water only once every 2–3 weeks. Most overwatered plant in India.' },
      { icon:'🌡️', text:'Thrives in Mumbai heat — no special care needed during summer.' },
    ]
  },
  {
    name:'Areca Palm', sci:'Dypsis lutescens',
    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    score:88, scoreHigh:true,
    tags:['Bright indirect','Medium water','Large','Tropical'],
    why:'Adds a tropical feel perfect for Mumbai homes. Loves humidity and bright windows.',
    care:'medium', size:'large', filter:'',
    placement:[
      { icon:'📍', text:'Place near your brightest window — east or north facing is ideal in Mumbai.' },
      { icon:'💦', text:'Mist leaves every 2–3 days in dry seasons.' },
      { icon:'📏', text:'Needs at least 4 feet of vertical space. Perfect statement plant.' },
      { icon:'🪣', text:'Ensure pot has good drainage — soggy roots are its only weakness.' },
    ]
  },
  {
    name:'Peace Lily', sci:'Spathiphyllum wallisii',
    img:'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80',
    score:82, scoreHigh:false,
    tags:['Low light','Medium water','Air purifier','Flowering'],
    why:'Excellent air purifier. Thrives in lower light common in Mumbai apartments.',
    care:'medium', size:'small', filter:'air',
    placement:[
      { icon:'📍', text:'Ideal in shaded corners or bathrooms — one of few flowering plants for low light.' },
      { icon:'💧', text:"Drooping leaves = needs water. It will literally tell you when it's thirsty." },
      { icon:'🌸', text:'White flowers bloom in spring — place where you can appreciate them daily.' },
      { icon:'🚫', text:'Keep away from direct sun and AC — both cause brown leaf tips.' },
    ]
  },
  {
    name:'ZZ Plant', sci:'Zamioculcas zamiifolia',
    img:'https://images.unsplash.com/photo-1526565782131-a07de2f0b3f8?w=400&q=80',
    score:79, scoreHigh:false,
    tags:['Low light','Very low water','Glossy leaves'],
    why:'Near-indestructible. Great for spaces with limited light. Perfect for beginners.',
    care:'low', size:'small', filter:'',
    placement:[
      { icon:'📍', text:'Perfect for dark office corners or shelves far from windows.' },
      { icon:'💧', text:'Water once every 3 weeks. Stores water in rhizomes — thrives on neglect.' },
      { icon:'✨', text:'Wipe leaves with a damp cloth monthly to keep that natural shine.' },
      { icon:'🌡️', text:'Handles Mumbai heat well — keep away from cold AC drafts overnight.' },
    ]
  },
]

const FLOORS = [
  'Ground floor','1st floor','2nd floor','3rd floor','4th floor','5th floor',
  '6th floor','7th floor','8th floor','9th floor','10th floor','11th floor',
  '12th floor','13th floor','14th floor','15th floor','16th floor','17th floor',
  '18th floor','19th floor','20th floor','21st floor & above',
]

const Pills = ({ options, selected, onSelect }) => (
  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
    {options.map(opt => (
      <button key={opt} onClick={() => onSelect(opt)} style={{
        padding:'12px 24px', borderRadius:'50px', fontSize:'14px',
        fontFamily:"'DM Sans', sans-serif",
        fontWeight: selected === opt ? '600' : '500',
        border: selected === opt ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
        background: selected === opt ? 'var(--pill)' : '#fff',
        color: selected === opt ? 'var(--accent)' : 'var(--text-body)',
        cursor:'pointer',
        boxShadow: selected === opt ? '0 1px 6px rgba(58,125,68,0.15)' : '0 1px 4px rgba(26,46,26,0.08)',
        transition:'all 0.18s ease',
      }}>
        {opt}
      </button>
    ))}
  </div>
)

const Question = ({ label, sub, error, errorMsg, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
    <div style={{ fontSize:'15px', fontWeight:'700', color: error ? '#dc2626' : 'var(--text-hero)', display:'flex', alignItems:'center', gap:'6px' }}>
      {label} <span style={{ color:'#dc2626' }}>*</span>
    </div>
    {sub && <p style={{ fontSize:'12px', color:'var(--text-muted)', marginTop:'-4px' }}>{sub}</p>}
    {children}
    {error && <p style={{ fontSize:'12px', color:'#dc2626', fontWeight:'600' }}>⚠️ {errorMsg}</p>}
  </div>
)

const Divider = () => <div style={{ height:'1px', background:'var(--border)' }} />

const inputBase = (err) => ({
  padding:'12px 16px', borderRadius:'14px',
  border: err ? '1.5px solid #dc2626' : '1.5px solid var(--border)',
  background:'#fff', color:'var(--text-hero)',
  fontSize:'14px', fontFamily:"'DM Sans', sans-serif",
  outline:'none', boxShadow:'0 1px 4px rgba(26,46,26,0.08)',
})

const Recommend = () => {
  const [screen, setScreen]               = useState('quiz')
  const [answers, setAnswers]             = useState({ room:'', floor:'', sun:'', size:'', sqft:'', area:'', city:'' })
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const [photoPreview, setPhotoPreview]   = useState('')
  const [errors, setErrors]               = useState({})
  const [activeFilter, setActiveFilter]   = useState('all')
  const [openPlacements, setOpenPlacements] = useState({})

  const pick = (field, value) => {
    setAnswers(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: false }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result)
      setPhotoUploaded(true)
      setErrors(p => ({ ...p, photo: false }))
    }
    reader.readAsDataURL(file)
  }

  const submit = () => {
    const e = {}
    if (!answers.room)  e.room  = true
    if (!answers.floor) e.floor = true
    if (!answers.sun)   e.sun   = true
    if (!answers.size)  e.size  = true
    if (!answers.sqft)  e.sqft  = true
    if (!answers.area)  e.area  = true
    if (!answers.city)  e.city  = true
    if (!photoUploaded) e.photo = true
    setErrors(e)
    if (Object.keys(e).length > 0) {
      setTimeout(() => document.querySelector('[data-err="true"]')?.scrollIntoView({ behavior:'smooth', block:'center' }), 50)
      return
    }
    setScreen('results')
    window.scrollTo(0, 0)
  }

  const filtered = activeFilter === 'all'
    ? ALL_PLANTS
    : ALL_PLANTS.filter(p => p.care === activeFilter || p.size === activeFilter || p.filter === activeFilter)

  const togglePlacement = (i) => setOpenPlacements(p => ({ ...p, [i]: !p[i] }))

  // ── QUIZ ──
  if (screen === 'quiz') return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>
      <Sidebar />
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', padding:'48px' }}>

          <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'10px' }}>✨ AI Recommendation</p>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'42px', color:'var(--text-hero)', marginBottom:'8px' }}>Find your perfect plants</h1>
          <p style={{ fontSize:'15px', color:'var(--text-muted)', lineHeight:'1.6', marginBottom:'40px' }}>All fields are required. We'll match you with plants that will actually thrive in your space.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

            <div data-err={errors.room ? 'true' : undefined}>
              <Question label="🏠 What type of room is it?" error={errors.room} errorMsg="Please select a room type">
                <Pills options={['Bedroom','Living Room','Balcony','Office / Study','Kitchen','Bathroom']} selected={answers.room} onSelect={v => pick('room', v)} />
              </Question>
            </div>
            <Divider />

            <div data-err={errors.floor ? 'true' : undefined}>
              <Question label="🏢 Which floor are you on?" sub="Higher floors get more wind and direct sunlight — affects plant survival" error={errors.floor} errorMsg="Please select your floor">
                <select value={answers.floor}
                  onChange={e => { setAnswers(p => ({...p, floor:e.target.value})); setErrors(p => ({...p, floor:false})) }}
                  style={{ ...inputBase(errors.floor), width:'240px', cursor:'pointer' }}>
                  <option value="">Select floor...</option>
                  {FLOORS.map(f => <option key={f}>{f}</option>)}
                </select>
              </Question>
            </div>
            <Divider />

            <div data-err={errors.sun ? 'true' : undefined}>
              <Question label="☀️ How much sunlight does the space get?" error={errors.sun} errorMsg="Please select sunlight level">
                <Pills options={['🌑 Low — barely any light','🌤️ Medium — indirect light','🌞 Bright — lots of indirect','☀️ Direct — full sun most of day']} selected={answers.sun} onSelect={v => pick('sun', v)} />
              </Question>
            </div>
            <Divider />

            <div data-err={errors.size ? 'true' : undefined}>
              <Question label="📐 How big is the space?" error={errors.size} errorMsg="Please select space size">
                <Pills options={['Small (under 100 sq ft)','Medium (100–300 sq ft)','Large (300+ sq ft)']} selected={answers.size} onSelect={v => pick('size', v)} />
              </Question>
            </div>
            <Divider />

            <div data-err={errors.sqft ? 'true' : undefined}>
              <Question label="📏 Approximate sq ft of the room?" error={errors.sqft} errorMsg="Please enter the sq ft">
                <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                  <input type="number" placeholder="e.g. 180" min="1" value={answers.sqft}
                    onChange={e => { setAnswers(p => ({...p, sqft:e.target.value})); setErrors(p => ({...p, sqft:false})) }}
                    style={{ ...inputBase(errors.sqft), width:'160px' }} />
                  <span style={{ fontSize:'13px', color:'var(--text-muted)', fontWeight:'500' }}>sq ft</span>
                </div>
              </Question>
            </div>
            <Divider />

            <div data-err={errors.area ? 'true' : undefined}>
              <Question label="📍 Where in the room do you want the plant?" error={errors.area} errorMsg="Please select placement">
                <Pills options={['🪟 Near the window','🌿 Corner of the room','⬛ Centre of the room','🪴 Balcony edge / railing','🖥️ On my desk','🛁 Bathroom shelf']} selected={answers.area} onSelect={v => pick('area', v)} />
              </Question>
            </div>
            <Divider />

            <div data-err={errors.city ? 'true' : undefined}>
              <Question label="🌆 Which city are you in?" sub="Climate affects which plants survive and thrive" error={errors.city} errorMsg="Please select your city">
                <Pills options={['🌊 Mumbai','🌬️ Delhi','🌿 Bangalore','🌶️ Chennai','🌧️ Kolkata','🏔️ Pune','Other']} selected={answers.city} onSelect={v => pick('city', v)} />
              </Question>
            </div>
            <Divider />

            <div data-err={errors.photo ? 'true' : undefined}>
              <Question label="📸 Share a photo of your space" sub="Required — AI analyses actual light, layout and vibe for accurate recommendations" error={errors.photo} errorMsg="Please upload a photo of your space">
                <label style={{ display:'block', cursor:'pointer' }}>
                  <div style={{
                    border: errors.photo ? '2px dashed #dc2626' : photoUploaded ? '2px dashed var(--accent)' : '2px dashed var(--border)',
                    borderRadius:'20px', padding:'28px', textAlign:'center',
                    background: errors.photo ? '#fef2f2' : photoUploaded ? 'var(--pill)' : '#fff',
                    boxShadow:'0 1px 4px rgba(26,46,26,0.08)', transition:'all 0.2s',
                  }}>
                    <input type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }} />
                    {photoPreview ? (
                      <>
                        <img src={photoPreview} alt="preview" style={{ width:'100%', maxHeight:'200px', objectFit:'cover', borderRadius:'12px' }} />
                        <p style={{ fontSize:'12px', color:'var(--accent)', fontWeight:'600', marginTop:'10px' }}>✅ Photo uploaded — tap to change</p>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize:'28px', marginBottom:'8px' }}>📷</div>
                        <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text-body)', marginBottom:'4px' }}>Upload or take a photo</div>
                        <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>AI analyses light levels, space and layout</div>
                      </>
                    )}
                  </div>
                </label>
              </Question>
            </div>

            <div style={{ height:'1.5px', background:'var(--border)' }} />

            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <p style={{ fontSize:'13px', color:'var(--text-muted)' }}>🌿 Matching from 500+ plants</p>
              <button onClick={submit} style={{ padding:'14px 36px', borderRadius:'50px', border:'none', background:'var(--text-hero)', color:'#fff', fontSize:'15px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans', sans-serif" }}>
                Find My Plants ✨
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )

  // ── RESULTS ──
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>
      <Sidebar />
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto', padding:'48px' }}>

          <button onClick={() => { setScreen('quiz'); window.scrollTo(0,0) }}
            style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', fontWeight:'600', color:'var(--text-muted)', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", marginBottom:'28px', padding:0 }}>
            ← Edit answers
          </button>

          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'28px', color:'var(--text-hero)', marginBottom:'6px' }}>Your plant matches 🌿</h2>
          <p style={{ fontSize:'13px', color:'var(--text-muted)', marginBottom:'20px' }}>
            {answers.room} · {answers.floor} · {answers.city} · {answers.sun} · {answers.area}
          </p>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'24px' }}>
            {[['all','All'],['low','Low care'],['medium','Medium care'],['air','Air purifier'],['small','Small'],['large','Large']].map(([val, label]) => (
              <button key={val} onClick={() => setActiveFilter(val)} style={{ padding:'7px 16px', borderRadius:'50px', fontSize:'12px', fontWeight:'600', border: activeFilter === val ? '1.5px solid var(--accent)' : '1.5px solid var(--border)', background: activeFilter === val ? 'var(--pill)' : '#fff', color: activeFilter === val ? 'var(--accent)' : 'var(--text-muted)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 1px 4px rgba(26,46,26,0.08)' }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
            {filtered.map((p, i) => (
              <div key={i} style={{ background:'#fff', border:'1.5px solid var(--border)', borderRadius:'24px', overflow:'hidden', boxShadow:'0 2px 12px rgba(26,46,26,0.06)' }}>
                <img src={p.img} alt={p.name} style={{ width:'100%', height:'160px', objectFit:'cover', display:'block' }} onError={e => { e.target.style.display='none' }} />
                <div style={{ padding:'16px', display:'flex', flexDirection:'column', gap:'10px' }}>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontSize:'15px', fontWeight:'700', color:'var(--text-hero)' }}>{p.name}</div>
                      <div style={{ fontSize:'11px', color:'var(--text-muted)', fontStyle:'italic' }}>{p.sci}</div>
                    </div>
                    <div style={{ fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', flexShrink:0, background: p.scoreHigh ? '#dcfce7' : '#fef3c7', color: p.scoreHigh ? '#166534' : '#92400e' }}>
                      {p.score}% match
                    </div>
                  </div>

                  <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                    {p.tags.map(t => <span key={t} style={{ fontSize:'11px', fontWeight:'500', padding:'3px 10px', borderRadius:'50px', background:'var(--pill)', color:'var(--text-muted)', border:'1px solid var(--border)' }}>{t}</span>)}
                  </div>

                  <div style={{ fontSize:'12px', color:'var(--text-body)', lineHeight:'1.6', padding:'10px 12px', borderRadius:'12px', background:'var(--pill)' }}>💡 {p.why}</div>

                  <div style={{ display:'flex', gap:'8px' }}>
                    <button style={{ flex:1, padding:'9px', borderRadius:'50px', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", background:'var(--text-hero)', color:'#fff', border:'none' }}>Add to dashboard</button>
                    <button style={{ flex:1, padding:'9px', borderRadius:'50px', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", background:'transparent', color:'var(--text-body)', border:'1.5px solid var(--border)' }}>Add to cart</button>
                  </div>

                  <button onClick={() => togglePlacement(i)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:'12px', cursor:'pointer', background:'var(--pill)', border:'1.5px solid var(--border)', width:'100%', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:'600', color:'var(--accent)' }}>
                    <span>📍 See placement guide</span>
                    <span style={{ transition:'transform 0.2s', display:'inline-block', transform: openPlacements[i] ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  </button>

                  {openPlacements[i] && (
                    <div style={{ background:'var(--text-hero)', borderRadius:'16px', padding:'16px', display:'flex', flexDirection:'column', gap:'10px' }}>
                      <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--soft-leaf)' }}>📍 Where to place in your space</p>
                      {p.placement.map((s, j) => (
                        <div key={j} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                          <span style={{ fontSize:'16px', flexShrink:0 }}>{s.icon}</span>
                          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.75)', lineHeight:'1.6' }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Recommend