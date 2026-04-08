import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { icon:'🏠', label:'Dashboard',   path:'/dashboard'   },
  { icon:'🌿', label:'My Plants',   path:'/myplants'    },
  { icon:'✨', label:'Recommend',   path:'/recommend'   },
  { icon:'💐', label:'Gifting',     path:'/gifting'     },
  { icon:'🏢', label:'Commercials', path:'/commercials' },
  { icon:'🛍️', label:'Accessories', path:'/accessories' },
  { icon:'⚙️', label:'Settings',    path:'/settings'    },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden md:flex flex-col"
        style={{
          width:'240px', flexShrink:0,
          background:'var(--surface)',
          borderRight:'1.5px solid var(--border)',
          padding:'28px 16px',
          gap:'4px',
          height:'100vh',
        }}>

        <Link to="/" style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:'20px', fontWeight:'700',
          color:'var(--text-hero)', textDecoration:'none',
          paddingBottom:'20px', paddingLeft:'12px',
          marginBottom:'8px',
          borderBottom:'1.5px solid var(--border)',
          display:'block',
        }}>
          GreeLooker
        </Link>

        {NAV_ITEMS.map(item => (
          <Link key={item.label} to={item.path}
            style={{
              display:'flex', alignItems:'center', gap:'12px',
              padding:'8px 12px', borderRadius:'12px',
              textDecoration:'none', fontSize:'14px',
              background: location.pathname === item.path ? 'var(--pill)'   : 'transparent',
              color:      location.pathname === item.path ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: location.pathname === item.path ? '600'           : '500',
              transition: 'all 0.15s ease',
            }}>
            {item.icon} {item.label}
          </Link>
        ))}

        <div style={{
          marginTop:'auto', paddingTop:'16px',
          borderTop:'1.5px solid var(--border)',
          display:'flex', alignItems:'center',
          gap:'12px', paddingLeft:'12px',
        }}>
          <div style={{
            width:'32px', height:'32px', borderRadius:'50%',
            background:'var(--accent)', color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:'700', fontSize:'14px', flexShrink:0,
          }}>A</div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text-body)' }}>Rohit</div>
            <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>Free plan</div>
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background:'var(--surface)',
          borderTop:'1.5px solid var(--border)',
          padding:'8px 0',
          boxShadow:'0 -4px 16px rgba(26,46,26,0.08)',
        }}>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <Link key={item.label} to={item.path}
            style={{
              flex:1,
              display:'flex', flexDirection:'column',
              alignItems:'center', gap:'3px',
              textDecoration:'none',
              padding:'4px 0',
              color: location.pathname === item.path ? 'var(--accent)' : 'var(--text-muted)',
            }}>
            <span style={{ fontSize:'20px' }}>{item.icon}</span>
            <span style={{ fontSize:'9px', fontWeight: location.pathname === item.path ? '700' : '500' }}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Sidebar