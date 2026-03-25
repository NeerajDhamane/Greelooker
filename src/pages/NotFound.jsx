import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px' }}>
      <div style={{ fontSize:'80px', marginBottom:'16px' }}>🌿</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'48px', color:'var(--text-hero)', marginBottom:'12px' }}>404</h1>
      <p style={{ fontSize:'18px', color:'var(--text-muted)', marginBottom:'8px', fontWeight:'500' }}>This page got lost in the jungle.</p>
      <p style={{ fontSize:'14px', color:'var(--text-muted)', marginBottom:'36px' }}>The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" style={{ padding:'14px 32px', borderRadius:'50px', background:'var(--text-hero)', color:'#fff', textDecoration:'none', fontSize:'15px', fontWeight:'600', fontFamily:"'DM Sans',sans-serif" }}>
        Back to Home →
      </Link>
    </div>
  )
}

export default NotFound