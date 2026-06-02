'use client'

import Link from 'next/link'
import { Package, ShoppingBag, TrendingUp, PlusCircle } from 'lucide-react'
import { useProducts } from '@/context/ProductsContext'
import { CATEGORY_LABELS } from '@/lib/products'

export default function AdminDashboard() {
  const { products } = useProducts()

  const inStock = products.filter(p => p.inStock).length
  const outOfStock = products.filter(p => !p.inStock).length
  const featured = products.filter(p => p.featured).length

  const byCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Visão geral do Aviário Belga</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Novo Produto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total de Produtos', value: products.length, icon: Package, color: 'bg-blue-50 text-blue-600' },
          { label: 'Em Estoque', value: inStock, icon: ShoppingBag, color: 'bg-green-50 text-green-700' },
          { label: 'Sem Estoque', value: outOfStock, icon: ShoppingBag, color: 'bg-red-50 text-red-600' },
          { label: 'Em Destaque', value: featured, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* By Category */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-4">Produtos por Categoria</h2>
          <div className="space-y-3">
            {byCategory.map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{CATEGORY_LABELS[cat] || cat}</span>
                    <span className="font-semibold text-gray-800">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(count / products.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Últimos Produtos</h2>
            <Link href="/admin/produtos" className="text-xs text-green-700 hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {products.slice(-5).reverse().map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-400">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {p.inStock ? 'Estoque' : 'Esgotado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
