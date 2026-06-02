'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check, Tag } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { CATEGORY_LABELS } from '@/lib/products'

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

  return (
    <Link href={`/produtos/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">

        {/* Imagem */}
        <div className="relative bg-gray-50 h-52 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {discount && (
            <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-white text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow">
                Sem estoque
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex flex-col flex-1 gap-2">

          {/* Categoria */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full w-fit">
            <Tag className="w-3 h-3" />
            {CATEGORY_LABELS[product.category]}
          </span>

          {/* Nome */}
          <h3 className="text-sm font-semibold text-[#0F172A] leading-snug line-clamp-2 flex-1 group-hover:text-[#0F766E] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Preço */}
          <div className="mt-auto pt-1">
            {product.originalPrice && (
              <p className="text-xs text-[#64748B] line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="text-xl font-bold text-[#0F172A] leading-none">
              R$ <span>{product.price.toFixed(2).replace('.', ',')}</span>
            </p>
          </div>

          {/* Botão */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock || added}
            className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              ${!product.inStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-[#0F766E] hover:bg-[#134E4A] text-white hover:shadow-md hover:shadow-teal-200 active:scale-95'
              }`}
          >
            {added ? (
              <><Check className="w-4 h-4" /> Adicionado!</>
            ) : (
              <><ShoppingCart className="w-4 h-4" /> Adicionar ao carrinho</>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
