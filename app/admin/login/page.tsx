'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PawPrint, Loader2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      // Mensagem real do Supabase para facilitar diagnóstico
      const msg = authError.message.toLowerCase()
      if (msg.includes('email not confirmed')) {
        setError('E-mail não confirmado. Vá em Supabase → Authentication → Users, clique no usuário e confirme o e-mail manualmente.')
      } else if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
        setError('E-mail ou senha incorretos.')
      } else {
        setError(`Erro: ${authError.message}`)
      }
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-[#0F766E] rounded-2xl items-center justify-center shadow-lg mb-4">
            <PawPrint className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            Aviário <span className="text-[#0F766E]">Belga</span>
          </h1>
          <p className="text-sm text-[#64748B] mt-1">Área administrativa</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-5">Entrar</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@seusite.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E] bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-md mt-2"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Entrando…</>
                : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#64748B] mt-6">
          Crie o usuário admin em{' '}
          <span className="font-medium text-[#0F172A]">
            Supabase Dashboard → Authentication → Users
          </span>
        </p>
      </div>
    </div>
  )
}
