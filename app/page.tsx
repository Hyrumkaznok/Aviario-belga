'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ShoppingCart, Truck, Shield, Star, ArrowRight,
  BadgeCheck, Sparkles, Users, Award,
  Dog, Cat, Bird, Fish, Package,
  ChevronDown, ChevronUp, Quote,
} from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/context/ProductsContext'
import { Category } from '@/types'

/* ─── Dados estáticos ─────────────────────────── */

const CATEGORIES = [
  {
    key: 'cachorros' as Category,
    label: 'Cachorros',
    desc: 'Ração, acessórios e higiene',
    icon: Dog,
  },
  {
    key: 'gatos' as Category,
    label: 'Gatos',
    desc: 'Areia, ração e arranhadores',
    icon: Cat,
  },
  {
    key: 'passaros' as Category,
    label: 'Pássaros',
    desc: 'Sementes, gaiolas e poleiros',
    icon: Bird,
  },
  {
    key: 'peixes' as Category,
    label: 'Peixes',
    desc: 'Aquários, rações e decoração',
    icon: Fish,
  },
  {
    key: 'outros' as Category,
    label: 'Outros',
    desc: 'Hamsters, coelhos e mais',
    icon: Package,
  },
]

const BENEFITS = [
  {
    icon: Truck,
    title: 'Entrega rápida',
    desc: 'Receba no conforto da sua casa na sua cidade.',
  },
  {
    icon: BadgeCheck,
    title: 'Produtos originais',
    desc: 'Todos os produtos têm procedência e garantia.',
  },
  {
    icon: Sparkles,
    title: 'Seleção premium',
    desc: 'Curadoria especial das melhores marcas do mercado.',
  },
  {
    icon: Shield,
    title: 'Compra segura',
    desc: 'Pedidos direto pelo WhatsApp, sem burocracia.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Ana Souza',
    role: 'Tutora do Thor, Labrador',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    text: 'Compro ração e acessórios para o meu Labrador aqui há mais de um ano. Atendimento incrível, entrega pontual e os produtos são sempre de primeira qualidade!',
    stars: 5,
  },
  {
    name: 'Carlos Lima',
    role: 'Aquarista apaixonado',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    text: 'Encontrei tudo para o meu aquário em um só lugar. Preços justos e o atendimento pelo WhatsApp é super rápido. Recomendo muito!',
    stars: 5,
  },
  {
    name: 'Mariana Costa',
    role: 'Tutora de calopsitas',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    text: 'Meus pássaros adoram as sementes daqui. A variedade de produtos é enorme e o atendimento personalizado faz toda a diferença. Voltarei sempre!',
    stars: 5,
  },
]

const BRANDS = [
  'Royal Canin', 'Golden', 'Pedigree', 'Whiskas', 'Tetra', 'Sera',
]

const FAQ_ITEMS = [
  {
    q: 'Qual é o prazo de entrega?',
    a: 'Entregamos na região em até 24 horas úteis após a confirmação do pedido. Para bairros mais distantes, o prazo pode ser de 48 horas.',
  },
  {
    q: 'Como faço meu pedido pelo WhatsApp?',
    a: 'É simples! Monte seu carrinho no site, depois clique em "Finalizar pelo WhatsApp". Vamos receber seu pedido completo e confirmar os detalhes de entrega diretamente por lá.',
  },
  {
    q: 'Os produtos têm garantia?',
    a: 'Sim! Todos os nossos produtos são originais e possuem garantia do fabricante. Em caso de problemas, entre em contato conosco pelo WhatsApp.',
  },
  {
    q: 'Vocês entregam em toda a cidade?',
    a: 'Atendemos São Paulo e grande parte da Grande São Paulo. Para confirmar se entregamos no seu endereço, fale conosco no WhatsApp.',
  },
  {
    q: 'Posso trocar ou devolver um produto?',
    a: 'Sim! Aceitamos trocas e devoluções em até 7 dias corridos após o recebimento, desde que o produto esteja em perfeitas condições e na embalagem original.',
  },
]

/* ─── Componente de FAQ ───────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <span className="font-semibold text-[#0F172A] text-sm md:text-base pr-4">{q}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-[#0F766E] shrink-0" />
          : <ChevronDown className="w-5 h-5 text-[#64748B] shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#64748B] leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

/* ─── Página principal ────────────────────────── */

