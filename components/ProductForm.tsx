'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Save, ArrowLeft, Upload, Link2, Loader2, ImageOff } from 'lucide-react'
import { Product, Category } from '@/types'
import { CATEGORY_LABELS } from '@/lib/products'
import { supabase } from '@/lib/supabase'

const CATEGORIES: Category[] = ['cachorros', 'gatos', 'passaros', 'peixes', 'outros']

interface Props {
  initial?: Product
  onSave:  (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>
  title:   string
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function Toggle({
  value, onChange, labelOn, labelOff, color = 'bg-[#0F766E]',
}: {
  value: boolean
  onChange: () => void
  labelOn: string
  labelOff: string
  color?: string
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-[#0F172A]">
        {value ? labelOn : labelOff}
      </span>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? color : 'bg-gray-200'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </label>
  )
}

export default function ProductForm({ initial, onSave, title }: Props) {
  const router = useRouter()

  const [form, setForm] = useState({
    name:          initial?.name          || '',
    description:   initial?.description   || '',
    price:         initial?.price?.toString()         || '',
    originalPrice: initial?.originalPrice?.toString() || '',
    category:      (initial?.category     || 'cachorros') as Category,
    image:         initial?.image         || '',
    inStock:       initial?.inStock  ?? true,
    featured:      initial?.featured ?? false,
  })

  const [errors,     setErrors]     = useState<Record<string, string>>({})
  const [saving,     setSaving]     = useState(false)
  const [uploading,  setUploading]  = useState(false)
  const [imageMode,  setImageMode]  = useState<'upload' | 'url'>(
    initial?.image ? 'url' : 'upload'
  )
  const [imgError,   setImgError]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  /* ─── Field helpers ─────────────────────────── */

  const set = (key: string, value: string | boolean | Category) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E] bg-white ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  /* ─── Image upload ──────────────────────────── */

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setErrors(er => { const n = { ...er }; delete n.image; return n })
    setImgError(false)

    try {
      const ext  = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `products/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(path)

      setForm(f => ({ ...f, image: data.publicUrl }))
    } catch {
      setErrors(er => ({ ...er, image: 'Erro ao fazer upload. Verifique o bucket no Supabase.' }))
    } finally {
      setUploading(false)
    }
  }

  /* ─── Validation ────────────────────────────── */

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())                                                  e.name = 'Nome é obrigatório'
    if (!form.description.trim())                                           e.description = 'Descrição é obrigatória'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Preço inválido'
    if (form.originalPrice && (isNaN(Number(form.originalPrice)) || Number(form.originalPrice) <= 0))
      e.originalPrice = 'Preço original inválido'
    if (!form.image.trim())                                                 e.image = 'Imagem é obrigatória'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ─── Submit ────────────────────────────────── */

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await onSave({
        name:          form.name.trim(),
        description:   form.description.trim(),
        price:         Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        category:      form.category,
        image:         form.image.trim(),
        inStock:       form.inStock,
        featured:      form.featured,
      })
      router.push('/admin/produtos')
    } catch (err) {
      console.error('[ProductForm] Erro ao salvar produto:', err)
      const msg = err instanceof Error ? err.message : String(err)
      setErrors(er => ({ ...er, submit: `Erro ao salvar: ${msg}` }))
      setSaving(false)
    }
  }

  /* ─── Render ────────────────────────────────── */

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h1 className="text-2xl font-bold text-[#0F172A]">{title}</h1>
      </div>

      {errors.submit && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        {/* ── Coluna esquerda ── */}
        <div className="space-y-4">

          {/* Informações básicas */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-[#0F172A]">Informações básicas</h2>

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

          {/* Preços */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-[#0F172A]">Preços</h2>

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

            <Field label="Preço original (opcional — mostra desconto)" error={errors.originalPrice}>
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

        {/* ── Coluna direita ── */}
        <div className="space-y-4">

          {/* Imagem */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#0F172A]">Imagem</h2>
              {/* Toggle upload / URL */}
              <div className="flex text-xs font-medium rounded-lg border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    imageMode === 'upload' ? 'bg-[#0F766E] text-white' : 'text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-3 h-3" /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    imageMode === 'url' ? 'bg-[#0F766E] text-white' : 'text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  <Link2 className="w-3 h-3" /> URL
                </button>
              </div>
            </div>

            {imageMode === 'upload' ? (
              <div>
                {/* Drop zone */}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-[#0F766E] rounded-xl py-8 flex flex-col items-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin" />
                      <p className="text-sm text-[#64748B]">Enviando imagem…</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-300" />
                      <p className="text-sm font-medium text-[#0F172A]">Clique para escolher uma imagem</p>
                      <p className="text-xs text-[#64748B]">JPG, PNG ou WebP — máx. 5 MB</p>
                    </>
                  )}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
              </div>
            ) : (
              <Field label="URL da imagem *" error={errors.image}>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => {
                    set('image', e.target.value)
                    setImgError(false)
                  }}
                  placeholder="https://..."
                  className={inputClass('image')}
                />
              </Field>
            )}

            {/* Preview */}
            {form.image && !imgError && (
              <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src={form.image}
                  alt="Pré-visualização"
                  fill
                  className="object-cover"
                  sizes="400px"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
            {form.image && imgError && (
              <div className="w-full h-24 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center gap-1 text-[#64748B]">
                <ImageOff className="w-5 h-5" />
                <p className="text-xs">Não foi possível carregar a imagem</p>
              </div>
            )}
          </div>

          {/* Configurações */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-[#0F172A]">Configurações</h2>

            <Toggle
              value={form.inStock}
              onChange={() => set('inStock', !form.inStock)}
              labelOn="Em estoque"
              labelOff="Sem estoque"
            />
            <p className="text-xs text-[#64748B] -mt-2">
              {form.inStock ? 'Produto disponível para compra' : 'Produto indisponível no momento'}
            </p>

            <div className="border-t border-gray-100 pt-4">
              <Toggle
                value={form.featured}
                onChange={() => set('featured', !form.featured)}
                labelOn="Produto em destaque"
                labelOff="Sem destaque"
                color="bg-[#F59E0B]"
              />
              <p className="text-xs text-[#64748B] mt-1">
                {form.featured ? 'Aparece na seção de destaques da homepage' : 'Não aparece nos destaques'}
              </p>
            </div>
          </div>

          {/* Salvar */}
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            {saving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Salvando…</>
            ) : (
              <><Save className="w-5 h-5" /> Salvar Produto</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
