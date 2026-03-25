import { useState } from 'react'

const ProductCard = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div
      style={{
        background: '#FFFDF1',
        border: `1.5px solid ${hovered ? 'var(--soft-leaf)' : 'var(--border)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s ease',
        boxShadow: hovered
          ? '0 12px 32px rgba(58,125,68,0.12)'
          : '0 2px 8px rgba(26,46,26,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{ position: 'relative', height: '200px', background: '#f0f4e8', overflow: 'hidden' }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          onError={e => e.target.style.display = 'none'}
        />

        {/* Wishlist button */}
        <button
          onClick={e => { e.stopPropagation(); setWishlist(!wishlist) }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'rgba(255,255,255,0.92)',
            border: 'none', borderRadius: '50%',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '15px',
            transition: 'transform 0.2s ease',
            transform: wishlist ? 'scale(1.2)' : 'scale(1)',
          }}>
          {wishlist ? '❤️' : '🤍'}
        </button>

        {/* Category pill */}
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          fontSize: '10px', fontWeight: '700',
          padding: '3px 10px', borderRadius: '50px',
          background: 'rgba(255,255,255,0.92)',
          color: 'var(--accent)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {product.category}
        </span>

        {/* Discount badge */}
        {discount && (
          <span style={{
            position: 'absolute', bottom: '10px', left: '10px',
            fontSize: '11px', fontWeight: '700',
            padding: '3px 10px', borderRadius: '50px',
            background: 'var(--accent)', color: '#fff',
          }}>
            {discount}% off
          </span>
        )}

        {/* Badge */}
        {product.badge && (
          <span style={{
            position: 'absolute', bottom: '10px', right: '10px',
            fontSize: '10px', fontWeight: '700',
            padding: '3px 10px', borderRadius: '50px',
            background: product.badge === 'Bestseller' ? '#fef3c7' : '#dcfce7',
            color: product.badge === 'Bestseller' ? '#92400e' : '#166534',
          }}>
            {product.badge}
          </span>
        )}

        {/* Hover add to cart */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--text-hero)',
          padding: '11px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.25s ease',
          cursor: 'pointer',
        }}
          onClick={e => { e.stopPropagation(); handleAdd() }}>
          <span style={{ fontSize: '14px' }}>{added ? '✓' : '🛒'}</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff', letterSpacing: '0.04em' }}>
            {added ? 'ADDED!' : 'ADD TO CART'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>

        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-hero)', lineHeight: '1.35' }}>
            {product.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </div>
        </div>

        {/* Includes tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {product.includes.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: '10px', fontWeight: '500',
              padding: '2px 8px', borderRadius: '50px',
              background: 'var(--pill)', color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>
              {tag}
            </span>
          ))}
          {product.includes.length > 3 && (
            <span style={{ fontSize: '10px', fontWeight: '500', padding: '2px 8px', borderRadius: '50px', background: 'var(--pill)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              +{product.includes.length - 3} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            background: 'var(--accent)', color: '#fff',
            fontSize: '11px', fontWeight: '700',
            padding: '2px 8px', borderRadius: '4px',
          }}>
            {product.rating} ★
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price + Cart */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: '10px',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-hero)', lineHeight: 1 }}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through', marginTop: '2px' }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: '8px 18px', borderRadius: '50px', border: 'none',
              background: added ? 'var(--accent)' : 'var(--text-hero)',
              color: '#fff', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
              transition: 'all 0.2s ease',
              transform: added ? 'scale(0.96)' : 'scale(1)',
            }}>
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard