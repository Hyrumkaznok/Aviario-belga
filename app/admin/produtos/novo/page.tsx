'use client'

import ProductForm from '@/components/ProductForm'
import { useProducts } from '@/context/ProductsContext'

export default function NewProductPage() {
  const { addProduct } = useProducts()
  return <ProductForm title="Novo Produto" onSave={addProduct} />
}
