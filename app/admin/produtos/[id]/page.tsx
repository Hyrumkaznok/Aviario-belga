'use client'

import { use } from 'react'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'
import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getProductById, updateProduct } = useProducts()

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-[#64748B] mb-4">Produto não encontrado</p>
        <Link href="/admin/produtos" className="text-[#0F766E] hover:underline text-sm">
          ← Voltar para produtos
        </Link>
      </div>
    )
  }

  const handleSave = async (data: Omit<Product, 'id' | 'createdAt'>) =>
    updateProduct(id, data)

  return <ProductForm title="Editar Produto" initial={product} onSave={handleSave} />
}
