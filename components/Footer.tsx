import Link from 'next/link'
import { PawPrint, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <PawPrint className="w-6 h-6 text-yellow-400" />
            <span>Aviário <span className="text-yellow-400">Belga</span></span>
          </div>
          <p className="text-sm leading-relaxed">
            Tudo que seu pet precisa com amor e qualidade. Produtos selecionados para cães, gatos, pássaros e muito mais!
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">Facebook</a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categorias</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/produtos?categoria=cachorros" className="hover:text-yellow-400 transition-colors">🐶 Cachorros</Link></li>
            <li><Link href="/produtos?categoria=gatos" className="hover:text-yellow-400 transition-colors">🐱 Gatos</Link></li>
            <li><Link href="/produtos?categoria=passaros" className="hover:text-yellow-400 transition-colors">🦜 Pássaros</Link></li>
            <li><Link href="/produtos?categoria=peixes" className="hover:text-yellow-400 transition-colors">🐟 Peixes</Link></li>
            <li><Link href="/produtos?categoria=outros" className="hover:text-yellow-400 transition-colors">🐾 Outros</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contato</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>(11) 99999-9999</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Rua dos Animais, 123 - São Paulo, SP</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-white font-semibold mb-3">Horário</h3>
          <ul className="space-y-1 text-sm">
            <li>Segunda a Sexta: 8h - 19h</li>
            <li>Sábado: 8h - 17h</li>
            <li>Domingo: 9h - 13h</li>
          </ul>
          <Link
            href="/admin"
            className="inline-block mt-4 text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            Área Admin
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Aviário Belga. Todos os direitos reservados.
      </div>
    </footer>
  )
}
