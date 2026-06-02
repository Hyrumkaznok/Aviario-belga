'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('petshop_cart')
    if (stored) setItems(JSON.parse(stored))
  }, [])

  const save = (updated: CartItem[]) => {
    setItems(updated)
    localStorage.setItem('petshop_cart', JSON.stringify(updated))
  }

  const addItem = (product: Product) => {
    const existing = items.find(i => i.product.id === product.id)
    if (existing) {
      save(items.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      save([...items, { product, quantity: 1 }])
    }
  }

  const removeItem = (productId: string) => {
    save(items.filter(i => i.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId)
    save(items.map(i => i.product.id === productId ? { ...i, quantity } : i))
  }

  const clearCart = () => save([])

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
