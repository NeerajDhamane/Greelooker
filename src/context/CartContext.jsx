import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

// One shared cart used by both the Accessories and Gifting pages, backed
// by localStorage so it survives navigation (including the redirect to
// /login when a guest tries to check out — Bug: cart was previously local
// component state and vanished on any route change).
//
// Accessories and Gifting each have their own independent product-id
// numbering, so cart entries are keyed by (source + id) together, not id
// alone — otherwise "Accessories product #1" and "Gifting product #1"
// would collide and overwrite each other in a shared cart.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gl_cart') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('gl_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, source) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.source === source)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.source === source ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1, source }]
    })
  }

  const removeFromCart = (id, source) =>
    setCart((prev) => prev.filter((i) => !(i.id === id && i.source === source)))

  const changeQty = (id, source, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.source === source ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
