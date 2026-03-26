import FloatingPlants from "../components/FloatingPlants"
import { useState } from "react"
import { Link } from "react-router-dom"
import cm1 from '../assets/commercials/cafecomm.jpg'
import cm2 from '../assets/commercials/officecomm.jpg'

// ── DATA ─────────────────────────────────────────────────────────────────────

// Scrolling trust badges shown at the bottom of the hero
const TRUST_ITEMS = [
  '🌿 Beginner Friendly',
  '🚚 Ships Across India',
  '🌱 Safe Delivery for Live Plants',
  '⭐ 4.9 Rated by 500+ customers',
  '♻️ Zero Waste Gifting',
  '🤖 AI-Powered Recommendations',
]

// Product cards shown in the auto-scrolling bestsellers row
const BESTSELLERS = [
  { name: 'Monstera Deliciosa',     category: 'Plants',          img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',  price: 499, originalPrice: 699,  rating: 5, reviews: 319, discount: '-29%', badge: null        },
  { name: 'Snake Plant',            category: 'Plants',          img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',  price: 299, originalPrice: null, rating: 5, reviews: 445, discount: null,   badge: 'Bestseller' },
  { name: 'Pothos Golden',          category: 'Plants',          img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80',  price: 199, originalPrice: null, rating: 4, reviews: 267, discount: null,   badge: null        },
  { name: 'Terracotta Pot Set',     category: 'Pots & Planters', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',  price: 349, originalPrice: 499,  rating: 4, reviews: 128, discount: '-30%', badge: null        },
  { name: 'Premium Potting Mix',    category: 'Soil',            img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',  price: 299, originalPrice: 399,  rating: 5, reviews: 203, discount: '-25%', badge: 'Bestseller' },
  { name: 'Areca Palm',             category: 'Plants',          img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',    price: 399, originalPrice: 599,  rating: 4, reviews: 98,  discount: '-33%', badge: null        },
  { name: 'Fine Mist Spray Bottle', category: 'Watering',        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',  price: 149, originalPrice: null, rating: 5, reviews: 211, discount: null,   badge: null        },
  { name: 'Peace Lily',             category: 'Plants',          img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80',  price: 279, originalPrice: 399,  rating: 4, reviews: 156, discount: '-30%', badge: null        },
  { name: 'ZZ Plant',               category: 'Plants',          img: 'https://images.unsplash.com/photo-1526565782131-a07de2f0b3f8?w=400&q=80',  price: 249, originalPrice: null, rating: 4, reviews: 134, discount: null,   badge: null        },
  { name: 'Ceramic White Planter',  category: 'Pots & Planters', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',  price: 599, originalPrice: null, rating: 5, reviews: 84,  discount: null,   badge: 'New'       },
]

// Shop by category grid — each links to the relevant page
const CATEGORIES = [
  { name: 'Indoor Plants',      emoji: '🪴', path: '/accessories' },
  { name: 'Air Purifying',      emoji: '💨', path: '/accessories' },
  { name: 'Succulents',         emoji: '🌵', path: '/accessories' },
  { name: 'Gifting',            emoji: '🎁', path: '/gifting'     },
  { name: 'Seeds',              emoji: '🌱', path: '/accessories' },
  { name: 'Pots & Planters',    emoji: '🏺', path: '/accessories' },
  { name: 'Tools',              emoji: '✂️', path: '/accessories' },
  { name: 'Soil & Fertilisers', emoji: '🌿', path: '/accessories' },
  { name: 'Flowering Plants',   emoji: '🌸', path: '/accessories' },
  { name: 'Lucky Plants',       emoji: '🍀', path: '/accessories' },
]

// Gift product cards shown in the gifting section
const GIFT_CARDS = [
  { title: 'Date Night',   tag: 'For the one who makes your heart bloom',         seed: '🌱 Rose seeds inside',       price: 'From ₹999', badge: 'Most Loved', img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80',  blob: '#c9dbb2', extra: 'Wildflower bouquet · plantable mud base · rose seeds'  },
  { title: 'Anniversary',  tag: 'Celebrate what keeps growing between you',       seed: '🌱 Jasmine seeds inside',    price: 'From ₹899', badge: null,          img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80',  blob: '#7fb069', extra: 'Jasmine bouquet · plantable base · gift ribbon'         },
  { title: 'Birthday',     tag: 'A gift that grows as they do',                   seed: '🌱 Sunflower seeds inside',  price: 'From ₹699', badge: null,          img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80', blob: '#3a7d44', extra: 'Seasonal bouquet · sunflower seed base · card'           },
  { title: 'Just Because', tag: "No reason needed. Plants don't need one either", seed: '🌱 Wildflower seeds inside', price: 'From ₹599', badge: null,          img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc05?w=600&q=80', blob: '#c9dbb2', extra: 'Mixed wildflower bouquet · plantable mud base'           },
]

// Accordion FAQ items
const FAQS = [
  { q: 'What makes GreeLooker different?',            a: 'We use AI to match plants specifically to your space — your city, floor, light, and room type. Not generic lists, actual matches that will thrive.' },
  { q: 'How does the AI recommendation work?',        a: 'You fill out a short quiz and upload a room photo. Our AI analyses light levels, layout and vibe to recommend plants with the highest survival chance.' },
  { q: 'Do you deliver live plants across India?',    a: 'Yes! We ship live plants across India with special breathable packaging. Most metros get delivery in 3–5 days.' },
  { q: "What if my plant doesn't survive?",           a: "We offer a 30-day survival guarantee. If your plant doesn't make it, we'll replace it for free. No questions asked." },
  { q: 'Can I use GreeLooker for my office or café?', a: 'Absolutely. Our Commercials section is built for B2B clients — we design, install and maintain green spaces for offices, cafés and hotels.' },
  { q: 'Are your bouquets really plantable?',         a: 'Yes — every bouquet comes with a mud base embedded with seeds. When the flowers dry out, you plant the base and wildflowers grow from it.' },
]

// Steps shown in the "How it works" section
const HOW_STEPS = [
  { num: '01', title: 'Tell us your space', desc: 'Room size, sunlight, city — we build your plant profile.',  img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80', color: 'var(--accent)', ring: 'rgba(58,125,68,0.08)',   shadow: 'rgba(58,125,68,0.28)'   },
  { num: '02', title: 'Upload a photo',     desc: 'Snap your room. AI reads your light and layout.',           img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', color: 'var(--leaf)',   ring: 'rgba(127,176,105,0.08)', shadow: 'rgba(127,176,105,0.25)' },
  { num: '03', title: 'AI recommends',      desc: '500+ plants scored and matched to your space.',             img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&q=80', color: 'var(--accent)', ring: 'rgba(58,125,68,0.08)',   shadow: 'rgba(58,125,68,0.28)'   },
  { num: '04', title: 'See your matches',   desc: 'Browse your personalised list with care tips.',             img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=500&q=80', color: 'var(--leaf)',   ring: 'rgba(127,176,105,0.08)', shadow: 'rgba(127,176,105,0.25)' },
  { num: '05', title: 'Pick your plan',     desc: 'Go free or unlock yearly delivery and expert care.',        img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80', color: 'var(--accent)', ring: 'rgba(58,125,68,0.1)',    shadow: 'rgba(58,125,68,0.35)'   },
]

// Social media link icons rendered inline as SVGs
const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/neerajspams12/',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <defs>
          <radialGradient id="ig3" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig3)" />
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/918530804734',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#25D366" />
        <path d="M17 14.8c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.9-.8 1-.1.2-.3.2-.5.1-.8-.3-1.6-.8-2.2-1.4-.6-.6-1.1-1.4-1.3-2.2 0-.2 0-.4.2-.5.1-.1.3-.3.4-.5.1-.1.2-.3.1-.5-.1-.2-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.7-.9 1.5-.8 2.3.1.9.5 1.7 1 2.4 1.1 1.5 2.6 2.6 4.3 3.1.6.2 1.2.2 1.8.1.7-.1 1.3-.6 1.6-1.2.1-.3.1-.6 0-.9z" fill="white" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/neeraj-dhamane-621a953a2/',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#0A66C2" />
        <path d="M7 9h2v8H7V9zm1-1a1.1 1.1 0 110-2.2A1.1 1.1 0 018 8zm3 1h2v1.1c.4-.7 1.2-1.1 2-1.1 2 0 2.5 1.3 2.5 3V17h-2v-3.5c0-.8-.3-1.5-1.1-1.5-.9 0-1.4.7-1.4 1.6V17h-2V9z" fill="white" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/theGreatSkull12',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="12" fill="#000" />
        <path d="M17.5 5h-2.3L12 9.2 9.2 5H5l4.8 6.9L5 19h2.3l3.4-4.5L14.1 19H19l-5.1-7.2L17.5 5z" fill="white" />
      </svg>
    ),
  },
]

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// Infinite scrolling marquee strip pinned to the bottom of the hero
const TrustStrip = () => (
  <div style={{ background: 'var(--text-hero)', overflow: 'hidden', padding: '10px 0' }}>
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center', animation: 'trustScroll 24s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
      {/* Duplicate items so the scroll looks infinite */}
      {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
        <span key={i} style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.75)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          {item}
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px' }}>·</span>
        </span>
      ))}
    </div>
    <style>{`@keyframes trustScroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
  </div>
)

// Animated SVG curve with a moving dot connecting two "How it works" steps
const StepConnector = ({ id, direction }) => {
  const isUp = direction === 'up'
  // Path curves up or down depending on which steps are adjacent
  const path = isUp
    ? 'M 10 140 C 10 60, 70 60, 70 10'
    : 'M 10 10 C 10 80, 70 80, 70 140'

  // Controls when each animated dot is visible (one at a time per connector)
  const opacityMap = {
    1: '0;1;1;0;0;0;0;0;0;0',
    2: '0;0;0;1;1;0;0;0;0;0',
    3: '0;0;0;0;0;1;1;0;0;0',
    4: '0;0;0;0;0;0;0;1;1;0',
  }
  const keyTimesMap = {
    1: '0;0.05;0.22;0.27;0.5;0.51;0.75;0.76;0.99;1',
    2: '0;0.25;0.26;0.27;0.48;0.52;0.75;0.76;0.99;1',
    3: '0;0.25;0.49;0.52;0.73;0.77;0.99;1;1;1',
    4: '0;0.25;0.49;0.74;0.76;0.77;0.98;1;1;1',
  }

  return (
    <div style={{ flexShrink: 0, width: '80px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-80px' }}>
      <svg width="80" height="180" viewBox="0 0 80 180" overflow="visible">
        <defs>
          <marker id={`a${id}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
          </marker>
          <filter id={`glow${id}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Dashed path line */}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.5" markerEnd={`url(#a${id})`} />
        {/* Invisible path that the dot follows */}
        <path id={`p${id}`} d={path} fill="none" />
        {/* Glowing dot that travels along the path */}
        <circle r="6" fill="var(--accent)" filter={`url(#glow${id})`}>
          <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear">
            <mpath href={`#p${id}`} />
          </animateMotion>
          <animate attributeName="opacity" values={opacityMap[id]} keyTimes={keyTimesMap[id]} dur="8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

const Home = () => {
  // Tracks which commercial image to show (cafe or office)
  const [activeProject, setActiveProject] = useState('cafe')
  // Tracks which FAQ is open (null = all closed)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── SECTION 1: HERO ───────────────────────────────────────────────── */}
      <section style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>

        {/* Soft radial glow behind the hero text */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', borderRadius: '50%', opacity: 0.25, background: 'radial-gradient(circle, var(--soft-leaf), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />

        <FloatingPlants />

        {/* Center-aligned hero text, CTA buttons and stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px 0', position: 'relative', zIndex: 1 }}>

          {/* Pill badge above the heading */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 18px', borderRadius: '50px', background: 'var(--pill)', border: '1.5px solid var(--border)', fontSize: '11px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
            🌿 Plant care, reimagined
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: '700', color: 'var(--text-hero)', lineHeight: '1.1', marginBottom: '20px', maxWidth: '800px' }}>
            Grow something beautiful<br />
            <span style={{ color: 'var(--accent)' }}>for every space</span>
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '480px', marginBottom: '32px' }}>
            AI-powered plant recommendations tailored to your space, climate and lifestyle.
            Track your plants. Build greener spaces. Gift sustainably.
          </p>

          {/* Primary + secondary CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
            <Link to="/recommend">
              <button style={{ padding: '13px 32px', borderRadius: '50px', border: 'none', background: 'var(--text-hero)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                Find My Plants →
              </button>
            </Link>
            <Link to="/gifting">
              <button style={{ padding: '13px 32px', borderRadius: '50px', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-body)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                Explore Gifting
              </button>
            </Link>
          </div>

          {/* Four key stats separated by vertical dividers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['500+', 'Plants in database'], ['4.9★', 'Average rating'], ['98%', 'Survival rate'], ['0 waste', 'From our bouquets']].map(([n, l], i, arr) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-hero)', fontFamily: "'Playfair Display',serif" }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{l}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: '1px', height: '28px', background: 'var(--border)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip pinned to the very bottom of the hero */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
          <TrustStrip />
        </div>
      </section>

      {/* ── SECTION 2: HOME vs COMMERCIAL SPLIT ──────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh', gap: '16px', padding: '16px', background: '#FAF3E1' }}>

        {/* Left card — for home buyers */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
          <img src={cm1} alt="home" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.95) 35%, rgba(10,20,10,0.45) 70%, rgba(10,20,10,0.15) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '44px 48px' }}>
            <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '16px', padding: '5px 14px', borderRadius: '50px', background: 'rgba(201,219,178,0.12)', border: '1px solid rgba(201,219,178,0.2)', width: 'fit-content' }}>
              🏠 For Your Home
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: '700', color: '#fff', lineHeight: '1.15', marginBottom: '12px' }}>
              Your personal<br />
              <em style={{ fontStyle: 'italic', color: 'var(--soft-leaf)' }}>green space</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.8', marginBottom: '20px', maxWidth: '360px' }}>
              Tell us your room size, sunlight and style. Get a curated plant plan — or go premium with yearly delivery, care reminders and expert guidance.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '28px' }}>
              {['🌱 Free recommendations', '📦 Yearly plan', '💧 Care reminders', '👨‍🌾 Expert Consultation'].map(p => (
                <span key={p} style={{ padding: '5px 14px', borderRadius: '50px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: '500' }}>{p}</span>
              ))}
            </div>
            <Link to="/recommend" style={{ width: 'fit-content' }}>
              <button style={{ padding: '12px 28px', borderRadius: '50px', border: 'none', background: 'var(--soft-leaf)', color: 'var(--text-hero)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                Explore Home Plans →
              </button>
            </Link>
          </div>
        </div>

        {/* Right card — for commercial (cafe/office toggle) */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 24px 60px rgba(26,46,26,0.18)' }}>
          <img
            src={activeProject === 'cafe' ? cm1 : cm2}
            alt="commercial"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.95) 35%, rgba(10,20,10,0.45) 70%, rgba(10,20,10,0.15) 100%)' }} />

          {/* Pill toggle to switch between cafe and office view */}
          <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 2, display: 'flex', gap: '4px', padding: '4px', borderRadius: '50px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {['cafe', 'office'].map(type => (
              <button key={type} onClick={() => setActiveProject(type)}
                style={{ padding: '7px 20px', borderRadius: '50px', border: 'none', background: activeProject === type ? 'var(--soft-leaf)' : 'transparent', color: activeProject === type ? 'var(--text-hero)' : 'rgba(255,255,255,0.55)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' }}>
                {type === 'cafe' ? '☕ Cafe' : '🏢 Office'}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '44px 48px' }}>
            <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '16px', padding: '5px 14px', borderRadius: '50px', background: 'rgba(201,219,178,0.12)', border: '1px solid rgba(201,219,178,0.2)', width: 'fit-content' }}>
              🏢 For Commercials
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: '700', color: '#fff', lineHeight: '1.15', marginBottom: '12px' }}>
              Green spaces<br />
              <em style={{ fontStyle: 'italic', color: 'var(--soft-leaf)' }}>at scale</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.8', marginBottom: '20px', maxWidth: '360px' }}>
              From cafes to corporate towers — we plan, plant and maintain. Area-based planting, yearly care insurance and on-site consultation in one package.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}>
              {['🗺️ Area-based Planning', '🛡️ Yearly Care Insurance', '🚚 Bulk Delivery', '👷 On-site Consultation'].map(p => (
                <span key={p} style={{ padding: '5px 14px', borderRadius: '50px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: '500' }}>{p}</span>
              ))}
            </div>

            {/* Stats change based on active toggle (cafe vs office) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '28px' }}>
              {(activeProject === 'cafe'
                ? [{ v: '85',  l: 'Plants managed' }, { v: '100%', l: 'Coverage' }, { v: '12mo', l: 'Duration' }]
                : [{ v: '240', l: 'Plants managed' }, { v: '100%', l: 'Coverage' }, { v: '12mo', l: 'Duration' }]
              ).map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '14px', padding: '14px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--soft-leaf)', fontFamily: "'Playfair Display',serif" }}>{s.v}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <Link to="/commercials" style={{ width: 'fit-content' }}>
              <button style={{ padding: '12px 28px', borderRadius: '50px', border: 'none', background: 'var(--soft-leaf)', color: 'var(--text-hero)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                Get a Commercial Quote →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BESTSELLERS + SHOP BY CATEGORY ────────────────────── */}
      <section style={{ background: 'var(--text-hero)', padding: '40px 0' }}>

        <div style={{ padding: '0 60px', marginBottom: '20px' }}>
          <p style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '6px' }}>Top picks</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', color: '#fff', fontWeight: '700' }}>Bestsellers</h2>
            <Link to="/accessories" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--soft-leaf)', textDecoration: 'none', paddingRight: '60px' }}>View all →</Link>
          </div>
        </div>

        {/* Auto-scrolling product row — pauses on hover */}
        <div style={{ overflow: 'hidden', position: 'relative', padding: '4px 0', marginBottom: '32px' }}>
          {/* Left/right fade masks to hide the scroll edge */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--text-hero), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--text-hero), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <div id="best-scroll" style={{ display: 'flex', gap: '14px', animation: 'bestScroll 32s linear infinite', width: 'max-content', paddingLeft: '60px' }}>
            {/* Duplicate array so the scroll looks seamless/infinite */}
            {[...BESTSELLERS, ...BESTSELLERS].map((p, i) => (
              <div key={i}
                style={{ flexShrink: 0, width: '220px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.04)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)'
                  e.currentTarget.style.border = '1px solid rgba(201,219,178,0.3)'
                  document.getElementById('best-scroll').style.animationPlayState = 'paused'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'
                  document.getElementById('best-scroll').style.animationPlayState = 'running'
                }}>
                <div style={{ position: 'relative', height: '160px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                  {p.discount && <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--accent)', color: '#fff', fontSize: '9px', fontWeight: '700', padding: '2px 9px', borderRadius: '50px' }}>{p.discount}</span>}
                  {p.badge   && <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#fef3c7', color: '#92400e', fontSize: '9px', fontWeight: '700', padding: '2px 9px', borderRadius: '50px' }}>{p.badge}</span>}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--soft-leaf)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{p.category}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '4px', lineHeight: '1.3' }}>{p.name}</div>
                  <div style={{ fontSize: '10px', color: '#f59e0b', marginBottom: '8px' }}>
                    {'★'.repeat(p.rating)}{'☆'.repeat(5 - p.rating)}
                    <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '3px', fontSize: '9px' }}>({p.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>₹{p.price}</span>
                      {p.originalPrice && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginLeft: '5px' }}>₹{p.originalPrice}</span>}
                    </div>
                    {/* Add to cart button — shows a checkmark for 1.5s on click */}
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        const btn = e.currentTarget
                        btn.textContent = '✓'
                        btn.style.background = 'var(--soft-leaf)'
                        btn.style.color = 'var(--text-hero)'
                        setTimeout(() => { btn.textContent = '+ Cart'; btn.style.background = 'rgba(255,255,255,0.12)'; btn.style.color = '#fff' }, 1500)
                      }}
                      style={{ padding: '6px 12px', borderRadius: '50px', border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' }}>
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <style>{`@keyframes bestScroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 60px 32px' }} />

        <div style={{ padding: '0 60px', marginBottom: '20px' }}>
          <p style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '6px' }}>Browse collections</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', color: '#fff', fontWeight: '700' }}>Shop by category</h2>
            <Link to="/accessories" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--soft-leaf)', textDecoration: 'none' }}>View all →</Link>
          </div>
        </div>

        {/* Category icon circles */}
        <div style={{ overflow: 'hidden', position: 'relative', padding: '4px 0' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--text-hero), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--text-hero), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '28px', padding: '0 60px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={i} to={cat.path}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}
                onMouseEnter={e => {
                  const circle = e.currentTarget.querySelector('.cat-inner')
                  circle.style.transform = 'scale(1.12)'
                  circle.style.background = 'rgba(201,219,178,0.2)'
                  circle.style.borderColor = 'var(--soft-leaf)'
                  circle.style.boxShadow = '0 8px 28px rgba(201,219,178,0.15)'
                }}
                onMouseLeave={e => {
                  const circle = e.currentTarget.querySelector('.cat-inner')
                  circle.style.transform = 'scale(1)'
                  circle.style.background = 'rgba(255,255,255,0.07)'
                  circle.style.borderColor = 'rgba(255,255,255,0.12)'
                  circle.style.boxShadow = 'none'
                }}>
                <div className="cat-inner" style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', transition: 'all 0.25s ease' }}>
                  {cat.emoji}
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.65)', textAlign: 'center', maxWidth: '72px', lineHeight: '1.3' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ───────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px 40px', overflow: 'hidden' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>🌿 How it works</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: '700', color: 'var(--text-hero)', lineHeight: '1.2' }}>
            Simple as <span style={{ color: 'var(--accent)' }}>three steps</span>
          </h2>
        </div>

        {/* Steps alternate top/bottom text; connectors animate between them */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', width: '100%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          {HOW_STEPS.map((step, i) => {
            const isTop = i % 2 !== 0  // odd-index steps show label above the circle
            const isLast = i === HOW_STEPS.length - 1
            const circleStyle = {
              width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden',
              border: `5px solid ${step.color}`,
              boxShadow: `0 0 0 10px ${step.ring}, 0 20px 48px ${step.shadow}`,
              position: 'relative', flexShrink: 0,
            }

            return (
              <>
                <div key={`step-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flex: 1 }}>
                  {isTop && (
                    <div style={{ textAlign: 'center', width: '170px' }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '15px', fontWeight: '700', color: 'var(--text-hero)', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</div>
                    </div>
                  )}
                  {!isTop && <div style={{ height: '80px' }} />}

                  {/* Step circle with background image, dark overlay and step number */}
                  <div style={circleStyle}>
                    <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,20,10,0.52)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--soft-leaf)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Step</span>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '44px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{step.num}</span>
                    </div>
                  </div>

                  {!isTop && (
                    <div style={{ textAlign: 'center', width: '170px' }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '15px', fontWeight: '700', color: 'var(--text-hero)', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</div>
                    </div>
                  )}
                  {isTop && <div style={{ height: '80px' }} />}
                </div>

                {!isLast && (
                  <StepConnector key={`conn-${i}`} id={i + 1} direction={isTop ? 'down' : 'up'} />
                )}
              </>
            )
          })}

          {/* Final straight arrow pointing to the outcome cards */}
          <div style={{ flexShrink: 0, width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '80px' }}>
            <svg width="48" height="24" viewBox="0 0 48 24">
              <defs>
                <marker id="a5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
                </marker>
              </defs>
              <path d="M 0 12 L 40 12" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" markerEnd="url(#a5)" />
            </svg>
          </div>

          {/* Free plan vs Premium plan outcome cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, marginBottom: '80px' }}>
            <div style={{ width: '148px', background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '14px', boxShadow: '0 8px 24px rgba(26,46,26,0.1)' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>🌱</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '13px', fontWeight: '700', color: 'var(--text-hero)', marginBottom: '3px' }}>Free Plan</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '8px' }}>Get your plant list instantly.</div>
              <span style={{ padding: '3px 10px', borderRadius: '50px', background: 'var(--pill)', color: 'var(--accent)', fontSize: '10px', fontWeight: '700', border: '1px solid var(--border)' }}>Free forever</span>
            </div>
            <div style={{ width: '148px', background: 'var(--text-hero)', borderRadius: '16px', padding: '14px', boxShadow: '0 8px 24px rgba(26,46,26,0.2)' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>📦</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Yearly Package</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', marginBottom: '8px' }}>Plants + care all year.</div>
              <span style={{ padding: '3px 10px', borderRadius: '50px', background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: '700' }}>Premium</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/recommend">
            <button style={{ padding: '13px 36px', borderRadius: '50px', border: 'none', background: 'var(--text-hero)', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 24px rgba(26,46,26,0.2)' }}>
              Find My Plants →
            </button>
          </Link>
        </div>
      </section>

      {/* ── SECTION 5: GIFTING ───────────────────────────────────────────────*/}
      <div style={{ background: 'linear-gradient(160deg, #1c1f14 0%, #242b18 40%, #1a1f11 100%)', padding: '72px 60px', marginBottom: '0' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '10px' }}>💐 For Gifting</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '52px', fontWeight: '700', color: '#fff', marginBottom: '12px', lineHeight: '1.1' }}>
            A bouquet they'll <em style={{ fontStyle: 'italic', color: 'var(--soft-leaf)' }}>grow forever</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            Every bouquet comes with a plantable mud base embedded with seeds. Not just a gift — something they nurture and keep for life.
          </p>
        </div>

        {/* CSS-only gift card hover effects (spin border, float image, slide text) */}
        <style>{`
          .gift-wrap { display: flex; gap: 24px; justify-content: center; align-items: center; padding-bottom: 8px; }
          .g-card { position: relative; width: 256px; height: 360px; border-radius: 20px; z-index: 1; overflow: hidden; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; flex-shrink: 0; }
          .g-card:hover { transform: scale(1.05) rotate(-1.5deg); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
          .g-border-spin { position: absolute; inset: -3px; border-radius: 22px; z-index: 0; overflow: hidden; }
          .g-border-spin::before { content: ''; position: absolute; top: 50%; left: 50%; width: 200%; height: 200%; transform: translate(-50%, -50%) rotate(0deg); background: conic-gradient(transparent 0deg, transparent 60deg, var(--soft-leaf) 90deg, var(--accent) 120deg, transparent 150deg, transparent 220deg, rgba(201,219,178,0.6) 250deg, var(--soft-leaf) 280deg, transparent 310deg, transparent 360deg); animation: spinBorder 4s linear infinite; }
          @keyframes spinBorder { 0% { transform: translate(-50%,-50%) rotate(0deg); } 100% { transform: translate(-50%,-50%) rotate(360deg); } }
          .g-border-inner { position: absolute; inset: 3px; border-radius: 18px; background: #1a1f11; z-index: 1; }
          .g-blob { position: absolute; z-index: 2; top: 50%; left: 50%; width: 200px; height: 200px; border-radius: 50%; opacity: 0.8; filter: blur(18px); animation: gBlob 5s infinite ease; pointer-events: none; }
          @keyframes gBlob { 0% { transform: translate(-100%,-100%) translate3d(0,0,0); } 25% { transform: translate(-100%,-100%) translate3d(100%,0,0); } 50% { transform: translate(-100%,-100%) translate3d(100%,100%,0); } 75% { transform: translate(-100%,-100%) translate3d(0,100%,0); } 100% { transform: translate(-100%,-100%) translate3d(0,0,0); } }
          .g-inner { position: absolute; top: 5px; left: 5px; width: calc(100% - 10px); height: calc(100% - 10px); z-index: 3; background: rgba(255,255,255,0.06); backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px); border-radius: 16px; outline: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
          .g-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: height 0.35s ease, filter 0.35s ease; }
          .g-card:hover .g-inner .g-img { height: 58%; filter: blur(6px); animation: gImgFloat 3s infinite ease-in-out; }
          @keyframes gImgFloat { 0% { transform: translateY(0); } 50% { transform: translateY(-16px); } 100% { transform: translateY(0); } }
          .g-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,20,10,0.97) 42%, rgba(10,20,10,0.15) 100%); z-index: 2; transition: background 0.35s ease; }
          .g-card:hover .g-inner .g-overlay { background: linear-gradient(to top, rgba(10,20,10,0.98) 58%, rgba(10,20,10,0.4) 100%); }
          .g-text { position: absolute; bottom: 0; left: 0; right: 0; padding: 22px; z-index: 3; transition: transform 0.35s ease; }
          .g-card:hover .g-inner .g-text { transform: translateY(-8px); }
          .g-extra { opacity: 0; max-height: 0; overflow: hidden; transition: opacity 0.35s ease, max-height 0.4s ease; }
          .g-card:hover .g-inner .g-text .g-extra { opacity: 1; max-height: 60px; }
          .g-badge { position: absolute; top: 14px; right: 14px; z-index: 10; font-size: 9px; font-weight: 700; padding: 4px 12px; border-radius: 50px; background: var(--accent); color: #fff; letter-spacing: 0.1em; text-transform: uppercase; pointer-events: none; }
          .g-price { position: absolute; top: 14px; left: 14px; z-index: 10; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7); pointer-events: none; }
        `}</style>

        <div className="gift-wrap">
          {GIFT_CARDS.map((card, i) => (
            <div key={i} className="g-card">
              <div className="g-border-spin"><div className="g-border-inner" /></div>
              <div className="g-blob" style={{ backgroundColor: card.blob }} />
              <div className="g-inner">
                <img src={card.img} alt={card.title} className="g-img" onError={e => { e.target.style.display = 'none' }} />
                <div className="g-overlay" />
                <div className="g-text">
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '6px', lineHeight: '1.2' }}>{card.title}</h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', marginBottom: '10px' }}>{card.tag}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 13px', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', color: 'var(--soft-leaf)', fontSize: '11px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {card.seed}
                  </span>
                  {/* Extra details revealed on hover */}
                  <div className="g-extra">
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '8px', lineHeight: '1.6' }}>{card.extra}</p>
                  </div>
                </div>
              </div>
              {card.badge && <div className="g-badge">{card.badge}</div>}
              <div className="g-price">{card.price}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '36px' }}>
          <span style={{ padding: '10px 22px', borderRadius: '50px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}>
            🌍 Every bouquet is 100% plantable — zero waste, zero guilt
          </span>
          <Link to="/gifting">
            <button style={{ padding: '12px 28px', borderRadius: '50px', border: 'none', background: 'var(--soft-leaf)', color: 'var(--text-hero)', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              Shop Bouquets →
            </button>
          </Link>
        </div>
      </div>

      {/* ── SECTION 6: FAQ ────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '80px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Got questions?</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: '700', color: 'var(--text-hero)', lineHeight: '1.1' }}>
              Frequently <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>asked questions</em>
            </h2>
          </div>

          {/* Accordion — clicking a question toggles its answer open/closed */}
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", textAlign: 'left', gap: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: openFaq === i ? 'var(--accent)' : 'var(--text-hero)', transition: 'color 0.2s ease', lineHeight: '1.4' }}>
                  {faq.q}
                </span>
                {/* + icon rotates to × when open */}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: openFaq === i ? 'var(--accent)' : 'var(--pill)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease' }}>
                  <span style={{ fontSize: '18px', fontWeight: '300', color: openFaq === i ? '#fff' : 'var(--text-muted)', lineHeight: 1, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'block', transition: 'transform 0.2s ease' }}>+</span>
                </div>
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: '22px', paddingRight: '52px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 7: CTA + FOOTER ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg, #1c1f14 0%, #242b18 40%, #1a1f11 100%)', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Decorative background blobs and rings — purely visual */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,176,105,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '150px', right: '-60px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,125,68,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '250px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(201,219,178,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40px', left: '7%', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(201,219,178,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20px', left: '5%', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(201,219,178,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '250px', right: '5%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(201,219,178,0.04)', pointerEvents: 'none' }} />

        {/* Final CTA */}
        <div style={{ padding: '52px 60px 40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 16px', borderRadius: '50px', background: 'rgba(201,219,178,0.08)', border: '1px solid rgba(201,219,178,0.15)', fontSize: '10px', fontWeight: '700', color: 'var(--soft-leaf)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
            🌿 Start for free
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: '700', color: '#fff', lineHeight: '1.1', maxWidth: '680px', margin: '0 auto 14px' }}>
            Your perfect plant is<br />
            <em style={{ fontStyle: 'italic', color: 'var(--soft-leaf)' }}>waiting to be found</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto 28px' }}>
            Answer a few questions about your space. Get your personalised plant plan in under 2 minutes.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link to="/recommend">
              <button
                style={{ padding: '14px 36px', borderRadius: '50px', border: 'none', background: '#fff', color: 'var(--text-hero)', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 32px rgba(0,0,0,0.3)', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'var(--soft-leaf)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}>
                Find My Plants →
              </button>
            </Link>
            <Link to="/gifting">
              <button
                style={{ padding: '14px 36px', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.65)', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.25s ease', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}>
                Explore Gifting
              </button>
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.18)', flexWrap: 'wrap' }}>
            {['Free to start', 'No credit card needed', 'Results in 2 minutes'].map((t, i, arr) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {t}
                {i < arr.length - 1 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)', margin: '0 60px', position: 'relative', zIndex: 1 }} />

        {/* Footer */}
        <footer style={{ padding: '36px 60px 24px', position: 'relative', zIndex: 1, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '28px' }}>

            {/* Brand column with social icons */}
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>
                Gree<span style={{ color: 'var(--soft-leaf)' }}>Looker</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', lineHeight: '1.8', marginBottom: '12px', maxWidth: '240px' }}>
                AI-powered plant recommendations for homes, offices and gifts across India.
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {['🌿 Beginner Friendly', '🚚 Ships Across India', '🌱 Safe Delivery'].map(b => (
                  <span key={b} style={{ fontSize: '10px', padding: '3px 9px', borderRadius: '50px', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.07)' }}>{b}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '7px' }}>
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Pages nav links */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.22)', marginBottom: '14px' }}>Pages</div>
              {[['Home', '/'], ['Recommend', '/recommend'], ['Gifting', '/gifting'], ['Commercials', '/commercials'], ['Accessories', '/accessories']].map(([n, p]) => (
                <Link key={n} to={p}
                  style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '8px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--soft-leaf)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}>
                  {n}
                </Link>
              ))}
            </div>

            {/* Account nav links */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.22)', marginBottom: '14px' }}>Account</div>
              {[['Login', '/login'], ['Register', '/register'], ['Dashboard', '/dashboard'], ['My Plants', '/myplants'], ['Settings', '/settings']].map(([n, p]) => (
                <Link key={n} to={p}
                  style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '8px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--soft-leaf)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}>
                  {n}
                </Link>
              ))}
            </div>

            {/* Support links */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.22)', marginBottom: '14px' }}>Support</div>
              {[['Contact Us', '#'], ['Track Order', '#'], ['Return Policy', '#'], ['Privacy Policy', '#'], ['Terms of Service', '#']].map(([n, p]) => (
                <a key={n} href={p}
                  style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '8px', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--soft-leaf)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}>
                  {n}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar — copyright and utility links */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)' }}>
              © {new Date().getFullYear()} GreeLooker. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms', 'Contact', 'About'].map(l => (
                <a key={l} href="#"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
                  {l}
                </a>
              ))}
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.14)' }}>
              Made with 🌿 in India
            </span>
          </div>
        </footer>
      </section>

    </div>
  )
}

export default Home