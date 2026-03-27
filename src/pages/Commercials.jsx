import { useState } from 'react'
import Navbar from '../components/Navbar'

// ── DATA ─────────────────────────────────────────────────────────────────────

// Content for each business segment tab (headline, stats, features, image)
const segments = {
  'Cafes & Restaurants': {
    headline: 'Turn your café into a living, breathing space',
    sub: 'Plants increase dwell time by up to 30%. Customers stay longer, spend more, and come back for the ambience.',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    stats: [{ n:'30%', l:'Longer dwell time' }, { n:'4.2×', l:'More Instagram shares' }, { n:'22%', l:'Higher avg spend' }],
    features: ['Curated plant selection for your café aesthetic','Monthly maintenance visits','Seasonal plant rotation','Pest & disease management','Dedicated plant care expert'],
  },
  'Offices & Coworking': {
    headline: 'Boost focus and wellbeing in your workspace',
    sub: 'Biophilic offices see 15% higher productivity and 6% higher creativity. Your team deserves to breathe better.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    stats: [{ n:'15%', l:'Productivity increase' }, { n:'6%', l:'Creativity boost' }, { n:'60%', l:'Reduced sick leaves' }],
    features: ['Desk plants for every team member','Air purifying plants for meeting rooms','Reception & lobby installations','Biweekly watering & maintenance','Slack/WhatsApp care reminders'],
  },
  'Hotels & Resorts': {
    headline: 'Craft unforgettable first impressions with greenery',
    sub: 'From lobbies to suites — a green hotel scores higher on reviews. Guests associate plants with luxury and calm.',
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    stats: [{ n:'+0.8', l:'Star rating improvement' }, { n:'40%', l:'Better review scores' }, { n:'3×', l:'Guest photo mentions' }],
    features: ['Lobby & atrium statement plants','Suite & room plant packages','Restaurant & bar green walls','Pool & spa tropical arrangements','Full-time on-site plant manager (premium)'],
  },
}

// Pricing tier cards — highlight flag controls dark background styling
const plans = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/month',
    desc: 'Perfect for small cafés, boutiques or startups just getting started with greening.',
    features: ['Up to 10 plants','Monthly maintenance visit','Basic plant selection','Email support','Replacement guarantee'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₹6,999',
    period: '/month',
    desc: 'Our most popular plan for growing businesses who want a serious green transformation.',
    features: ['Up to 30 plants','Biweekly maintenance','Custom design consultation','Priority WhatsApp support','Seasonal rotation','Pest & disease cover'],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    desc: 'For large offices, hotel chains and commercial properties with custom requirements.',
    features: ['Unlimited plants','Weekly maintenance','Dedicated plant manager','24/7 support','Green wall installations','Staff plant care training'],
    cta: 'Talk to Us',
    highlight: false,
  },
]

