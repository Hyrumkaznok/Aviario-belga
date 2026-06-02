'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, PawPrint } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { href: '/',                              label: 'Início'    },
  { href: '/produtos',                      label: 'Produtos'  },
  { href: '/produtos?categoria=cachorros',  label: 'Cachorros' },
  { href: '/produtos?categoria=gatos',      label: 'Gatos'     },
  { href: '/produtos?categoria=passaros',   label: 'Pássaros'  },
  { href: '/produtos?categoria=peixes',     label: 'Peixes'    },
]

const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  { href: '/admin', label: '⚙️ Admin' },
]

export default function Header() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl shrink-0 group">
            <div className="w-9 h-9 bg-[#0F766E] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#134E4A] transition-colors duration-200">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#0F172A] tracking-tight">
              Aviário <span className="text-[#0F766E]">Belga</span>
            </span>
          </Link>

          {/* Desktop Nav — absolutamente centralizada */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3.5 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F766E] hover:bg-teal-50 rounded-lg transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Ações direitas */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/carrinho"
              className="relative flex items-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-200 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#0F172A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none shadow-sm">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            <Link
              href="/admin"
              className="hidden sm:flex items-center text-xs font-medium text-[#64748B] hover:text-[#0F766E] border border-gray-200 hover:border-teal-300 px-3 py-2 rounded-xl transition-all duration-200"
            >
              Admin
            </Link>

            <button
              className="md:hidden p-2 text-[#64748B] hover:text-[#0F766E] rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            {MOBILE_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#0F172A] hover:text-[#0F766E] hover:bg-teal-50 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
