'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Pencil, Trash2, Search, Package, Loader2 } from 'lucide-react'
import { useProducts } from '@/context/ProductsContext'
import { CATEGORY_LABELS } from '@/lib/products'

export default function AdminProductsPage() {
  const { products, deleteProduct } = useProducts()
  const [search,        setSearch]        = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting,      setDeleting]      = useState(false)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteProduct(id)
      setConfirmDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Produtos</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{products.length} produtos cadastrados</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Novo Produto
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-sm bg-white"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[#64748B]">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-medium">Nenhum produto encontrado</p>
            <Link href="/admin/produtos/novo" className="text-[#0F766E] hover:underline text-sm mt-1 inline-block">
              Cadastrar novo produto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-[#64748B] font-medium">Produto</th>
                  <th className="text-left px-4 py-3 text-[#64748B] font-medium hidden sm:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 text-[#64748B] font-medium">Preço</th>
                  <th className="text-left px-4 py-3 text-[#64748B] font-medium hidden md:table-cell">Estoque</th>
                  <th className="text-left px-4 py-3 text-[#64748B] font-medium hidden md:table-cell">Destaque</th>
                  <th className="text-right px-4 py-3 text-[#64748B] font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-[#0F172A] line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-[#64748B]">
                      {CATEGORY_LABELS[product.category]}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#0F172A]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-teal-50 text-[#0F766E]'
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {product.inStock ? 'Em estoque' : 'Esgotado'}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.featured
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-gray-100 text-[#64748B]'
                      }`}>
                        {product.featured ? 'Destaque' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/produtos/${product.id}`}
                          className="p-2 text-[#64748B] hover:text-[#0F766E] hover:bg-teal-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(product.id)}
                          className="p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in-scale">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Confirmar exclusão</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Tem certeza que deseja excluir{' '}
              <strong className="text-[#0F172A]">
                {products.find(p => p.id === confirmDelete)?.name}
              </strong>
              ? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[#64748B] font-medium hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Excluindo…</>
                  : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
