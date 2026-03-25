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
    <div style={{
      width:'240px', flexShrink:0,
      background:'var(--surface)',
      borderRight:'1.5px solid var(--border)',
      padding:'28px 16px',
      display:'flex', flexDirection:'column', gap:'4px',
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
  )
}

export default Sidebar