export default function HomePage() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured && p.inStock).slice(0, 8)

  return (
    <div>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] flex items-center">
        {/* Imagem de fundo */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=700&fit=crop"
            alt="Pets felizes"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#134E4A]/70 to-[#0F172A]/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 w-full">
          <p className="animate-fade-in text-[#F59E0B] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Pet Shop de Confiança
          </p>
          <h1 className="animate-slide-up text-4xl md:text-6xl font-bold leading-tight text-white mb-5 max-w-2xl">
            Tudo que seu pet<br />
            <span className="text-[#F59E0B]">precisa, aqui.</span>
          </h1>
          <p className="animate-slide-up animate-delay-100 text-slate-300 text-lg mb-10 max-w-lg leading-relaxed">
            Ração, acessórios e higiene para cães, gatos, pássaros e muito mais. Peça pelo WhatsApp e receba em casa.
          </p>
          <div className="animate-slide-up animate-delay-200 flex flex-wrap gap-3">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-teal-900/40 hover:-translate-y-0.5"
            >
              Ver produtos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/carrinho"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" /> Meu carrinho
            </Link>
          </div>

          {/* Badges de social proof */}
          <div className="animate-fade-in animate-delay-300 flex flex-wrap gap-4 mt-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/10">
              <Users className="w-4 h-4 text-[#F59E0B]" />
              +500 clientes satisfeitos
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/10">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              Produtos originais e garantidos
            </div>
          </div>
        </div>
      </section>

      {/* ── Barra de benefícios ───────────────────── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-gray-100">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 px-4 first:pl-0 last:pr-0">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#0F766E]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[#0F172A]">{title}</p>
                <p className="text-xs text-[#64748B] leading-snug">{desc}</p>
              </div>
              <p className="sm:hidden text-xs font-semibold text-[#0F172A]">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categorias ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-[#0F766E] font-semibold text-xs uppercase tracking-widest mb-2">Explore</p>
          <h2 className="text-3xl font-bold text-[#0F172A]">Compre por categoria</h2>
          <p className="text-[#64748B] mt-2">Encontre exatamente o que seu pet precisa</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(({ key, label, desc, icon: Icon }) => (
            <Link
              key={key}
              href={`/produtos?categoria=${key}`}
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-teal-100/60 hover:-translate-y-1.5 hover:border-teal-200 transition-all duration-300 p-5 flex flex-col gap-3"
            >
              <div className="w-11 h-11 bg-teal-50 group-hover:bg-[#0F766E] rounded-xl flex items-center justify-center transition-colors duration-300">
                <Icon className="w-5 h-5 text-[#0F766E] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#0F172A] group-hover:text-[#0F766E] transition-colors">{label}</p>
                <p className="text-xs text-[#64748B] mt-0.5 leading-snug">{desc}</p>
              </div>
              <span className="text-xs font-semibold text-[#0F766E] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                Ver produtos <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Produtos em destaque ─────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#0F766E] font-semibold text-xs uppercase tracking-widest mb-2">Destaques</p>
              <h2 className="text-3xl font-bold text-[#0F172A]">Produtos em destaque</h2>
              <p className="text-[#64748B] mt-1">Seleção especial para o seu pet</p>
            </div>
            <Link
              href="/produtos"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-[#134E4A] transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#64748B] border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="font-semibold text-[#0F172A]">Nenhum produto cadastrado ainda.</p>
              <Link href="/admin/produtos" className="text-[#0F766E] hover:underline text-sm mt-2 inline-block">
                Cadastrar produtos no admin
              </Link>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-[#0F766E] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#134E4A] transition-colors"
            >
              Ver todos os produtos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Depoimentos ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[#0F766E] font-semibold text-xs uppercase tracking-widest mb-2">Clientes</p>
          <h2 className="text-3xl font-bold text-[#0F172A]">O que nossos clientes dizem</h2>
          <p className="text-[#64748B] mt-2">A satisfação dos pets e dos tutores é nossa prioridade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, photo, text, stars }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-teal-100" />

              {/* Text */}
              <p className="text-sm text-[#64748B] leading-relaxed flex-1 -mt-2">
                {text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={photo} alt={name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{name}</p>
                  <p className="text-xs text-[#64748B]">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Por que escolher a gente ─────────────── */}
      <section className="bg-[#134E4A] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-[#F59E0B] font-semibold text-xs uppercase tracking-widest mb-2">Nossos diferenciais</p>
            <h2 className="text-3xl font-bold text-white">Por que escolher o Aviário Belga?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award,      title: 'Experiência',       desc: 'Anos cuidando dos pets da nossa comunidade com dedicação e carinho.' },
              { icon: BadgeCheck, title: 'Qualidade garantida', desc: 'Apenas produtos originais das melhores marcas do mercado pet.' },
              { icon: Truck,      title: 'Entrega local',      desc: 'Entregamos rapidamente na sua cidade com praticidade.' },
              { icon: Sparkles,   title: 'Atendimento humano', desc: 'Suporte personalizado via WhatsApp para tirar qualquer dúvida.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-200">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marcas parceiras ─────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-8">
            Marcas que trabalhamos
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {BRANDS.map(brand => (
              <span
                key={brand}
                className="text-lg font-bold text-gray-300 hover:text-[#0F766E] transition-colors duration-200 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[#0F766E] font-semibold text-xs uppercase tracking-widest mb-2">Dúvidas</p>
          <h2 className="text-3xl font-bold text-[#0F172A]">Perguntas frequentes</h2>
          <p className="text-[#64748B] mt-2">Tudo que você precisa saber antes de comprar</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map(item => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── CTA WhatsApp ─────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0F766E] to-[#134E4A] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-teal-300 font-semibold text-xs uppercase tracking-widest mb-3">Peça agora</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para fazer o pedido?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Monte seu carrinho, informe seu nome e endereço e finalize direto no WhatsApp. Rápido, fácil e sem burocracia.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/30 hover:-translate-y-0.5"
            >
              <Star className="w-5 h-5" /> Começar a comprar
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
