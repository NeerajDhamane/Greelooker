import { useAuth } from '../context/AuthContext'

// Single source of truth for "how do we show the logged-in user" — avatar
// initial + name + plan. Previously Sidebar.jsx hardcoded "Rohit" and
// Navbar's mobile menu ignored login state entirely, because each was
// hand-rolled independently instead of both reading from useAuth(). Any
// future place that needs to show identity should use this component
// rather than rolling its own again.
const UserBadge = ({ withLogout = false }) => {
  const { user, logout } = useAuth()

  if (!user) return null

  const initial = user.name?.charAt(0).toUpperCase() || 'U'

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
      <div style={{
        width:'32px', height:'32px', borderRadius:'50%',
        background:'var(--accent)', color:'#fff',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontWeight:'700', fontSize:'14px', flexShrink:0,
      }}>
        {initial}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text-body)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {user.name}
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>Free plan</div>
      </div>
      {withLogout && (
        <button onClick={logout} title="Log out" style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:'16px', color:'var(--text-muted)', flexShrink:0,
          padding:'4px',
        }}>
          ⏻
        </button>
      )}
    </div>
  )
}

export default UserBadge
