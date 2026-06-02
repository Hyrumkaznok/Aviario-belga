'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, PawPrint } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <PawPrint className="w-7 h-7" />
            <span>Aviário <span className="text-yellow-400">Belga</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Início</Link>
            <Link href="/produtos" className="hover:text-yellow-400 transition-colors">Produtos</Link>
            <Link href="/produtos?categoria=cachorros" className="hover:text-yellow-400 transition-colors">Cachorros</Link>
            <Link href="/produtos?categoria=gatos" className="hover:text-yellow-400 transition-colors">Gatos</Link>
            <Link href="/produtos?categoria=passaros" className="hover:text-yellow-400 transition-colors">Pássaros</Link>
            <Link href="/produtos?categoria=peixes" className="hover:text-yellow-400 transition-colors">Peixes</Link>
          </nav>

          {/* Cart + Admin */}
          <div className="flex items-center gap-3">
            <Link
              href="/carrinho"
              className="relative flex items-center gap-1 bg-white text-green-700 font-bold px-3 py-1.5 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Carrinho</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-xs bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-full transition-colors"
            >
              Admin
            </Link>
            <button
              className="md:hidden p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 border-t border-green-600">
          <nav className="flex flex-col px-4 py-3 gap-3 text-sm font-medium">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Início</Link>
            <Link href="/produtos" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Todos os Produtos</Link>
            <Link href="/produtos?categoria=cachorros" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">🐶 Cachorros</Link>
            <Link href="/produtos?categoria=gatos" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">🐱 Gatos</Link>
            <Link href="/produtos?categoria=passaros" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">🦜 Pássaros</Link>
            <Link href="/produtos?categoria=peixes" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">🐟 Peixes</Link>
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">⚙️ Admin</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
