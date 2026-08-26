import { useState } from 'react'

// The single canonical product card — previously this file existed
// unused while Accessories.jsx defined its own near-identical
// "ProductCardImproved" inline (Bug #13: two maintained versions of the
// same card). This is now that consolidated, actually-used version.
const ProductCard = ({ product, onAddToCart, isMobile }) => {
  const [added, setAdded]       = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [hovered, setHovered]   = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice ? Math.round((1 - product.price/product.originalPrice)*100) : null

  return (
    <div style={{ background:'#fff', borderRadius:'4px', overflow:'hidden', cursor:'pointer', position:'relative', border:'1px solid #f0f0f0', transition:'box-shadow 0.2s', boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}>

      <div style={{ position:'relative', paddingTop:'120%', background:'#f8f8f8', overflow:'hidden' }}>
        <img src={product.img} alt={product.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => e.target.style.display='none'} />

        <button onClick={e => { e.stopPropagation(); setWishlist(!wishlist) }}
          style={{ position:'absolute', top:'8px', right:'8px', background:'#fff', border:'none', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.12)', fontSize:'16px', zIndex:2 }}>
          {wishlist ? '❤️' : '🤍'}
        </button>

        {product.badge && (
          <span style={{ position:'absolute', top:'8px', left:'8px', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background: product.badge==='Bestseller' ? '#ff6161' : 'var(--accent)', color:'#fff', letterSpacing:'0.04em', zIndex:2 }}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {discount && (
          <span style={{ position:'absolute', bottom:'8px', left:'8px', fontSize:'11px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background:'#14a800', color:'#fff', zIndex:2 }}>
            {discount}% OFF
          </span>
        )}

        {/* Desktop hover cart bar */}
        {!isMobile && (
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--text-hero)', padding:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.25s ease', zIndex:3 }}
            onClick={e => { e.stopPropagation(); handleAdd() }}>
            <span style={{ fontSize:'16px' }}>{added ? '✓' : '🛒'}</span>
            <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.05em' }}>{added ? 'ADDED!' : 'ADD TO CART'}</span>
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? '8px 10px 12px' : '12px 12px 14px' }}>
        <div style={{ fontSize:'10px', color:'#888', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:'3px' }}>{product.category}</div>
        <div style={{ fontSize: isMobile ? '13px' : '14px', fontWeight:'600', color:'#222', lineHeight:'1.4', marginBottom:'4px' }}>{product.name}</div>
        {!isMobile && (
          <div style={{ fontSize:'12px', color:'#888', lineHeight:'1.5', marginBottom:'8px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</div>
        )}
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'6px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'3px', background:'var(--accent)', color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 6px', borderRadius:'2px' }}>
            {product.rating} ★
          </div>
          <span style={{ fontSize:'10px', color:'#888' }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'4px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', flexWrap:'wrap' }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight:'700', color:'#222' }}>₹{product.price}</span>
            {product.originalPrice && <span style={{ fontSize:'11px', color:'#aaa', textDecoration:'line-through' }}>₹{product.originalPrice}</span>}
          </div>
          {/* Mobile add to cart button — always visible */}
          {isMobile && (
            <button onClick={e => { e.stopPropagation(); handleAdd() }}
              style={{ padding:'7px 14px', borderRadius:'4px', border:`1px solid ${added ? 'var(--accent)' : '#e0e0e0'}`, background: added ? 'var(--accent)' : '#fff', color: added ? '#fff' : '#333', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s', flexShrink:0 }}>
              {added ? '✓ Added' : '+ Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
