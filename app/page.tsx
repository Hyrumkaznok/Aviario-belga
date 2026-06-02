'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Truck, Shield, Star, ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/context/ProductsContext'
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_DESC } from '@/lib/products'
import { Category } from '@/types'

const CATEGORIES: Category[] = ['cachorros', 'gatos', 'passaros', 'peixes', 'outros']

const HERO_BG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=500&fit=crop'

export default function HomePage() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured && p.inStock).slice(0, 8)

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-green-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={HERO_BG} alt="pets" fill className="object-cover" priority />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <p className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Aviário Belga</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4">
            Tudo que seu pet<br />
            <span className="text-yellow-400">precisa, aqui.</span>
          </h1>
          <p className="text-green-100 text-lg mb-8 max-w-xl">
            Ração, acessórios e higiene para cães, gatos, pássaros e muito mais. Peça pelo WhatsApp e receba em casa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produtos"
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-full hover:bg-yellow-50 transition-colors flex items-center gap-2"
            >
              Ver Produtos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/carrinho"
              className="bg-green-800 text-white font-bold px-6 py-3 rounded-full hover:bg-green-900 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Meu Carrinho
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="flex items-center gap-3 justify-center py-3 sm:py-0">
            <Truck className="w-5 h-5 text-green-700 shrink-0" />
            <span className="text-sm text-gray-600"><strong className="text-gray-800">Entrega rápida</strong> na sua cidade</span>
          </div>
          <div className="flex items-center gap-3 justify-center py-3 sm:py-0">
            <ShoppingCart className="w-5 h-5 text-green-700 shrink-0" />
            <span className="text-sm text-gray-600"><strong className="text-gray-800">Peça pelo WhatsApp</strong> com facilidade</span>
          </div>
          <div className="flex items-center gap-3 justify-center py-3 sm:py-0">
            <Shield className="w-5 h-5 text-green-700 shrink-0" />
            <span className="text-sm text-gray-600"><strong className="text-gray-800">Produtos originais</strong> com garantia</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Compre por categoria</h2>
        <p className="text-sm text-gray-500 mb-6">Encontre o que seu pet precisa</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map(cat => {
            const color = CATEGORY_COLORS[cat]
            return (
              <Link
                key={cat}
                href={`/produtos?categoria=${cat}`}
                className={`${color.bg} ${color.border} border rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-2 group`}
              >
                <span className={`w-2 h-2 rounded-full ${color.dot}`} />
                <p className={`font-bold text-sm ${color.text}`}>{CATEGORY_LABELS[cat]}</p>
                <p className="text-xs text-gray-500 leading-snug">{CATEGORY_DESC[cat]}</p>
                <span className={`text-xs font-semibold ${color.text} flex items-center gap-1 mt-1 group-hover:gap-2 transition-all`}>
                  Ver produtos <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Produtos em destaque</h2>
            <p className="text-sm text-gray-500 mt-0.5">Seleção especial para o seu pet</p>
          </div>
          <Link href="/produtos" className="text-green-700 hover:text-green-800 text-sm font-medium flex items-center gap-1">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-600 font-medium">Nenhum produto cadastrado ainda.</p>
            <Link href="/admin/produtos" className="text-green-700 hover:underline text-sm mt-1 inline-block">
              Cadastrar produtos no admin
            </Link>
          </div>
        )}
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-green-700 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Peça pelo WhatsApp</h2>
          <p className="text-green-100 mb-6 max-w-lg mx-auto">
            Monte seu carrinho, informe seu nome e endereço, e finalize direto no WhatsApp. Rápido e sem complicação.
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
          >
            <Star className="w-5 h-5" />
            Começar a comprar
          </Link>
        </div>
      </section>
    </div>
  )
}
