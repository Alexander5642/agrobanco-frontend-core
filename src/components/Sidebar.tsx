'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, LayoutDashboard, Wallet, CreditCard, ArrowRightLeft, Activity, User, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Resumen de Productos', href: '/resumen', icon: LayoutDashboard },
  { name: 'Mis Ahorros', href: '/ahorros', icon: Wallet },
  { name: 'Mis Créditos', href: '/creditos', icon: CreditCard },
  { name: 'Movimientos', href: '/movimientos', icon: Activity },
  { name: 'Transferencias', href: '/transferencias', icon: ArrowRightLeft },
  { name: 'Inscripción de Cuentas', href: '/inscripcion', icon: CreditCard },
  { name: 'Pagos (PSE y Facturas)', href: '/pagos', icon: Wallet },
  { name: 'Modificaciones de Seguridad', href: '/seguridad', icon: Activity },
  { name: 'Atención al Cliente', href: '/soporte', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="bg-brand p-6 text-white flex items-center gap-3">
        <Leaf className="w-6 h-6 text-brand-accent" />
        <div>
          <h1 className="font-bold text-lg leading-tight">Agrobanco</h1>
          <p className="text-xs text-brand-accent opacity-90">Banca Digital</p>
        </div>
      </div>

      <div className="flex-1 py-6">
        <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Menú Principal
        </p>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-green-50 text-brand'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4">
          Configuración
        </p>
        <nav className="px-4">
          <Link
            href="/perfil"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <User className="w-5 h-5 text-gray-400" />
            Mi Perfil
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">Alexander Benites</p>
              <p className="text-xs text-gray-500 truncate">Cliente Premium</p>
            </div>
          </div>
          <button 
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
