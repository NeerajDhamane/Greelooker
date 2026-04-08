import { Link } from 'react-router-dom'

const NotFound = () => (
  <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'24px' }}>
    <div style={{ fontSize:'64px', marginBottom:'16px' }}>🌿</div>
    <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,6vw,64px)', fontWeight:'700', color:'var(--text-hero)', lineHeight:'1.1', marginBottom:'12px' }}>
      404
    </h1>
    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(18px,3vw,28px)', fontWeight:'700', color:'var(--text-hero)', marginBottom:'12px' }}>
      This page got lost in the garden
    </h2>
    <p style={{ fontSize:'clamp(13px,2vw,15px)', color:'var(--text-muted)', lineHeight:'1.7', maxWidth:'400px', marginBottom:'32px' }}>
      Looks like this page doesn't exist. It may have been moved, deleted, or maybe it never grew in the first place.
    </p>
    <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
      <Link to="/">
        <button style={{ padding:'13px 32px', borderRadius:'50px', border:'none', background:'var(--text-hero)', color:'#fff', fontSize:'14px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          ← Back to Home
        </button>
      </Link>
      <Link to="/recommend">
        <button style={{ padding:'13px 32px', borderRadius:'50px', border:'1.5px solid var(--border)', background:'transparent', color:'var(--text-body)', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          Find My Plants
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound