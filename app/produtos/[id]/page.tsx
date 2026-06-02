'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check, ArrowLeft, Package } from 'lucide-react'
import { useProducts } from '@/context/ProductsContext'
import { useCart } from '@/context/CartContext'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/products'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getProductById } = useProducts()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Produto não encontrado</h2>
        <Link href="/produtos" className="text-green-700 hover:underline">← Voltar ao catálogo</Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const color = CATEGORY_COLORS[product.category]

  const handleAdd = () => {
    if (!product.inStock) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/produtos" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden md:flex">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {discount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:w-1/2 flex flex-col">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-3 ${color.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="mb-4">
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="text-3xl font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-gray-400" />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? 'Em estoque' : 'Sem estoque'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={handleAdd}
              disabled={!product.inStock || added}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
                ${!product.inStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : added
                    ? 'bg-green-500 text-white'
                    : 'bg-green-700 hover:bg-green-800 text-white active:scale-95'
                }`}
            >
              {added ? <><Check className="w-5 h-5" /> Adicionado!</> : <><ShoppingCart className="w-5 h-5" /> Adicionar ao carrinho</>}
            </button>
            <Link
              href="/carrinho"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border-2 border-green-700 text-green-700 hover:bg-green-50 transition-colors"
            >
              Ver carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
