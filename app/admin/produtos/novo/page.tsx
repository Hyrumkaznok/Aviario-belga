'use client'

import ProductForm from '@/components/ProductForm'
import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types'

export default function NewProductPage() {
  const { addProduct } = useProducts()

  const handleSave = (data: Omit<Product, 'id' | 'createdAt'>) => {
    addProduct(data)
  }

  return <ProductForm title="Novo Produto" onSave={handleSave} />
}
