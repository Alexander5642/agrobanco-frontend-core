import { Bell, LogOut } from 'lucide-react'
import { logoutUser } from '@/lib/localAuth'
import { redirect } from 'next/navigation'

export default async function Header() {
  async function signOut() {
    'use server'
    await logoutUser()
    redirect('/login')
  }

  return (
    <header className="bg-white border-b border-gray-100 h-20 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Banca por Internet</h2>
        <p className="text-sm text-gray-500">Bienvenido a tu portal seguro</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-brand transition-colors rounded-full hover:bg-gray-50">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <form action={signOut}>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium">
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </form>
      </div>
    </header>
  )
}
