'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, PawPrint, ArrowLeft, LogOut, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const NAV = [
  { href: '/admin',          label: 'Dashboard', icon: LayoutDashboard, exact: true  },
  { href: '/admin/produtos', label: 'Produtos',  icon: Package,         exact: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [ready,  setReady]  = useState(false)
  const [email,  setEmail]  = useState('')

  // Verifica sessão ativa — redireciona para login se não houver
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login')
      } else {
        setEmail(session.user.email ?? '')
        setReady(true)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.replace('/admin/login')
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  // A página de login NÃO deve ser envolvida pelo layout do admin
  if (pathname === '/admin/login') return <>{children}</>

  // Enquanto verifica a sessão, mostra um spinner neutro
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* Sidebar */}
      <aside className="w-56 bg-[#0F172A] text-white flex flex-col shrink-0">

        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5 font-bold">
            <div className="w-8 h-8 bg-[#0F766E] rounded-xl flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">
              Aviário <span className="text-[#F59E0B]">Admin</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Rodapé da sidebar */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {/* Usuário logado */}
          {email && (
            <p className="px-3 py-1.5 text-xs text-slate-500 truncate">{email}</p>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl">{children}</div>
      </div>
    </div>
  )
}
