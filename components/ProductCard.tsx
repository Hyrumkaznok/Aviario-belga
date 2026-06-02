'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/products'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const color = CATEGORY_COLORS[product.category]

  return (
    <Link href={`/produtos/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative bg-gray-50 h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">Sem estoque</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-2 ${color.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
            {CATEGORY_LABELS[product.category]}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-3">
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock || added}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all
              ${!product.inStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                  ? 'bg-green-500 text-white'
                  : 'bg-green-700 hover:bg-green-800 text-white active:scale-95'
              }`}
          >
            {added ? (
              <><Check className="w-4 h-4" /> Adicionado!</>
            ) : (
              <><ShoppingCart className="w-4 h-4" /> Adicionar</>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
