'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { WHATSAPP_NUMBER } from '@/lib/products'
import { CustomerInfo } from '@/types'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const validate = () => {
    const e: Partial<CustomerInfo> = {}
    if (!customer.name.trim()) e.name = 'Nome é obrigatório'
    if (!customer.phone.trim()) e.phone = 'Telefone é obrigatório'
    if (!customer.address.trim()) e.address = 'Endereço é obrigatório'
    if (!customer.neighborhood.trim()) e.neighborhood = 'Bairro é obrigatório'
    if (!customer.city.trim()) e.city = 'Cidade é obrigatória'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleWhatsApp = () => {
    if (!validate()) return

    const itemLines = items
      .map(i => `• ${i.product.name} (x${i.quantity}) — R$ ${(i.product.price * i.quantity).toFixed(2).replace('.', ',')}`)
      .join('\n')

    const msg = [
      '🛒 *Novo Pedido — Aviário Belga*',
      '',
      `*Cliente:* ${customer.name}`,
      `*Telefone:* ${customer.phone}`,
      `*Endereço:* ${customer.address}`,
      `*Bairro:* ${customer.neighborhood}`,
      `*Cidade:* ${customer.city}`,
      '',
      '*Produtos:*',
      itemLines,
      '',
      `*Total: R$ ${total.toFixed(2).replace('.', ',')}*`,
    ].join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    clearCart()
    setShowForm(false)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8">Adicione produtos para continuar</p>
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          <ShoppingBag className="w-5 h-5" /> Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/produtos" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Continuar comprando
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Meu Carrinho <span className="text-gray-400 text-lg font-normal">({count} {count === 1 ? 'item' : 'itens'})</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</p>
                <p className="text-green-700 font-bold mt-1">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-800 text-sm">
                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </p>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-400 hover:text-red-600 mt-1 transition-colors"
                  aria-label="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Resumo do Pedido</h2>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between">
                  <span className="truncate pr-2">{product.name} x{quantity}</span>
                  <span className="shrink-0">R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir pelo WhatsApp
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Você será redirecionado ao WhatsApp do petshop
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Seus dados para entrega</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Ex: João da Silva"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="Ex: (11) 99999-9999"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço (Rua + nº) *</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Ex: Rua das Flores, 123"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
                  <input
                    type="text"
                    value={customer.neighborhood}
                    onChange={e => setCustomer({ ...customer, neighborhood: e.target.value })}
                    placeholder="Ex: Centro"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.neighborhood ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.neighborhood && <p className="text-xs text-red-500 mt-1">{errors.neighborhood}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Ex: São Paulo"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-green-50 rounded-xl p-3 text-xs text-gray-600 border border-green-100">
                <p className="font-semibold text-green-700 mb-1">📱 O pedido será enviado assim:</p>
                <p>🛒 Novo Pedido — Aviário Belga</p>
                <p>Cliente: {customer.name || 'seu nome'}</p>
                <p>Endereço: {customer.address || 'seu endereço'}, {customer.neighborhood || 'bairro'} — {customer.city || 'cidade'}</p>
                <p>Total: R$ {total.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
