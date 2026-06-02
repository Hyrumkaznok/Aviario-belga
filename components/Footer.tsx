import Link from 'next/link'
import { PawPrint, Phone, MapPin, Clock, Mail } from 'lucide-react'

const CATEGORIES = [
  { href: '/produtos?categoria=cachorros', label: 'Cachorros' },
  { href: '/produtos?categoria=gatos',     label: 'Gatos'     },
  { href: '/produtos?categoria=passaros',  label: 'Pássaros'  },
  { href: '/produtos?categoria=peixes',    label: 'Peixes'    },
  { href: '/produtos?categoria=outros',    label: 'Outros'    },
]

const LINKS = [
  { href: '/',        label: 'Início'   },
  { href: '/produtos', label: 'Produtos' },
  { href: '/carrinho', label: 'Carrinho' },
  { href: '/admin',    label: 'Admin'    },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Marca */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="w-9 h-9 bg-[#0F766E] rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Aviário <span className="text-[#F59E0B]">Belga</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Tudo que seu pet precisa com amor e qualidade. Produtos selecionados para cães, gatos, pássaros e muito mais.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 bg-white/5 hover:bg-[#0F766E] border border-white/10 hover:border-[#0F766E] rounded-lg flex items-center justify-center transition-all duration-200 text-xs font-bold text-white"
            >
              IG
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 bg-white/5 hover:bg-[#0F766E] border border-white/10 hover:border-[#0F766E] rounded-lg flex items-center justify-center transition-all duration-200 text-xs font-bold text-white"
            >
              FB
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-white/5 hover:bg-[#0F766E] border border-white/10 hover:border-[#0F766E] rounded-lg flex items-center justify-center transition-all duration-200 text-xs font-bold text-white"
            >
              WA
            </a>
          </div>
        </div>

        {/* Categorias */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categorias</h3>
          <ul className="space-y-2.5">
            {CATEGORIES.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:text-[#F59E0B] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 mt-8">Navegação</h3>
          <ul className="space-y-2.5">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:text-[#F59E0B] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contato</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium">(11) 99999-9999</p>
                <p className="text-xs mt-0.5">WhatsApp disponível</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium">contato@aviariobelga.com</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium">Rua dos Animais, 123</p>
                <p className="text-xs mt-0.5">São Paulo, SP</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Horário */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Horário</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <p className="text-white font-medium">Seg — Sex</p>
                <p className="text-xs mt-0.5">8h às 19h</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <p className="text-white font-medium">Sábado</p>
                <p className="text-xs mt-0.5">8h às 17h</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <p className="text-white font-medium">Domingo</p>
                <p className="text-xs mt-0.5">9h às 13h</p>
              </div>
            </li>
          </ul>

          {/* CTA WhatsApp */}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            Fale no WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aviário Belga. Todos os direitos reservados.</p>
          <p>Desenvolvido com ❤️ para os pets</p>
        </div>
      </div>
    </footer>
  )
}