// Client testimonial cards
const testimonials = [
  { name:'Priya Mehta',   role:'Owner, The Brew Room Café · Mumbai',          quote:'GreeLooker completely transformed our space. Customers literally stop to take photos now. Our Instagram engagement went up 3x in 2 months.',   avatar:'P' },
  { name:'Rohit Sharma',  role:'Facilities Head, NestWork Coworking · Bangalore', quote:'The team handled everything — design, installation, maintenance. Zero effort from our side. Our members love the vibe now.',                avatar:'R' },
  { name:'Aisha Kapoor',  role:'GM, The Palm Resort · Goa',                   quote:'Our lobby reviews went from "nice hotel" to "absolutely stunning". Plants made the difference. GreeLooker is our go-to partner.',               avatar:'A' },
]

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// Popup modal with a lead capture form — shows success state after submit
const QuoteModal = ({ onClose }) => {
  const [form, setForm]           = useState({ name:'', business:'', segment:'', size:'', city:'', phone:'', message:'' })
  const [submitted, setSubmitted] = useState(false)

  // Helper to update a single field in the form state
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Basic validation — requires name, phone and segment before submitting
  const submit = () => {
    if (!form.name || !form.phone || !form.segment) return
    setSubmitted(true)
  }

  return (
    <>
      {/* Blurred backdrop — clicking it closes the modal */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:99, backdropFilter:'blur(3px)' }} />

      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'520px', maxWidth:'90vw', maxHeight:'90vh', overflowY:'auto', background:'#fff', borderRadius:'28px', zIndex:100, boxShadow:'0 24px 64px rgba(26,46,26,0.2)', padding:'40px' }}>

        {/* Success state shown after form submission */}
        {submitted ? (
          <div style={{ textAlign:'center', padding:'24px 0' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🌿</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', color:'var(--text-hero)', marginBottom:'8px' }}>We'll be in touch!</h2>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', lineHeight:'1.7', marginBottom:'28px' }}>
              Thanks {form.name}! Our team will reach out within 24 hours to discuss your green space.
            </p>
            <button onClick={onClose} style={{ padding:'12px 32px', borderRadius:'50px', border:'none', background:'var(--text-hero)', color:'#fff', fontSize:'14px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px' }}>
              <div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'22px', color:'var(--text-hero)', marginBottom:'4px' }}>Get a free quote</h2>
                <p style={{ fontSize:'13px', color:'var(--text-muted)' }}>We'll design a custom green plan for your space</p>
              </div>
              <button onClick={onClose} style={{ background:'var(--pill)', border:'1.5px solid var(--border)', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', fontSize:'18px', color:'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>×</button>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Your Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Sharma"
                    style={{ width:'100%', padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Business Name</label>
                  <input value={form.business} onChange={e => set('business', e.target.value)} placeholder="The Green Café"
                    style={{ width:'100%', padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }} />
                </div>
              </div>

              {/* Business type — pill toggle buttons instead of a dropdown */}
              <div>
                <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Business Type *</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Cafe & Restaurant','Office & Coworking','Hotel & Resort','Retail Store','Other'].map(s => (
                    <button key={s} onClick={() => set('segment', s)} style={{ padding:'7px 16px', borderRadius:'50px', border: form.segment === s ? '1.5px solid var(--accent)' : '1.5px solid var(--border)', background: form.segment === s ? 'var(--pill)' : '#fff', color: form.segment === s ? 'var(--accent)' : 'var(--text-muted)', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Space Size (sq ft)</label>
                  <input value={form.size} onChange={e => set('size', e.target.value)} placeholder="e.g. 800 sq ft" type="number"
                    style={{ width:'100%', padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>City</label>
                  <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Mumbai"
                    style={{ width:'100%', padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', boxSizing:'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Phone Number *</label>
                {/* Country code prefix displayed as a static label next to the input */}
                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <span style={{ padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', color:'var(--text-muted)', background:'var(--pill)', flexShrink:0 }}>🇮🇳 +91</span>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" type="tel" maxLength={10}
                    style={{ flex:1, padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize:'12px', fontWeight:'600', color:'var(--text-muted)', display:'block', marginBottom:'6px' }}>Tell us about your space</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Describe your space, style preferences, any specific plants you like..."
                  rows={3}
                  style={{ width:'100%', padding:'10px 14px', borderRadius:'12px', border:'1.5px solid var(--border)', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', resize:'none', boxSizing:'border-box' }} />
              </div>

              <button onClick={submit} style={{ width:'100%', padding:'14px', borderRadius:'50px', border:'none', background:'var(--text-hero)', color:'#fff', fontSize:'15px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", marginTop:'4px' }}>
                Request Free Quote →
              </button>

              <p style={{ fontSize:'11px', color:'var(--text-muted)', textAlign:'center' }}>🔒 Your details are safe with us. No spam, ever.</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

const Commercials = () => {
  const [quoteOpen, setQuoteOpen]         = useState(false)           // controls quote modal visibility
  const [activeSegment, setActiveSegment] = useState('Cafes & Restaurants') // selected segment tab
  const [activePlan, setActivePlan]       = useState('Growth')        // selected pricing card

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ background:'var(--text-hero)', minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>

        {/* Inline navbar — dark version for this page only */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 60px', position:'relative', zIndex:10 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'#fff' }}>
            Gree<span style={{ color:'var(--soft-leaf)' }}>Looker</span>
            <span style={{ fontSize:'11px', fontWeight:'500', color:'rgba(255,255,255,0.4)', marginLeft:'12px', letterSpacing:'0.1em', textTransform:'uppercase' }}>for Business</span>
          </span>
          <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
            <a href="/" style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.6)', textDecoration:'none' }}>← Back to GreeLooker</a>
            <button onClick={() => setQuoteOpen(true)} style={{ padding:'10px 24px', borderRadius:'50px', border:'1.5px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Get Free Quote
            </button>
          </div>
        </div>

        {/* Hero text and CTA buttons */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'60px 40px', position:'relative', zIndex:10 }}>
          <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--soft-leaf)', marginBottom:'20px', display:'block' }}>
            🌿 Commercial Green Spaces
          </span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'64px', fontWeight:'700', color:'#fff', lineHeight:'1.1', marginBottom:'24px', maxWidth:'780px' }}>
            Spaces that breathe.<br />
            <em style={{ color:'var(--soft-leaf)' }}>Businesses that grow.</em>
          </h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.6)', lineHeight:'1.7', maxWidth:'560px', marginBottom:'40px' }}>
            We design, install and maintain living green spaces for cafés, offices and hotels across India. Zero effort for you — maximum impact for your space.
          </p>
          <div style={{ display:'flex', gap:'14px', alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
            <button onClick={() => setQuoteOpen(true)} style={{ padding:'16px 36px', borderRadius:'50px', border:'none', background:'var(--soft-leaf)', color:'var(--text-hero)', fontSize:'16px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Get a Free Quote →
            </button>
            <a href="#how-it-works" style={{ padding:'16px 36px', borderRadius:'50px', border:'1.5px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)', fontSize:'15px', fontWeight:'600', textDecoration:'none' }}>
              See How It Works
            </a>
          </div>

          {/* Key stats row */}
          <div style={{ display:'flex', gap:'40px', marginTop:'64px', flexWrap:'wrap', justifyContent:'center' }}>
            {[['500+','Plants installed'],['50+','Business clients'],['4.9★','Average rating'],['0','Plants lost to neglect']].map(([n, l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'28px', fontWeight:'700', color:'#fff', fontFamily:"'Playfair Display',serif" }}>{n}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative ring circles — purely visual */}
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'360px', height:'360px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.06)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)', pointerEvents:'none' }} />
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <div id="how-it-works" style={{ padding:'80px 60px', background:'#fff' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px' }}>Simple Process</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'36px', color:'var(--text-hero)' }}>How it works</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px', maxWidth:'900px', margin:'0 auto' }}>
          {[
            { step:'01', icon:'📋', title:'Tell us about your space', desc:'Fill out a quick form with your space size, type and style preferences. Takes 2 minutes.' },
            { step:'02', icon:'🌿', title:'We design your green plan', desc:'Our experts visit your space and create a custom plant layout tailored to your lighting and aesthetic.' },
            { step:'03', icon:'✅', title:'We install and maintain', desc:'We handle delivery, installation and ongoing care. Monthly visits, replacements included. Zero effort for you.' },
          ].map(s => (
            <div key={s.step} style={{ textAlign:'center', padding:'32px 24px', borderRadius:'24px', border:'1.5px solid var(--border)', background:'var(--surface)' }}>
              <div style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.12em', color:'var(--text-muted)', marginBottom:'16px' }}>{s.step}</div>
              <div style={{ fontSize:'36px', marginBottom:'16px' }}>{s.icon}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', color:'var(--text-hero)', marginBottom:'10px' }}>{s.title}</h3>
              <p style={{ fontSize:'13px', color:'var(--text-muted)', lineHeight:'1.7' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEGMENT SHOWCASE ──────────────────────────────────────────────── */}
      <div style={{ padding:'80px 60px', background:'var(--bg)' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px' }}>We serve</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'36px', color:'var(--text-hero)' }}>Built for every commercial space</h2>
        </div>

        {/* Tab pills to switch between segment views */}
        <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginBottom:'48px' }}>
          {Object.keys(segments).map(s => (
            <button key={s} onClick={() => setActiveSegment(s)} style={{ padding:'10px 24px', borderRadius:'50px', border: activeSegment === s ? '1.5px solid var(--accent)' : '1.5px solid var(--border)', background: activeSegment === s ? 'var(--pill)' : '#fff', color: activeSegment === s ? 'var(--accent)' : 'var(--text-muted)', fontSize:'14px', fontWeight: activeSegment === s ? '600' : '500', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {s}
            </button>
          ))}
        </div>

        {/* Render the active segment content (IIFE keeps this inline) */}
        {(() => {
          const seg = segments[activeSegment]
          return (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center', maxWidth:'1100px', margin:'0 auto' }}>
              <div>
                <img src={seg.img} alt={activeSegment} style={{ width:'100%', height:'400px', objectFit:'cover', borderRadius:'24px', display:'block' }} onError={e => e.target.style.display='none'} />
              </div>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', color:'var(--text-hero)', marginBottom:'16px', lineHeight:'1.3' }}>{seg.headline}</h3>
                <p style={{ fontSize:'14px', color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'28px' }}>{seg.sub}</p>

                {/* Stat tiles */}
                <div style={{ display:'flex', gap:'20px', marginBottom:'28px' }}>
                  {seg.stats.map(st => (
                    <div key={st.l} style={{ textAlign:'center', padding:'16px 20px', borderRadius:'16px', background:'var(--text-hero)', flex:1 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:'var(--soft-leaf)' }}>{st.n}</div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'4px' }}>{st.l}</div>
                    </div>
                  ))}
                </div>

                {/* Feature checklist */}
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'32px' }}>
                  {seg.features.map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', color:'var(--text-body)' }}>
                      <span style={{ color:'var(--accent)', fontWeight:'700', flexShrink:0 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <button onClick={() => setQuoteOpen(true)} style={{ padding:'14px 32px', borderRadius:'50px', border:'none', background:'var(--text-hero)', color:'#fff', fontSize:'14px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Get a Quote for {activeSegment} →
                </button>
              </div>
            </div>
          )
        })()}
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div style={{ padding:'80px 60px', background:'#fff' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px' }}>Transparent Pricing</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'36px', color:'var(--text-hero)', marginBottom:'12px' }}>Simple monthly plans</h2>
          <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>No setup fee. No lock-in. Cancel anytime.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px', maxWidth:'960px', margin:'0 auto' }}>
          {plans.map(plan => (
            // Clicking a card lifts it up via translateY on activePlan match
            <div key={plan.name} onClick={() => setActivePlan(plan.name)}
              style={{ padding:'32px 28px', borderRadius:'24px', border: plan.highlight ? '2px solid var(--accent)' : '1.5px solid var(--border)', background: plan.highlight ? 'var(--text-hero)' : '#fff', cursor:'pointer', position:'relative', transition:'transform 0.2s', transform: activePlan === plan.name ? 'translateY(-4px)' : 'none' }}>

              {/* "Most Popular" floating label above highlighted card */}
              {plan.highlight && (
                <span style={{ position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', fontSize:'11px', fontWeight:'700', padding:'4px 16px', borderRadius:'50px', background:'var(--accent)', color:'#fff', whiteSpace:'nowrap' }}>
                  Most Popular
                </span>
              )}

              <div style={{ fontSize:'16px', fontWeight:'700', color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', marginBottom:'8px' }}>{plan.name}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'12px' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color: plan.highlight ? '#fff' : 'var(--text-hero)' }}>{plan.price}</span>
                <span style={{ fontSize:'13px', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>{plan.period}</span>
              </div>
              <p style={{ fontSize:'12px', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', lineHeight:'1.6', marginBottom:'24px' }}>{plan.desc}</p>

              {/* Feature list */}
              <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'28px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color: plan.highlight ? 'rgba(255,255,255,0.75)' : 'var(--text-body)' }}>
                    <span style={{ color: plan.highlight ? 'var(--soft-leaf)' : 'var(--accent)', fontWeight:'700', flexShrink:0 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <button onClick={() => setQuoteOpen(true)} style={{ width:'100%', padding:'12px', borderRadius:'50px', border: plan.highlight ? 'none' : '1.5px solid var(--border)', background: plan.highlight ? 'var(--soft-leaf)' : 'transparent', color: plan.highlight ? 'var(--text-hero)' : 'var(--text-body)', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                {plan.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <div style={{ padding:'80px 60px', background:'var(--bg)' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px' }}>What our clients say</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'36px', color:'var(--text-hero)' }}>Real spaces. Real results.</h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px', maxWidth:'1000px', margin:'0 auto' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ padding:'28px', borderRadius:'24px', background:'#fff', border:'1.5px solid var(--border)' }}>
              <div style={{ fontSize:'24px', color:'var(--accent)', marginBottom:'16px', fontFamily:'serif' }}>"</div>
              <p style={{ fontSize:'13px', color:'var(--text-body)', lineHeight:'1.8', marginBottom:'20px', fontStyle:'italic' }}>{t.quote}</p>
              {/* Avatar uses first letter of name as a coloured circle */}
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--accent)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'14px', flexShrink:0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'700', color:'var(--text-hero)' }}>{t.name}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <div style={{ padding:'80px 60px', background:'var(--text-hero)', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'40px', color:'#fff', marginBottom:'16px' }}>
          Ready to go green?
        </h2>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.55)', marginBottom:'36px', maxWidth:'480px', margin:'0 auto 36px' }}>
          Join 50+ businesses across India who trust GreeLooker to keep their spaces alive and thriving.
        </p>
        <button onClick={() => setQuoteOpen(true)} style={{ padding:'16px 40px', borderRadius:'50px', border:'none', background:'var(--soft-leaf)', color:'var(--text-hero)', fontSize:'16px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          Get Your Free Quote Today →
        </button>
      </div>

      {/* Quote modal — only rendered when open */}
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}

    </div>
  )
}

export default Commercials