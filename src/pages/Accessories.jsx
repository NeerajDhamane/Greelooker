import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

// ── DATA ─────────────────────────────────────────────────────────────────────

// All shop products — each maps to a ProductCardImproved card
const PRODUCTS = [
  { id:1,  category:'Plants',                  badge:'New',        name:'Monstera Deliciosa',        description:'Iconic split-leaf plant. Medium indirect light. Ships in 5" nursery pot.',            includes:['1 healthy plant','Nursery pot','Care card'],    rating:5, reviews:319, price:499, originalPrice:699,  img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id:2,  category:'Plants',                  badge:'Bestseller', name:'Snake Plant',               description:'Near-indestructible. Low light, low water. Best air purifier for bedrooms.',           includes:['1 healthy plant','4" pot','Care card'],         rating:5, reviews:445, price:299, originalPrice:null, img:'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80' },
  { id:3,  category:'Plants',                  badge:null,         name:'Pothos Golden',             description:'Trailing vines with golden variegation. Thrives in almost any light condition.',       includes:['1 plant','Hanging pot','Care card'],            rating:4, reviews:267, price:199, originalPrice:null, img:'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80' },
  { id:4,  category:'Pots & Planters',         badge:'Bestseller', name:'Terracotta Pot Set',        description:'Set of 3 classic terracotta pots. Breathable clay promotes healthy root growth.',       includes:['3 pots','Drainage holes','Saucers included'],   rating:4, reviews:128, price:349, originalPrice:499,  img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id:5,  category:'Pots & Planters',         badge:null,         name:'Ceramic White Planter',     description:'Minimalist matte white ceramic. Perfect for modern homes and desk setups.',             includes:['1 planter','Drainage hole'],                    rating:5, reviews:84,  price:599, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:6,  category:'Pots & Planters',         badge:'New',        name:'Hanging Macramé Planter',   description:'Handwoven cotton macramé. Great for trailing plants like Pothos.',                      includes:['1 hanger','Adjustable knot','Fits 4" pots'],    rating:4, reviews:56,  price:249, originalPrice:null, img:'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80' },
  { id:7,  category:'Soil & Fertilisers',      badge:'Bestseller', name:'Premium Potting Mix',       description:'Ready-to-use mix with cocopeat, perlite and compost. Perfect drainage for all plants.', includes:['5kg bag','Cocopeat','Perlite','Compost'],       rating:5, reviews:203, price:299, originalPrice:399,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:8,  category:'Soil & Fertilisers',      badge:null,         name:'Liquid Seaweed Fertiliser', description:'Organic seaweed extract. Boosts growth, roots and immunity.',                          includes:['250ml bottle','NPK balanced','Organic'],        rating:4, reviews:91,  price:199, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:9,  category:'Soil & Fertilisers',      badge:null,         name:'Cactus & Succulent Mix',    description:'Fast-draining gritty mix for cacti, succulents and aloe.',                             includes:['2kg bag','Sand mix','Perlite heavy'],           rating:4, reviews:67,  price:179, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:10, category:'Tools',                   badge:null,         name:'Pruning Shears',            description:'Stainless steel bypass pruners with comfort grip. Clean cuts for healthy plants.',       includes:['1 pair','Safety lock','Stainless steel'],       rating:5, reviews:142, price:449, originalPrice:599,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:11, category:'Tools',                   badge:'Bestseller', name:'5-Piece Garden Tool Kit',   description:'Complete kit — trowel, fork, transplanter, weeder and pruner in a carry pouch.',        includes:['5 tools','Carry pouch','Stainless steel'],      rating:4, reviews:178, price:699, originalPrice:899,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:12, category:'Tools',                   badge:null,         name:'Soil Moisture Meter',       description:'No batteries needed. Instantly checks soil moisture to prevent over/under watering.',   includes:['1 meter','No batteries','3-in-1'],              rating:4, reviews:89,  price:299, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:13, category:'Watering Cans & Misters', badge:null,         name:'Long Spout Watering Can',   description:'1.5L with long narrow spout for precise watering. Perfect for indoor plants.',          includes:['1.5L can','Long spout','Ergonomic handle'],     rating:4, reviews:63,  price:349, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:14, category:'Watering Cans & Misters', badge:'Bestseller', name:'Fine Mist Spray Bottle',    description:'360° nozzle adjustable from mist to stream. Ideal for humidity-loving tropicals.',       includes:['500ml','Adjustable nozzle','360° spray'],       rating:5, reviews:211, price:149, originalPrice:null, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
]

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// Top navigation bar with category dropdowns, search, profile and cart
const ShopNav = ({ cartCount, onCartOpen }) => {
  // Tracks which dropdown menu is currently open (null = none)
  const [openMenu, setOpenMenu] = useState(null)

  // null = no dropdown; array = dropdown items to show on hover
  const menus = {
    'Plants':               ['Indoor Plants','Air Purifying Plants','Aromatic Plants','Low Maintenance','Flowering Plants','Hanging Plants','Aquatic Plants','Lucky Plants','Rare & Exotic'],
    'Seeds':                ['Vegetable Seeds','Flower Seeds','Herb Seeds','Microgreen Seeds','Fruit Seeds'],
    'Sustainable':          ['Eco Pots','Biodegradable Bags','Organic Fertilisers'],
    'Gardening Kits':       null,
    'Gardening Essentials': null,
    'Accessories':          null,
    'Bulbs':                null,
  }

  return (
    <div style={{ background:'#fff', borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'20px', padding:'0 32px', height:'60px', maxWidth:'1440px', margin:'0 auto' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--text-hero)' }}>
            Gree<span style={{ color:'var(--accent)' }}>Looker</span>
          </span>
        </Link>

        {/* Category nav — shows dropdown on hover if menu has items */}
        <div style={{ display:'flex', alignItems:'center', gap:'0px', flex:1, justifyContent:'center' }}>
          {Object.keys(menus).map(name => (
            <div key={name} style={{ position:'relative' }}
              onMouseEnter={() => menus[name] && setOpenMenu(name)}
              onMouseLeave={() => setOpenMenu(null)}>
              <button style={{ display:'flex', alignItems:'center', gap:'3px', padding:'8px 14px', border:'none', background:'transparent', color: openMenu === name ? 'var(--accent)' : '#333', fontWeight: openMenu === name ? '700' : '500', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap', borderBottom: openMenu === name ? '2px solid var(--accent)' : '2px solid transparent', transition:'all 0.15s' }}>
                {name}{menus[name] && <span style={{ fontSize:'8px' }}>▾</span>}
              </button>
              {openMenu === name && menus[name] && (
                <div style={{ position:'absolute', top:'100%', left:0, background:'#fff', border:'1px solid #f0f0f0', borderRadius:'8px', padding:'8px 0', minWidth:'220px', zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.12)' }}>
                  {menus[name].map(item => (
                    <div key={item} style={{ padding:'9px 20px', fontSize:'13px', color:'#444', cursor:'pointer', transition:'background 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background='#f8f8f8'; e.currentTarget.style.color='var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#444' }}>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side — search, profile icon, cart icon */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'13px', color:'#888' }}>🔍</span>
            <input type="text" placeholder="Search plants, pots, tools..."
              style={{ padding:'9px 16px 9px 34px', borderRadius:'4px', border:'1px solid #e8e8e8', background:'#fafafa', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", color:'#333', outline:'none', width:'220px', transition:'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = '#e8e8e8'} />
          </div>
          <Link to="/login" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', textDecoration:'none', padding:'4px 10px', color:'#333' }}>
            <span style={{ fontSize:'18px' }}>👤</span>
            <span style={{ fontSize:'10px', fontWeight:'600' }}>Profile</span>
          </Link>
          {/* Cart button shows item count badge when cart is not empty */}
          <button onClick={onCartOpen} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', background:'none', border:'none', cursor:'pointer', padding:'4px 10px', color:'#333', position:'relative' }}>
            <span style={{ fontSize:'18px' }}>🛒</span>
            <span style={{ fontSize:'10px', fontWeight:'600' }}>Cart</span>
            {cartCount > 0 && <span style={{ position:'absolute', top:'0', right:'4px', background:'var(--accent)', color:'#fff', fontSize:'9px', fontWeight:'700', padding:'1px 5px', borderRadius:'50px', minWidth:'16px', textAlign:'center' }}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

// Left sidebar with collapsible filter sections (category, price, light, etc.)
const FilterSidebar = ({ filters, setFilters }) => {
  // Tracks which accordion sections are open
  const [open, setOpen] = useState({ category:true, price:false, availability:false, season:false, growth:false, light:false })
  const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }))

  // True if any filter is currently active — used to show "Clear All" button
  const hasFilters = Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : !!v)

  // Reusable collapsible section wrapper
  const Section = ({ id, label, children }) => (
    <div style={{ borderBottom:'1px solid #f0f0f0' }}>
      <button onClick={() => toggle(id)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', padding:'14px 0', fontFamily:"'DM Sans',sans-serif" }}>
        <span style={{ fontSize:'13px', fontWeight:'700', color:'#222', textTransform:'uppercase', letterSpacing:'0.04em' }}>{label}</span>
        <span style={{ fontSize:'16px', color:'#888', lineHeight:1 }}>{open[id] ? '−' : '+'}</span>
      </button>
      {open[id] && <div style={{ paddingBottom:'12px' }}>{children}</div>}
    </div>
  )

  // Reusable custom-styled checkbox that updates the filters state
  const Checkbox = ({ label, count, filterKey, value }) => {
    const checked = filters[filterKey]?.includes(value) || false
    return (
      <label style={{ display:'flex', alignItems:'center', gap:'10px', padding:'5px 0', cursor:'pointer' }}>
        <div style={{ width:'16px', height:'16px', borderRadius:'3px', border:`2px solid ${checked ? 'var(--accent)' : '#ddd'}`, background: checked ? 'var(--accent)' : '#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
          {checked && <span style={{ color:'#fff', fontSize:'10px', fontWeight:'700' }}>✓</span>}
        </div>
        {/* Hidden native checkbox — visual is handled by the div above */}
        <input type="checkbox" checked={checked} style={{ display:'none' }}
          onChange={e => {
            setFilters(prev => {
              const current = prev[filterKey] || []
              return { ...prev, [filterKey]: e.target.checked ? [...current, value] : current.filter(v => v !== value) }
            })
          }} />
        <span style={{ fontSize:'13px', color:'#444', flex:1 }}>{label}</span>
        {count && <span style={{ fontSize:'11px', color:'#aaa' }}>{count}</span>}
      </label>
    )
  }

  return (
    <div style={{ width:'240px', flexShrink:0, padding:'20px 24px', borderRight:'1px solid #f0f0f0', background:'#fff', overflowY:'auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
        <span style={{ fontSize:'15px', fontWeight:'700', color:'#222' }}>FILTERS</span>
        {hasFilters && <button onClick={() => setFilters({})} style={{ fontSize:'12px', fontWeight:'600', color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", padding:0, textDecoration:'underline' }}>CLEAR ALL</button>}
      </div>

      <Section id="category" label="Category">
        {[['Plants','Plants',8],['Pots & Planters','Pots & Planters',4],['Soil & Fertilisers','Soil & Fertilisers',3],['Tools','Tools',3],['Watering Cans & Misters','Watering Cans & Misters',2]].map(([label,value,count]) => (
          <Checkbox key={value} label={label} count={count} filterKey="category" value={value} />
        ))}
      </Section>

      <Section id="price" label="Price">
        {/* Manual min/max inputs */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'10px' }}>
          <input type="number" placeholder="Min" value={filters.priceMin||''} onChange={e => setFilters(p => ({...p, priceMin:e.target.value}))}
            style={{ width:'80px', padding:'8px 10px', border:'1px solid #e0e0e0', borderRadius:'4px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", outline:'none' }} />
          <span style={{ color:'#aaa', alignSelf:'center' }}>to</span>
          <input type="number" placeholder="Max" value={filters.priceMax||''} onChange={e => setFilters(p => ({...p, priceMax:e.target.value}))}
            style={{ width:'80px', padding:'8px 10px', border:'1px solid #e0e0e0', borderRadius:'4px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", outline:'none' }} />
        </div>
        {/* Quick preset price range pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
          {[['Under ₹299',0,299],['₹300–599',300,599],['₹600+',600,99999]].map(([label,min,max]) => (
            <button key={label} onClick={() => setFilters(p => ({...p, priceMin:min, priceMax:max}))}
              style={{ padding:'5px 12px', borderRadius:'50px', border:`1px solid ${filters.priceMin===min?'var(--accent)':'#e0e0e0'}`, background: filters.priceMin===min ? '#fff8f0' : '#fff', color: filters.priceMin===min ? 'var(--accent)' : '#666', fontSize:'11px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section id="availability" label="Availability">
        <Checkbox label="In Stock" count={12} filterKey="availability" value="instock" />
        <Checkbox label="Out of Stock" count={2} filterKey="availability" value="outofstock" />
      </Section>

      <Section id="light" label="Light Requirement">
        <Checkbox label="Low Light" count={4} filterKey="light" value="low" />
        <Checkbox label="Medium Indirect" count={5} filterKey="light" value="medium" />
        <Checkbox label="Bright Indirect" count={3} filterKey="light" value="bright" />
        <Checkbox label="Direct Sunlight" count={2} filterKey="light" value="direct" />
      </Section>

      <Section id="season" label="Growing Season">
        <Checkbox label="All Seasons" count={10} filterKey="season" value="all" />
        <Checkbox label="Monsoon" count={3} filterKey="season" value="monsoon" />
        <Checkbox label="Spring" count={4} filterKey="season" value="spring" />
        <Checkbox label="Summer" count={5} filterKey="season" value="summer" />
      </Section>

      <Section id="growth" label="Growth Pattern">
        <Checkbox label="Trailing / Vining" count={4} filterKey="growth" value="trailing" />
        <Checkbox label="Upright" count={6} filterKey="growth" value="upright" />
        <Checkbox label="Bushy / Spreading" count={4} filterKey="growth" value="bushy" />
      </Section>
    </div>
  )
}

// Slide-in cart panel from the right — shows items, quantity controls and total
const CartDrawer = ({ cart, onClose, onRemove, onChangeQty }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      {/* Dark backdrop — clicking it closes the drawer */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:99 }} />

      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:'400px', background:'#fff', zIndex:100, display:'flex', flexDirection:'column', boxShadow:'-4px 0 24px rgba(0,0,0,0.15)' }}>

        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', color:'#222', fontWeight:'700', margin:0 }}>My Cart</h2>
            <p style={{ fontSize:'12px', color:'#888', marginTop:'4px' }}>{cart.length} item{cart.length!==1?'s':''}</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'1px solid #e0e0e0', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', color:'#666', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        </div>

        {/* Cart items or empty state */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 24px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🛒</div>
              <p style={{ fontSize:'15px', fontWeight:'600', color:'#333' }}>Your cart is empty!</p>
              <p style={{ fontSize:'13px', color:'#888', marginTop:'6px' }}>Add some plants to get started</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display:'flex', gap:'14px', padding:'16px 0', borderBottom:'1px solid #f8f8f8', alignItems:'flex-start' }}>
              <div style={{ width:'80px', height:'80px', borderRadius:'8px', overflow:'hidden', background:'#f8f8f8', flexShrink:0 }}>
                <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.style.display='none'} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'13px', fontWeight:'600', color:'#222', lineHeight:'1.4' }}>{item.name}</div>
                <div style={{ fontSize:'13px', color:'#888', marginTop:'2px' }}>₹{item.price}</div>
                {/* Quantity stepper + remove button */}
                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', border:'1px solid #e0e0e0', borderRadius:'4px', overflow:'hidden' }}>
                    <button onClick={() => onChangeQty(item.id,-1)} style={{ width:'28px', height:'28px', background:'#f8f8f8', border:'none', cursor:'pointer', fontSize:'16px', color:'#333', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <span style={{ width:'32px', textAlign:'center', fontSize:'13px', fontWeight:'600', color:'#333' }}>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id,1)} style={{ width:'28px', height:'28px', background:'#f8f8f8', border:'none', cursor:'pointer', fontSize:'16px', color:'#333', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ fontSize:'12px', color:'#dc2626', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontWeight:'600', textDecoration:'underline' }}>Remove</button>
                </div>
              </div>
              <span style={{ fontSize:'14px', fontWeight:'700', color:'#222', flexShrink:0 }}>₹{item.price*item.qty}</span>
            </div>
          ))}
        </div>

        {/* Sticky footer with totals and place order button */}
        {cart.length > 0 && (
          <div style={{ padding:'20px 24px', borderTop:'1px solid #f0f0f0' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
              <span style={{ fontSize:'13px', color:'#888' }}>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span>
              <span style={{ fontSize:'13px', color:'#888' }}>₹{total}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
              <span style={{ fontSize:'15px', fontWeight:'700', color:'#222' }}>Total Amount</span>
              <span style={{ fontSize:'15px', fontWeight:'700', color:'var(--accent)' }}>₹{total}</span>
            </div>
            <div style={{ fontSize:'11px', color:'var(--accent)', textAlign:'center', marginBottom:'12px', fontWeight:'600' }}>🚚 FREE delivery on orders above ₹499</div>
            <button style={{ width:'100%', padding:'14px', borderRadius:'4px', border:'none', background:'var(--accent)', color:'#fff', fontSize:'14px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.05em' }}>
              PLACE ORDER →
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Individual product card — shows image, wishlist, badge, hover add-to-cart and price
const ProductCardImproved = ({ product, onAddToCart }) => {
  const [added, setAdded]       = useState(false)   // briefly true after clicking "Add to Cart"
  const [wishlist, setWishlist] = useState(false)   // toggles heart icon
  const [hovered, setHovered]   = useState(false)   // shows hover overlay

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // Calculate discount % from original price (null if no original price)
  const discount = product.originalPrice ? Math.round((1 - product.price/product.originalPrice)*100) : null

  return (
    <div style={{ background:'#fff', borderRadius:'4px', overflow:'hidden', cursor:'pointer', position:'relative', border:'1px solid #f0f0f0', transition:'box-shadow 0.2s', boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Product image with zoom on hover */}
      <div style={{ position:'relative', paddingTop:'120%', background:'#f8f8f8', overflow:'hidden' }}>
        <img src={product.img} alt={product.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => e.target.style.display='none'} />

        {/* Wishlist toggle — stops click from bubbling to card */}
        <button onClick={e => { e.stopPropagation(); setWishlist(!wishlist) }}
          style={{ position:'absolute', top:'10px', right:'10px', background:'#fff', border:'none', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.12)', fontSize:'16px', zIndex:2 }}>
          {wishlist ? '❤️' : '🤍'}
        </button>

        {/* Badge (Bestseller / New) */}
        {product.badge && (
          <span style={{ position:'absolute', top:'10px', left:'10px', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background: product.badge==='Bestseller' ? '#ff6161' : product.badge==='New' ? 'var(--accent)' : '#ff6161', color:'#fff', letterSpacing:'0.04em', zIndex:2 }}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Discount % badge (bottom-left) */}
        {discount && (
          <span style={{ position:'absolute', bottom:'10px', left:'10px', fontSize:'11px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background:'#14a800', color:'#fff', zIndex:2 }}>
            {discount}% OFF
          </span>
        )}

        {/* "Add to Cart" bar slides up from bottom on hover */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--text-hero)', padding:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.25s ease', zIndex:3 }}
          onClick={e => { e.stopPropagation(); handleAdd() }}>
          <span style={{ fontSize:'16px' }}>{added ? '✓' : '🛒'}</span>
          <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.05em' }}>{added ? 'ADDED!' : 'ADD TO CART'}</span>
        </div>
      </div>

      {/* Product info */}
      <div style={{ padding:'12px 12px 14px' }}>
        <div style={{ fontSize:'11px', color:'#888', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:'4px' }}>{product.category}</div>
        <div style={{ fontSize:'14px', fontWeight:'600', color:'#222', lineHeight:'1.4', marginBottom:'6px' }}>{product.name}</div>
        {/* Description clamped to 2 lines */}
        <div style={{ fontSize:'12px', color:'#888', lineHeight:'1.5', marginBottom:'8px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</div>

        {/* Star rating */}
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'3px', background:'var(--accent)', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'2px 7px', borderRadius:'2px' }}>
            {product.rating} ★
          </div>
          <span style={{ fontSize:'11px', color:'#888' }}>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price with strikethrough original and discount % */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'16px', fontWeight:'700', color:'#222' }}>₹{product.price}</span>
          {product.originalPrice && <span style={{ fontSize:'13px', color:'#aaa', textDecoration:'line-through' }}>₹{product.originalPrice}</span>}
          {discount && <span style={{ fontSize:'12px', fontWeight:'700', color:'#14a800' }}>{discount}% off</span>}
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

const Accessories = () => {
  const [cart, setCart]         = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [filters, setFilters]   = useState({})
  const [sortBy, setSortBy]     = useState('featured')
  const [viewMode, setViewMode] = useState('grid')   // 'grid' or 'list'

  // Add item to cart; increment qty if already exists
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty+1 } : i)
      return [...prev, { ...product, qty:1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  // delta is +1 or -1; removes item if qty drops to 0
  const changeQty = (id, delta) => setCart(prev => prev.map(i => i.id===id ? {...i, qty:i.qty+delta} : i).filter(i => i.qty > 0))

  // Filter products by active filter state
  let filtered = PRODUCTS.filter(p => {
    const matchCategory = !filters.category?.length || filters.category.includes(p.category)
    const matchPriceMin = !filters.priceMin || p.price >= Number(filters.priceMin)
    const matchPriceMax = !filters.priceMax || p.price <= Number(filters.priceMax)
    return matchCategory && matchPriceMin && matchPriceMax
  })

  // Sort filtered results based on selected sort option
  if (sortBy === 'price_asc')  filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a,b) => b.price - a.price)
  if (sortBy === 'rating')     filtered = [...filtered].sort((a,b) => b.rating - a.rating)

  // Total item count shown on cart icon badge
  const cartCount = cart.reduce((sum,i) => sum+i.qty, 0)

  // Active filter pills shown in the top bar — each has a clear callback
  const activeFilters = [
    ...(filters.category||[]).map(v => ({ label:v, clear:() => setFilters(p => ({...p, category:(p.category||[]).filter(c=>c!==v)})) })),
    ...(filters.priceMin ? [{ label:`₹${filters.priceMin}–${filters.priceMax}`, clear:() => setFilters(p => ({...p, priceMin:undefined, priceMax:undefined})) }] : []),
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#fafafa', display:'flex', flexDirection:'column' }}>
      <ShopNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* Breadcrumb trail */}
      <div style={{ background:'#fff', borderBottom:'1px solid #f0f0f0', padding:'10px 32px' }}>
        <div style={{ maxWidth:'1440px', margin:'0 auto', fontSize:'12px', color:'#888', display:'flex', gap:'6px', alignItems:'center' }}>
          <Link to="/" style={{ color:'#888', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color:'#222', fontWeight:'600' }}>Shop</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, maxWidth:'1440px', margin:'0 auto', width:'100%' }}>
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div style={{ flex:1, padding:'20px 24px' }}>

          {/* Toolbar — product count, active filter pills, sort dropdown, grid/list toggle */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', background:'#fff', padding:'12px 16px', borderRadius:'4px', border:'1px solid #f0f0f0' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <span style={{ fontSize:'13px', color:'#888' }}>
                Showing <strong style={{ color:'#222' }}>{filtered.length}</strong> products
              </span>
              {activeFilters.map((f,i) => (
                <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'4px 10px', background:'#fff3f0', borderRadius:'50px', border:'1px solid #ffd5cc', fontSize:'12px', color:'var(--accent)', fontWeight:'600' }}>
                  {f.label}
                  <button onClick={f.clear} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'14px', color:'var(--accent)', lineHeight:1, padding:0 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ fontSize:'13px', color:'#888' }}>Sort by:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding:'6px 12px', border:'1px solid #e0e0e0', borderRadius:'4px', background:'#fff', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", color:'#333', outline:'none', cursor:'pointer' }}>
                  <option value="featured">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
              {/* Grid / list view toggle */}
              <div style={{ display:'flex', gap:'4px' }}>
                {['grid','list'].map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    style={{ padding:'6px 10px', border:`1px solid ${viewMode===mode?'var(--accent)':'#e0e0e0'}`, borderRadius:'4px', background: viewMode===mode ? 'var(--accent)' : '#fff', color: viewMode===mode ? '#fff' : '#666', cursor:'pointer', fontSize:'14px' }}>
                    {mode === 'grid' ? '⊞' : '☰'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid or empty state */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px', background:'#fff', borderRadius:'4px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🌿</div>
              <p style={{ fontSize:'16px', fontWeight:'600', color:'#333' }}>No products found</p>
              <p style={{ fontSize:'13px', color:'#888', marginTop:'4px' }}>Try clearing some filters</p>
              <button onClick={() => setFilters({})} style={{ marginTop:'16px', padding:'10px 24px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns: viewMode==='grid' ? 'repeat(4,1fr)' : '1fr', gap:'16px' }}>
              {filtered.map(product => (
                <ProductCardImproved key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart drawer — only rendered when open */}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onChangeQty={changeQty} />}
    </div>
  )
}

export default Accessories