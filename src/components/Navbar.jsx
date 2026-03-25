import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const path = location.pathname
  const isActive = (p) => path === p

  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (path !== '/') return
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 10) setVisible(true)
      else if (current < lastScroll) setVisible(true)
      else setVisible(false)
      setLastScroll(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll, path])

  const SIDEBAR_PAGES = ['/dashboard', '/recommend', '/myplants', '/settings', '/accessories', '/gifting', '/commercials']
  if (SIDEBAR_PAGES.includes(path)) return null

  const NAV_LINKS = [
    { name: 'Home',        path: '/'            },
    { name: 'Recommend',   path: '/recommend'   },
    { name: 'Commercials', path: '/commercials' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Gifting',     path: '/gifting'     },
  ]

  // ── minimal floating for inner pages ──
  if (path !== '/') return (
    <div className="fixed top-0 left-0 z-50 p-5">
      <div className="flex items-center gap-1">
        <Link to="/" className="no-underline"
          style={{ fontFamily:"'Playfair Display', serif", fontWeight:'700', fontSize:'18px', color:'var(--text-hero)' }}>
          GreeLooker
        </Link>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center cursor-pointer"
            style={{ width:'24px', height:'24px', background:'none', border:'none', color:'var(--text-muted)', fontSize:'20px', display:'inline-block', transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition:'transform 0.2s ease' }}>
            ›
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-8 rounded-2xl overflow-hidden flex flex-col"
              style={{ background:'var(--surface)', border:'1.5px solid var(--border)', boxShadow:'0 8px 32px rgba(26,46,26,0.12)', minWidth:'180px' }}>
              {NAV_LINKS.map((link) => (
                <Link key={link.path} to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-3 text-sm font-medium no-underline"
                  style={{ color: isActive(link.path) ? 'var(--accent)' : 'var(--text-body)', background: isActive(link.path) ? 'var(--pill)' : 'transparent' }}>
                  {link.name}
                </Link>
              ))}
              <div style={{ height:'1px', background:'var(--border)' }} />
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="px-5 py-3 text-sm font-medium no-underline"
                style={{ color:'var(--text-body)' }}>
                Log in
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="px-5 py-3 text-sm font-semibold no-underline"
                style={{ color:'var(--accent)' }}>
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // ── sticky navbar — home only ──
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--surface)',
      borderBottom: '1.5px solid var(--border)',
      borderRadius: '0 0 16px 16px',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      boxShadow: '0 2px 12px rgba(26,46,26,0.06)',
      transform: visible ? 'translateY(0)' : 'translateY(-110%)',
      transition: 'transform 0.3s ease',
    }}>

      <Link to="/" className="no-underline flex-shrink-0"
        style={{ fontFamily:"'Playfair Display', serif", fontWeight:'700', fontSize:'18px', color:'var(--text-hero)' }}>
        GreeLooker
      </Link>

      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <Link key={link.path} to={link.path}
            className="no-underline px-4 py-2 text-sm"
            style={{ position:'relative', color: isActive(link.path) ? 'var(--accent)' : 'var(--text-muted)', fontWeight: isActive(link.path) ? '600' : '500', display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'2px', transition:'color 0.2s ease' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.querySelector('.underline-bar').style.width = '100%'
            }}
            onMouseLeave={e => {
              if (!isActive(link.path)) e.currentTarget.style.color = 'var(--text-muted)'
              if (!isActive(link.path)) e.currentTarget.querySelector('.underline-bar').style.width = '0%'
            }}>
            <span style={{ display:'inline-block', position:'relative' }}>
              {link.name}
              <span className="underline-bar" style={{ position:'absolute', bottom:'-2px', left:'0', width: isActive(link.path) ? '100%' : '0%', height:'2px', background:'var(--accent)', borderRadius:'2px', transition:'width 0.25s ease', display:'block' }} />
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {user ? (
          <>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'var(--accent)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'13px', flexShrink:0, border:'2px solid var(--border)' }}>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <Link to="/dashboard" className="no-underline">
              <button className="text-sm font-semibold px-5 py-2 rounded-full cursor-pointer"
                style={{ background:'var(--text-hero)', color:'var(--surface)', border:'none' }}>
                Dashboard ›
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="no-underline">
              <button className="text-sm font-medium px-4 py-2 rounded-full cursor-pointer"
                style={{ color:'var(--text-body)', border:'1.5px solid var(--border)', background:'transparent' }}>
                Log in
              </button>
            </Link>
            <Link to="/register" className="no-underline">
              <button className="text-sm font-semibold px-5 py-2 rounded-full cursor-pointer flex items-center gap-1"
                style={{ background:'var(--text-hero)', color:'var(--surface)', border:'none' }}>
                Get started <span style={{ fontSize:'16px' }}>›</span>
              </button>
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar