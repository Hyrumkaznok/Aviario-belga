'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product } from '@/types'
import { DEFAULT_PRODUCTS } from '@/lib/products'

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('petshop_products')
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      setProducts(DEFAULT_PRODUCTS)
      localStorage.setItem('petshop_products', JSON.stringify(DEFAULT_PRODUCTS))
    }
  }, [])

  const save = (updated: Product[]) => {
    setProducts(updated)
    localStorage.setItem('petshop_products', JSON.stringify(updated))
  }

  const addProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    save([...products, newProduct])
  }

  const updateProduct = (id: string, data: Partial<Product>) => {
    save(products.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const deleteProduct = (id: string) => {
    save(products.filter(p => p.id !== id))
  }

  const getProductById = (id: string) => products.find(p => p.id === id)

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
