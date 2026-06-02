'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product } from '@/types'
import { supabase, mapProduct } from '@/lib/supabase'

interface ProductsContextType {
  products:      Product[]
  loading:       boolean
  addProduct:    (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductById:(id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      setProducts(data.map(mapProduct))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()

    // Atualiza em tempo real quando outro admin salvar/excluir
    const channel = supabase
      .channel('products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addProduct = async (data: Omit<Product, 'id' | 'createdAt'>) => {
    const { error } = await supabase.from('products').insert({
      name:           data.name,
      description:    data.description,
      price:          data.price,
      original_price: data.originalPrice ?? null,
      category:       data.category,
      image:          data.image,
      in_stock:       data.inStock,
      featured:       data.featured,
    })
    if (error) throw error
  }

  const updateProduct = async (
    id: string,
    data: Partial<Omit<Product, 'id' | 'createdAt'>>
  ) => {
    const patch: Record<string, unknown> = {}
    if (data.name         !== undefined) patch.name           = data.name
    if (data.description  !== undefined) patch.description    = data.description
    if (data.price        !== undefined) patch.price          = data.price
    if (data.originalPrice !== undefined) patch.original_price = data.originalPrice ?? null
    if (data.category     !== undefined) patch.category       = data.category
    if (data.image        !== undefined) patch.image          = data.image
    if (data.inStock      !== undefined) patch.in_stock       = data.inStock
    if (data.featured     !== undefined) patch.featured       = data.featured

    const { error } = await supabase.from('products').update(patch).eq('id', id)
    if (error) throw error
  }

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  }

  const getProductById = (id: string) => products.find(p => p.id === id)

  return (
    <ProductsContext.Provider value={{
      products, loading, addProduct, updateProduct, deleteProduct, getProductById,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
