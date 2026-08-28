import { useState } from 'react'
import { Heart, ShoppingCart, Check, Star } from 'lucide-react'

// The single canonical product card, themed with the app's real design
// tokens (warm cream / sage palette, rounded pills) and real icons
// instead of emoji. Supports both grid and list layouts via `view`.
const ProductCard = ({ product, onAddToCart, isMobile, view = 'grid' }) => {
  const [added, setAdded]       = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [hovered, setHovered]   = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice ? Math.round((1 - product.price/product.originalPrice)*100) : null

  // ── LIST VIEW: compact horizontal row, so more than one product fits
  // on screen at once — the old list mode just switched to 1 column and
  // kept the tall square image, making a single card taller than the
  // viewport.
  if (view === 'list') {
    return (
      <div style={{ display:'flex', gap: isMobile ? '12px' : '20px', background:'var(--surface)', borderRadius:'16px', overflow:'hidden', border:'1.5px solid var(--border)', padding: isMobile ? '10px' : '14px', cursor:'pointer', transition:'box-shadow 0.2s' }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}>

        <div style={{ position:'relative', width: isMobile ? '84px' : '120px', height: isMobile ? '84px' : '120px', flexShrink:0, borderRadius:'12px', overflow:'hidden', background:'var(--pill)' }}>
          <img src={product.img} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.style.display='none'} />
          {product.badge && (
            <span style={{ position:'absolute', top:'6px', left:'6px', fontSize:'9px', fontWeight:'700', padding:'2px 7px', borderRadius:'50px', background: product.badge==='Bestseller' ? '#ff6161' : 'var(--accent)', color:'#fff', letterSpacing:'0.03em' }}>
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>

        <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', justifyContent:'center', gap:'4px' }}>
          <div style={{ fontSize:'10px', color:'var(--text-muted)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.04em' }}>{product.category}</div>
          <div style={{ fontSize: isMobile ? '13px' : '15px', fontWeight:'700', color:'var(--text-hero)' }}>{product.name}</div>
          {!isMobile && (
            <div style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.5', display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</div>
          )}
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'3px', background:'var(--pill)', color:'var(--accent)', fontSize:'10px', fontWeight:'700', padding:'2px 7px', borderRadius:'50px' }}>
              <Star size={10} fill="currentColor" /> {product.rating}
            </div>
            <span style={{ fontSize:'10px', color:'var(--text-muted)' }}>({product.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center', gap:'8px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight:'700', color:'var(--text-hero)' }}>₹{product.price}</span>
            {product.originalPrice && <span style={{ fontSize:'11px', color:'var(--text-muted)', textDecoration:'line-through' }}>₹{product.originalPrice}</span>}
          </div>
          <button onClick={e => { e.stopPropagation(); handleAdd() }}
            style={{ display:'flex', alignItems:'center', gap:'6px', padding: isMobile ? '7px 12px' : '8px 16px', borderRadius:'50px', border:'none', background: added ? 'var(--accent)' : 'var(--text-hero)', color:'#fff', fontSize:'12px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background 0.2s', whiteSpace:'nowrap' }}>
            {added ? <Check size={14} /> : <ShoppingCart size={14} />}
            {!isMobile && (added ? 'Added' : 'Add')}
          </button>
        </div>
      </div>
    )
  }

  // ── GRID VIEW ──
  return (
    <div style={{ background:'var(--surface)', borderRadius:'20px', overflow:'hidden', cursor:'pointer', position:'relative', border:'1.5px solid var(--border)', transition:'box-shadow 0.2s', boxShadow: hovered ? '0 8px 24px rgba(26,46,26,0.1)' : 'none' }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}>

      <div style={{ position:'relative', paddingTop:'120%', background:'var(--pill)', overflow:'hidden' }}>
        <img src={product.img} alt={product.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => e.target.style.display='none'} />

        <button onClick={e => { e.stopPropagation(); setWishlist(!wishlist) }}
          style={{ position:'absolute', top:'8px', right:'8px', background:'var(--surface)', border:'none', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(26,46,26,0.12)', zIndex:2, color: wishlist ? '#e11d48' : 'var(--text-muted)' }}>
          <Heart size={16} fill={wishlist ? 'currentColor' : 'none'} />
        </button>

        {product.badge && (
          <span style={{ position:'absolute', top:'8px', left:'8px', fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', background: product.badge==='Bestseller' ? '#ff6161' : 'var(--accent)', color:'#fff', letterSpacing:'0.04em', zIndex:2 }}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {discount && (
          <span style={{ position:'absolute', bottom:'8px', left:'8px', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'50px', background:'#14a800', color:'#fff', zIndex:2 }}>
            {discount}% OFF
          </span>
        )}

        {/* Desktop hover cart bar */}
        {!isMobile && (
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--text-hero)', padding:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.25s ease', zIndex:3 }}
            onClick={e => { e.stopPropagation(); handleAdd() }}>
            {added ? <Check size={16} color="#fff" /> : <ShoppingCart size={16} color="#fff" />}
            <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.05em' }}>{added ? 'ADDED!' : 'ADD TO CART'}</span>
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? '10px 12px 14px' : '14px 14px 16px' }}>
        <div style={{ fontSize:'10px', color:'var(--text-muted)', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:'3px' }}>{product.category}</div>
        <div style={{ fontSize: isMobile ? '13px' : '14px', fontWeight:'700', color:'var(--text-hero)', lineHeight:'1.4', marginBottom:'4px' }}>{product.name}</div>
        {!isMobile && (
          <div style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.5', marginBottom:'8px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</div>
        )}
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'3px', background:'var(--pill)', color:'var(--accent)', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'50px' }}>
            <Star size={10} fill="currentColor" /> {product.rating}
          </div>
          <span style={{ fontSize:'10px', color:'var(--text-muted)' }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'4px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', flexWrap:'wrap' }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight:'700', color:'var(--text-hero)' }}>₹{product.price}</span>
            {product.originalPrice && <span style={{ fontSize:'11px', color:'var(--text-muted)', textDecoration:'line-through' }}>₹{product.originalPrice}</span>}
          </div>
          {/* Mobile add to cart button — always visible */}
          {isMobile && (
            <button onClick={e => { e.stopPropagation(); handleAdd() }}
              style={{ display:'flex', alignItems:'center', gap:'4px', padding:'7px 14px', borderRadius:'50px', border:'none', background: added ? 'var(--accent)' : 'var(--text-hero)', color:'#fff', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s', flexShrink:0 }}>
              {added ? <Check size={13} /> : <ShoppingCart size={13} />}
              {added ? 'Added' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
