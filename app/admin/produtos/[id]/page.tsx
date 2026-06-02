'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'
import { useProducts } from '@/context/ProductsContext'
import { Product } from '@/types'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getProductById, updateProduct } = useProducts()
  const router = useRouter()

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-gray-600 mb-4">Produto não encontrado</p>
        <Link href="/admin/produtos" className="text-orange-500 hover:underline text-sm">← Voltar</Link>
      </div>
    )
  }

  const handleSave = (data: Omit<Product, 'id' | 'createdAt'>) => {
    updateProduct(id, data)
    router.push('/admin/produtos')
  }

  return <ProductForm title="Editar Produto" initial={product} onSave={handleSave} />
}
