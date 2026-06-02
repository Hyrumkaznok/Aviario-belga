import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ProductsProvider } from '@/context/ProductsContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Aviário Belga — Tudo para seu pet',
  description: 'Pet shop com produtos para cães, gatos, pássaros, peixes e muito mais. Peça pelo WhatsApp e receba em casa!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <ProductsProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
