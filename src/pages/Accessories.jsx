import { useState } from 'react'
import { Link } from 'react-router-dom'

const GiftNav = ({ cartCount, onCartOpen }) => {
  const [openMenu, setOpenMenu] = useState(null)
  const menus = {
    'Plant Gifts':  ['Indoor Plants as Gifts','Succulents & Cacti','Air Purifying Plants','Flowering Plants','Lucky Plants','Rare & Exotic Plants'],
    'Arrangements': ['Fresh Bouquets','Dried Flower Bouquets','Mixed Arrangements','Seasonal Specials'],
    'Hampers':      ['Plant Starter Hamper','Self Care Green Hamper','Office Desk Kit','Family Green Box'],
    'Eco Gifts':    ['Seed Kits','Plantable Stationery','Mud & Clay Products','Eco Bottles & Jars','Bamboo Products'],
    'Personalised': ['Name Engraved Pots','Hand Painted Pots','Custom Message Pots','Build Your Own Hamper'],
  }
  return (
    <div style={{ background:'#fff', borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'20px', padding:'0 32px', height:'60px', maxWidth:'1440px', margin:'0 auto' }}>
        <Link to="/" style={{ textDecoration:'none', flexShrink:0 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--text-hero)' }}>
            Gree<span style={{ color:'var(--accent)' }}>Looker</span>
          </span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', flex:1, justifyContent:'center' }}>
          {Object.keys(menus).map(name => (
            <div key={name} style={{ position:'relative' }}
              onMouseEnter={() => setOpenMenu(name)}
              onMouseLeave={() => setOpenMenu(null)}>
              <button style={{ display:'flex', alignItems:'center', gap:'3px', padding:'8px 14px', border:'none', background:'transparent', color: openMenu===name ? 'var(--accent)' : '#333', fontWeight: openMenu===name ? '700' : '500', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap', borderBottom: openMenu===name ? '2px solid var(--accent)' : '2px solid transparent', transition:'all 0.15s' }}>
                {name} <span style={{ fontSize:'8px' }}>▾</span>
              </button>
              {openMenu === name && (
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
        <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'13px', color:'#888' }}>🔍</span>
            <input type="text" placeholder="Search gifts..."
              style={{ padding:'9px 16px 9px 34px', borderRadius:'4px', border:'1px solid #e8e8e8', background:'#fafafa', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", outline:'none', width:'200px' }}
              onFocus={e => e.target.style.borderColor='var(--accent)'}
              onBlur={e => e.target.style.borderColor='#e8e8e8'} />
          </div>
          <Link to="/login" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', textDecoration:'none', padding:'4px 10px', color:'#333' }}>
            <span style={{ fontSize:'18px' }}>👤</span>
            <span style={{ fontSize:'10px', fontWeight:'600' }}>Profile</span>
          </Link>
          <button onClick={onCartOpen} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', background:'none', border:'none', cursor:'pointer', padding:'4px 10px', color:'#333', position:'relative' }}>
            <span style={{ fontSize:'18px' }}>🎁</span>
            <span style={{ fontSize:'10px', fontWeight:'600' }}>Cart</span>
            {cartCount > 0 && <span style={{ position:'absolute', top:'0', right:'4px', background:'var(--accent)', color:'#fff', fontSize:'9px', fontWeight:'700', padding:'1px 5px', borderRadius:'50px' }}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

const GiftFilterSidebar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState({ occasion:true, budget:true, recipient:true, delivery:false })
  const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }))
  const hasFilters = Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : !!v)

  const Section = ({ id, label, children }) => (
    <div style={{ borderBottom:'1px solid #f0f0f0' }}>
      <button onClick={() => toggle(id)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', padding:'14px 0', fontFamily:"'DM Sans',sans-serif" }}>
        <span style={{ fontSize:'13px', fontWeight:'700', color:'#222', textTransform:'uppercase', letterSpacing:'0.04em' }}>{label}</span>
        <span style={{ fontSize:'16px', color:'#888', lineHeight:1 }}>{open[id] ? '−' : '+'}</span>
      </button>
      {open[id] && <div style={{ paddingBottom:'12px' }}>{children}</div>}
    </div>
  )

  const Checkbox = ({ label, filterKey, value }) => {
    const checked = filters[filterKey]?.includes(value) || false
    return (
      <label style={{ display:'flex', alignItems:'center', gap:'10px', padding:'5px 0', cursor:'pointer' }}
        onClick={() => {
          setFilters(prev => {
            const current = prev[filterKey] || []
            return { ...prev, [filterKey]: checked ? current.filter(v => v!==value) : [...current, value] }
          })
        }}>
        <div style={{ width:'16px', height:'16px', borderRadius:'3px', border:`2px solid ${checked?'var(--accent)':'#ddd'}`, background: checked?'var(--accent)':'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
          {checked && <span style={{ color:'#fff', fontSize:'10px', fontWeight:'700' }}>✓</span>}
        </div>
        <span style={{ fontSize:'13px', color:'#444' }}>{label}</span>
      </label>
    )
  }

  return (
    <div style={{ width:'240px', flexShrink:0, padding:'20px 24px', borderRight:'1px solid #f0f0f0', background:'#fff', overflowY:'auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
        <span style={{ fontSize:'15px', fontWeight:'700', color:'#222' }}>FILTERS</span>
        {hasFilters && <button onClick={() => setFilters({})} style={{ fontSize:'12px', fontWeight:'600', color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", padding:0, textDecoration:'underline' }}>CLEAR ALL</button>}
      </div>

      <Section id="occasion" label="Occasion">
        {[['🎂 Birthday','Birthday'],['💍 Anniversary','Anniversary'],['🏠 Housewarming','Housewarming'],['💼 Corporate','Corporate'],['🎓 Graduation','Graduation'],['💝 Just Because','Just Because']].map(([label,value]) => (
          <Checkbox key={value} label={label} filterKey="occasion" value={value} />
        ))}
      </Section>

      <Section id="budget" label="Budget">
        <div style={{ display:'flex', gap:'8px', marginBottom:'10px' }}>
          <input type="number" placeholder="₹ Min" value={filters.priceMin||''} onChange={e => setFilters(p => ({...p, priceMin:e.target.value}))}
            style={{ width:'80px', padding:'8px 10px', border:'1px solid #e0e0e0', borderRadius:'4px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", outline:'none' }} />
          <span style={{ color:'#aaa', alignSelf:'center' }}>to</span>
          <input type="number" placeholder="₹ Max" value={filters.priceMax||''} onChange={e => setFilters(p => ({...p, priceMax:e.target.value}))}
            style={{ width:'80px', padding:'8px 10px', border:'1px solid #e0e0e0', borderRadius:'4px', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", outline:'none' }} />
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
          {[['Under ₹299',0,299],['₹300–599',300,599],['₹600–999',600,999],['₹1000+',1000,99999]].map(([label,min,max]) => (
            <button key={label} onClick={() => setFilters(p => ({...p, priceMin:min, priceMax:max}))}
              style={{ padding:'5px 10px', borderRadius:'50px', border:`1px solid ${filters.priceMin===min?'var(--accent)':'#e0e0e0'}`, background: filters.priceMin===min?'#fff3f0':'#fff', color: filters.priceMin===min?'var(--accent)':'#666', fontSize:'11px', fontWeight:'600', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section id="recipient" label="For Whom">
        {[['👩 For Her','For Her'],['👨 For Him','For Him'],['🏠 For Home','For Home'],['💼 For Office','For Office'],['👨‍👩‍👧 For Family','For Family']].map(([label,value]) => (
          <Checkbox key={value} label={label} filterKey="recipient" value={value} />
        ))}
      </Section>

      <Section id="delivery" label="Delivery">
        {[['⚡ Same Day','Same Day'],['🚀 Express (2hr)','Express'],['📅 Scheduled','Scheduled']].map(([label,value]) => (
          <Checkbox key={value} label={label} filterKey="delivery" value={value} />
        ))}
      </Section>
    </div>
  )
}

const CartDrawer = ({ cart, onClose, onRemove, onChangeQty }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:99 }} />
      <div style={{ position:'fixed', top:0, right:0, height:'100vh', width:'400px', background:'#fff', zIndex:100, display:'flex', flexDirection:'column', boxShadow:'-4px 0 24px rgba(0,0,0,0.15)' }}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', color:'#222', fontWeight:'700', margin:0 }}>Gift Cart 🎁</h2>
            <p style={{ fontSize:'12px', color:'#888', marginTop:'4px' }}>{cart.length} item{cart.length!==1?'s':''}</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'1px solid #e0e0e0', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', color:'#666', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 24px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🎁</div>
              <p style={{ fontSize:'15px', fontWeight:'600', color:'#333' }}>Your gift cart is empty!</p>
              <p style={{ fontSize:'13px', color:'#888', marginTop:'6px' }}>Find the perfect gift for someone special</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display:'flex', gap:'14px', padding:'16px 0', borderBottom:'1px solid #f8f8f8' }}>
              <div style={{ width:'80px', height:'80px', borderRadius:'8px', overflow:'hidden', background:'#f8f8f8', flexShrink:0 }}>
                <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.style.display='none'} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'13px', fontWeight:'600', color:'#222' }}>{item.name}</div>
                <div style={{ fontSize:'12px', color:'#888', marginTop:'2px' }}>₹{item.price}</div>
                {item.personalMessage && <div style={{ fontSize:'11px', color:'var(--accent)', marginTop:'4px', fontStyle:'italic' }}>✏️ "{item.personalMessage}"</div>}
                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', border:'1px solid #e0e0e0', borderRadius:'4px', overflow:'hidden' }}>
                    <button onClick={() => onChangeQty(item.id,-1)} style={{ width:'28px', height:'28px', background:'#f8f8f8', border:'none', cursor:'pointer', fontSize:'16px', color:'#333', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <span style={{ width:'32px', textAlign:'center', fontSize:'13px', fontWeight:'600' }}>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id,1)} style={{ width:'28px', height:'28px', background:'#f8f8f8', border:'none', cursor:'pointer', fontSize:'16px', color:'#333', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ fontSize:'12px', color:'#dc2626', background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontWeight:'600', textDecoration:'underline' }}>Remove</button>
                </div>
              </div>
              <span style={{ fontSize:'14px', fontWeight:'700', color:'#222', flexShrink:0 }}>₹{item.price*item.qty}</span>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding:'20px 24px', borderTop:'1px solid #f0f0f0' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
              <span style={{ fontSize:'15px', fontWeight:'700', color:'#222' }}>Total Amount</span>
              <span style={{ fontSize:'15px', fontWeight:'700', color:'var(--accent)' }}>₹{total}</span>
            </div>
            <div style={{ fontSize:'11px', color:'var(--accent)', textAlign:'center', marginBottom:'12px', fontWeight:'600' }}>🎀 Free gift wrapping on orders above ₹499</div>
            <button style={{ width:'100%', padding:'14px', borderRadius:'4px', border:'none', background:'var(--accent)', color:'#fff', fontSize:'14px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              PLACE ORDER →
            </button>
          </div>
        )}
      </div>
    </>
  )
}

const PRODUCTS = [
  { id:1,  category:'Plant Gifts',  badge:'Bestseller', name:'Monstera Love Gift',          description:'A gorgeous Monstera in a hand-painted white pot. Perfect housewarming gift.',         includes:['Monstera plant','Painted pot','Care card','Gift wrap'],  occasions:['Housewarming','Anniversary'], recipient:'For Home',   delivery:'Same Day',  eco:true,  rating:5, reviews:312, price:699,  originalPrice:999,   img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id:2,  category:'Plant Gifts',  badge:null,         name:'Lucky Bamboo Set',             description:'3-layer lucky bamboo in a ceramic vase. Brings prosperity and positive energy.',      includes:['Lucky bamboo','Ceramic vase','Pebbles','Ribbon'],        occasions:['Birthday','Corporate'],       recipient:'For Office', delivery:'Scheduled', eco:false, rating:4, reviews:198, price:399,  originalPrice:null,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:3,  category:'Plant Gifts',  badge:'New',        name:'Succulent Trio Box',           description:'3 curated succulents in a kraft gift box with personalised tag.',                     includes:['3 succulents','Kraft box','Gift tag','Soil'],            occasions:['Birthday','Just Because'],    recipient:'For Her',    delivery:'Express',   eco:true,  rating:5, reviews:267, price:499,  originalPrice:599,   img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id:4,  category:'Arrangements', badge:'Bestseller', name:'Wild Flower Bouquet',          description:'Handpicked seasonal wildflowers arranged in a jute wrap. Fresh and fragrant.',        includes:['15 stems','Jute wrap','Water sachet','Card'],            occasions:['Birthday','Anniversary'],     recipient:'For Her',    delivery:'Same Day',  eco:true,  rating:5, reviews:445, price:549,  originalPrice:799,   img:'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80' },
  { id:5,  category:'Arrangements', badge:null,         name:'Dried Pampas Bouquet',         description:'Elegant dried pampas grass and dried florals. Lasts forever, no watering needed.',    includes:['Dried stems','Cotton wrap','Vase included'],             occasions:['Anniversary','Housewarming'], recipient:'For Home',   delivery:'Scheduled', eco:true,  rating:4, reviews:134, price:749,  originalPrice:null,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:6,  category:'Hampers',      badge:'Bestseller', name:'Plant Parent Starter Kit',     description:'Everything a new plant parent needs — plant, soil, pot, tools and care guide.',       includes:['1 plant','Pot','Soil mix','Mini tools','Care booklet'],  occasions:['Birthday','Graduation'],      recipient:'For Him',    delivery:'Scheduled', eco:true,  rating:5, reviews:389, price:999,  originalPrice:1299,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:7,  category:'Hampers',      badge:null,         name:'Self Care Green Hamper',       description:'A calming hamper with a peace lily, scented candle, and herbal tea sachet.',          includes:['Peace lily','Scented candle','Herbal tea','Tray'],       occasions:['Birthday','Just Because'],    recipient:'For Her',    delivery:'Same Day',  eco:false, rating:4, reviews:201, price:849,  originalPrice:999,   img:'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80' },
  { id:8,  category:'Hampers',      badge:'New',        name:'Office Desk Green Kit',        description:'Snake plant + desk pot + moisture meter. The perfect corporate gifting set.',         includes:['Snake plant','Ceramic desk pot','Moisture meter'],       occasions:['Corporate','Graduation'],     recipient:'For Office', delivery:'Scheduled', eco:false, rating:4, reviews:156, price:799,  originalPrice:999,   img:'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80' },
  { id:9,  category:'Personalised', badge:null,         name:'Name Engraved Terracotta Pot', description:'Handcrafted terracotta pot engraved with any name. Comes with a plant of choice.',    includes:['Engraved pot','Plant of choice','Gift box'],             occasions:['Birthday','Anniversary'],     recipient:'For Her',    delivery:'Scheduled', eco:true,  rating:5, reviews:178, price:449,  originalPrice:599,   img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id:10, category:'Personalised', badge:'New',        name:'Hand Painted Message Pot',     description:'White ceramic pot hand-painted with a custom message or quote by our artists.',       includes:['Painted ceramic pot','Custom message','Gift wrap'],      occasions:['Just Because','Anniversary'], recipient:'For Her',    delivery:'Scheduled', eco:false, rating:5, reviews:93,  price:599,  originalPrice:null,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:11, category:'Eco Gifts',    badge:'Bestseller', name:'Kitchen Herb Garden Kit',      description:'Grow basil, coriander and mint at home. Everything included, no experience needed.',   includes:['3 seed packs','Soil','3 pots','Spray bottle','Guide'],   occasions:['Housewarming','Birthday'],    recipient:'For Home',   delivery:'Same Day',  eco:true,  rating:4, reviews:312, price:349,  originalPrice:499,   img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:12, category:'Eco Gifts',    badge:null,         name:'Plantable Birthday Card Set',  description:'Seed-embedded cards that grow into wildflowers when planted after reading.',           includes:['6 cards','Envelopes','Planting instructions'],           occasions:['Birthday','Just Because'],    recipient:'For Family', delivery:'Same Day',  eco:true,  rating:5, reviews:267, price:199,  originalPrice:null,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id:13, category:'Eco Gifts',    badge:'New',        name:'Terracotta Gift Set',          description:'Set of 4 handmade terracotta cups and a small diyas tray. Made by local artisans.',    includes:['4 clay cups','Diyas tray','Jute bag'],                   occasions:['Housewarming','Corporate'],   recipient:'For Home',   delivery:'Scheduled', eco:true,  rating:4, reviews:89,  price:549,  originalPrice:699,   img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id:14, category:'Eco Gifts',    badge:'Bestseller', name:'Seed Infused Bamboo Bottle',   description:'Bamboo bottle with wildflower seeds embedded in the label. Plant it after use.',       includes:['Bamboo bottle','Seed label','Planting guide'],           occasions:['Corporate','Graduation'],     recipient:'For Him',    delivery:'Same Day',  eco:true,  rating:5, reviews:156, price:299,  originalPrice:null,  img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
]

const GiftCardImproved = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [message, setMessage] = useState('')

  const handleAdd = () => {
    onAddToCart({ ...product, personalMessage: message })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice ? Math.round((1 - product.price/product.originalPrice)*100) : null

  return (
    <div style={{ background:'#fff', borderRadius:'4px', overflow:'hidden', cursor:'pointer', position:'relative', border:'1px solid #f0f0f0', transition:'box-shadow 0.2s', boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Image */}
      <div style={{ position:'relative', paddingTop:'110%', background:'#f8f8f8', overflow:'hidden' }}>
        <img src={product.img} alt={product.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => e.target.style.display='none'} />

        {/* Wishlist */}
        <button onClick={e => { e.stopPropagation(); setWishlist(!wishlist) }}
          style={{ position:'absolute', top:'10px', right:'10px', background:'#fff', border:'none', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.12)', fontSize:'16px', zIndex:2 }}>
          {wishlist ? '❤️' : '🤍'}
        </button>

        {/* Badge */}
        {product.badge && (
          <span style={{ position:'absolute', top:'10px', left:'10px', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background: product.badge==='Bestseller' ? '#ff6161' : 'var(--accent)', color:'#fff', letterSpacing:'0.04em', zIndex:2 }}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span style={{ position:'absolute', bottom:'10px', left:'10px', fontSize:'11px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background:'#14a800', color:'#fff', zIndex:2 }}>
            {discount}% OFF
          </span>
        )}

        {/* Eco badge */}
        {product.eco && (
          <span style={{ position:'absolute', bottom:'10px', right:'10px', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'2px', background:'rgba(255,255,255,0.9)', color:'#14a800', zIndex:2 }}>
            🌱 Eco
          </span>
        )}

        {/* Add to cart on hover */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--text-hero)', padding:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.25s ease', zIndex:3 }}
          onClick={e => { e.stopPropagation(); handleAdd() }}>
          <span style={{ fontSize:'16px' }}>{added ? '✓' : '🎁'}</span>
          <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.05em' }}>{added ? 'ADDED!' : 'ADD TO GIFT CART'}</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'12px 12px 14px' }}>
        <div style={{ fontSize:'11px', color:'#888', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:'4px' }}>{product.category}</div>
        <div style={{ fontSize:'14px', fontWeight:'600', color:'#222', lineHeight:'1.4', marginBottom:'4px' }}>{product.name}</div>
        <div style={{ fontSize:'12px', color:'#888', lineHeight:'1.5', marginBottom:'8px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</div>

        {/* Occasion tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'8px' }}>
          {product.occasions.slice(0,2).map(o => (
            <span key={o} style={{ fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'50px', background:'#fdf4ff', color:'#7e22ce', border:'1px solid #e9d5ff' }}>{o}</span>
          ))}
          <span style={{ fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'50px', background:'#fff8f0', color:'#c2410c', border:'1px solid #fed7aa' }}>
            {product.recipient}
          </span>
        </div>

        {/* Delivery */}
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
          <span style={{ fontSize:'11px', fontWeight:'600', padding:'2px 8px', borderRadius:'2px', background: product.delivery==='Same Day'?'#dcfce7': product.delivery==='Express'?'#dbeafe':'#f3f4f6', color: product.delivery==='Same Day'?'#166534': product.delivery==='Express'?'#1d4ed8':'#374151' }}>
            🚚 {product.delivery}
          </span>
        </div>

        {/* Rating */}
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'3px', background:'var(--accent)', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'2px 7px', borderRadius:'2px' }}>
            {product.rating} ★
          </div>
          <span style={{ fontSize:'11px', color:'#888' }}>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
          <span style={{ fontSize:'16px', fontWeight:'700', color:'#222' }}>₹{product.price}</span>
          {product.originalPrice && <span style={{ fontSize:'13px', color:'#aaa', textDecoration:'line-through' }}>₹{product.originalPrice}</span>}
          {discount && <span style={{ fontSize:'12px', fontWeight:'700', color:'#14a800' }}>{discount}% off</span>}
        </div>

        {/* Personal message toggle */}
        <button onClick={e => { e.stopPropagation(); setShowMsg(!showMsg) }}
          style={{ fontSize:'12px', fontWeight:'600', color:'var(--accent)', background:'none', border:'1px solid var(--border)', borderRadius:'4px', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", padding:'6px 12px', width:'100%', marginBottom: showMsg ? '8px' : '0', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px' }}>
          ✏️ {showMsg ? 'Hide message' : 'Add a personal message'}
        </button>
        {showMsg && (
          <textarea
            placeholder="e.g. Happy Birthday Riya! 🌿"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={2}
            onClick={e => e.stopPropagation()}
            style={{ width:'100%', padding:'8px 12px', borderRadius:'4px', border:'1px solid #e0e0e0', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#333', outline:'none', resize:'none', boxSizing:'border-box', marginBottom:'0' }}
          />
        )}
      </div>
    </div>
  )
}

const Gifting = () => {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('featured')

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty+1 } : i)
      return [...prev, { ...product, qty:1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const changeQty = (id, delta) => setCart(prev => prev.map(i => i.id===id ? {...i, qty:i.qty+delta} : i).filter(i => i.qty > 0))

  let filtered = PRODUCTS.filter(p => {
    const matchOccasion  = !filters.occasion?.length  || filters.occasion.some(o => p.occasions.includes(o))
    const matchRecipient = !filters.recipient?.length || filters.recipient.includes(p.recipient)
    const matchDelivery  = !filters.delivery?.length  || filters.delivery.includes(p.delivery)
    const matchPriceMin  = !filters.priceMin || p.price >= Number(filters.priceMin)
    const matchPriceMax  = !filters.priceMax || p.price <= Number(filters.priceMax)
    return matchOccasion && matchRecipient && matchDelivery && matchPriceMin && matchPriceMax
  })

  if (sortBy === 'price_asc')  filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a,b) => b.price - a.price)
  if (sortBy === 'rating')     filtered = [...filtered].sort((a,b) => b.rating - a.rating)

  const cartCount = cart.reduce((sum,i) => sum+i.qty, 0)

  const activeFilters = [
    ...(filters.occasion||[]).map(v => ({ label:v, clear:() => setFilters(p => ({...p, occasion:(p.occasion||[]).filter(c=>c!==v)})) })),
    ...(filters.recipient||[]).map(v => ({ label:v, clear:() => setFilters(p => ({...p, recipient:(p.recipient||[]).filter(c=>c!==v)})) })),
    ...(filters.delivery||[]).map(v => ({ label:v, clear:() => setFilters(p => ({...p, delivery:(p.delivery||[]).filter(c=>c!==v)})) })),
    ...(filters.priceMin ? [{ label:`₹${filters.priceMin}–${filters.priceMax}`, clear:() => setFilters(p => ({...p, priceMin:undefined, priceMax:undefined})) }] : []),
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#fafafa', display:'flex', flexDirection:'column' }}>
      <GiftNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* Breadcrumb */}
      <div style={{ background:'#fff', borderBottom:'1px solid #f0f0f0', padding:'10px 32px' }}>
        <div style={{ maxWidth:'1440px', margin:'0 auto', fontSize:'12px', color:'#888', display:'flex', gap:'6px', alignItems:'center' }}>
          <Link to="/" style={{ color:'#888', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color:'#222', fontWeight:'600' }}>Gifting</span>
        </div>
      </div>

      {/* Hero banner */}
      <div style={{ background:'linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 100%)', padding:'28px 32px', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:'1440px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--soft-leaf)', marginBottom:'6px' }}>💐 Green Gifting</p>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:'700', color:'#fff', margin:0, lineHeight:'1.2' }}>
              Gifts that keep <em style={{ fontStyle:'italic', color:'var(--soft-leaf)' }}>growing</em>
            </h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', marginTop:'6px' }}>Every bouquet comes with plantable seeds. Zero waste, 100% love.</p>
          </div>
          <div style={{ display:'flex', gap:'16px' }}>
            {[['🌱','Eco Friendly'],['🎀','Free Wrapping'],['🚚','Same Day'],['💯','Guaranteed']].map(([icon,label]) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'22px', marginBottom:'4px' }}>{icon}</div>
                <div style={{ fontSize:'10px', fontWeight:'600', color:'rgba(255,255,255,0.6)', whiteSpace:'nowrap' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, maxWidth:'1440px', margin:'0 auto', width:'100%' }}>
        <GiftFilterSidebar filters={filters} setFilters={setFilters} />

        <div style={{ flex:1, padding:'20px 24px' }}>

          {/* Top bar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', background:'#fff', padding:'12px 16px', borderRadius:'4px', border:'1px solid #f0f0f0' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'13px', color:'#888' }}>
                Showing <strong style={{ color:'#222' }}>{filtered.length}</strong> gifts
              </span>
              {activeFilters.map((f,i) => (
                <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'4px 10px', background:'#fff3f0', borderRadius:'50px', border:'1px solid #ffd5cc', fontSize:'12px', color:'var(--accent)', fontWeight:'600' }}>
                  {f.label}
                  <button onClick={f.clear} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'14px', color:'var(--accent)', lineHeight:1, padding:0 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ fontSize:'13px', color:'#888' }}>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ padding:'6px 12px', border:'1px solid #e0e0e0', borderRadius:'4px', background:'#fff', fontSize:'13px', fontFamily:"'DM Sans',sans-serif", color:'#333', outline:'none', cursor:'pointer' }}>
                <option value="featured">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px', background:'#fff', borderRadius:'4px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>🎁</div>
              <p style={{ fontSize:'16px', fontWeight:'600', color:'#333' }}>No gifts found</p>
              <p style={{ fontSize:'13px', color:'#888', marginTop:'4px' }}>Try adjusting your filters</p>
              <button onClick={() => setFilters({})} style={{ marginTop:'16px', padding:'10px 24px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:'4px', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
              {filtered.map(product => (
                <GiftCardImproved key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onChangeQty={changeQty} />}
    </div>
  )
}

export default Gifting