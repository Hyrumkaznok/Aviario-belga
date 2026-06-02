'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Save, ArrowLeft } from 'lucide-react'
import { Product, Category } from '@/types'
import { CATEGORY_LABELS } from '@/lib/products'

const CATEGORIES: Category[] = ['cachorros', 'gatos', 'passaros', 'peixes', 'outros']

interface Props {
  initial?: Product
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void
  title: string
}

export default function ProductForm({ initial, onSave, title }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    price: initial?.price?.toString() || '',
    originalPrice: initial?.originalPrice?.toString() || '',
    category: initial?.category || 'cachorros' as Category,
    image: initial?.image || '',
    inStock: initial?.inStock ?? true,
    featured: initial?.featured ?? false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (key: string, value: string | boolean | Category) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nome é obrigatório'
    if (!form.description.trim()) e.description = 'Descrição é obrigatória'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Preço inválido'
    if (form.originalPrice && (isNaN(Number(form.originalPrice)) || Number(form.originalPrice) <= 0)) e.originalPrice = 'Preço original inválido'
    if (!form.image.trim()) e.image = 'URL da imagem é obrigatória'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      image: form.image.trim(),
      inStock: form.inStock,
      featured: form.featured,
    })
    router.push('/admin/produtos')
  }

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors[field] ? 'border-red-400' : 'border-gray-200'}`

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-700">Informações básicas</h2>

            <Field label="Nome do produto *" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Ex: Ração Golden Adulto 15kg"
                className={inputClass('name')}
              />
            </Field>

            <Field label="Descrição *" error={errors.description}>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Descreva o produto em detalhes..."
                rows={4}
                className={`${inputClass('description')} resize-none`}
              />
            </Field>

            <Field label="Categoria *" error={errors.category}>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value as Category)}
                className={inputClass('category')}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-700">Preços</h2>

            <Field label="Preço de venda (R$) *" error={errors.price}>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0,00"
                className={inputClass('price')}
              />
            </Field>

            <Field label="Preço original (opcional — para exibir desconto)" error={errors.originalPrice}>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.originalPrice}
                onChange={e => set('originalPrice', e.target.value)}
                placeholder="0,00"
                className={inputClass('originalPrice')}
              />
            </Field>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-700">Imagem</h2>

            <Field label="URL da imagem *" error={errors.image}>
              <input
                type="url"
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="https://..."
                className={inputClass('image')}
              />
            </Field>

            {form.image && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={form.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="400px"
                  onError={() => {}}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-700">Configurações</h2>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-700">Em estoque</p>
                <p className="text-xs text-gray-400">Produto disponível para compra</p>
              </div>
              <button
                type="button"
                onClick={() => set('inStock', !form.inStock)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.inStock ? 'bg-green-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.inStock ? 'left-6' : 'left-1'}`} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-700">Produto em destaque</p>
                <p className="text-xs text-gray-400">Aparece na homepage</p>
              </div>
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.featured ? 'left-6' : 'left-1'}`} />
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            <Save className="w-5 h-5" /> Salvar Produto
          </button>
        </div>
      </form>
    </div>
  )
}
