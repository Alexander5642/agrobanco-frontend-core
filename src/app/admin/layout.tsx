import { Leaf, Users, FileText, LogOut, Activity, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { getUser, logoutUser } from '@/lib/localAuth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getUser()
  
  // 1. Verificación de Autenticación
  if (!user) redirect('/login')

  // 2. Verificación Centralizada de Rol ADMIN
  if (user.rol !== 'ADMIN') redirect('/') // Redirige a vista usuario si no es admin

  async function signOutAdmin() {
    'use server'
    await logoutUser()
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-brand p-2 rounded-lg">
              <img src="/logo.png" alt="Agrobanco Logo" className="w-5 h-5 text-white object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">Agrobanco</h1>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">BackOffice</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-white/40 px-6 mb-2 uppercase tracking-wider">Principal</p>
          
          <div className="px-3 mb-4">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <LayoutDashboard className="w-4 h-4 group-hover:text-brand" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>
          </div>

          <p className="text-[10px] font-bold text-white/40 px-6 mb-2 uppercase tracking-wider">Otorgamiento de Créditos</p>
          
          <div className="px-3 mb-4 flex flex-col gap-1">
            <Link href="/admin/solicitudes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <FileText className="w-4 h-4 group-hover:text-brand" />
              <span className="font-medium text-sm">Bandeja de solicitudes</span>
            </Link>
            <Link href="/admin/solicitudes/pre" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <span className="w-4 h-4 flex items-center justify-center text-xs opacity-50">1.</span>
              <span className="font-medium text-sm">Pre-solicitud</span>
            </Link>
            <Link href="/admin/solicitudes/registro" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <span className="w-4 h-4 flex items-center justify-center text-xs opacity-50">2.</span>
              <span className="font-medium text-sm">Registro de solicitud</span>
            </Link>
            <Link href="/admin/comite" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Users className="w-4 h-4 group-hover:text-brand" />
              <span className="font-medium text-sm">3. Propuesta y comité</span>
            </Link>
            <Link href="/admin/desembolsos" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Activity className="w-4 h-4 group-hover:text-brand" />
              <span className="font-medium text-sm">4. Aprobación y desembolso</span>
            </Link>
            <Link href="/admin/mora" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <span className="w-4 h-4 flex items-center justify-center text-xs opacity-50">5.</span>
              <span className="font-medium text-sm">Mora y recuperación</span>
            </Link>
          </div>

          <p className="text-[10px] font-bold text-white/40 px-6 mb-2 uppercase tracking-wider">Recuperaciones</p>
          <div className="px-3 mb-4">
            <Link href="/admin/mora" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Activity className="w-4 h-4 group-hover:text-red-400" />
              <span className="font-medium text-sm text-red-100">Bandeja de mora</span>
            </Link>
          </div>

          <p className="text-[10px] font-bold text-white/40 px-6 mb-2 mt-4 uppercase tracking-wider">Auditoría y Atención</p>
          <div className="px-3 flex flex-col gap-1">
            <Link href="/admin/auditoria-global" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Activity className="w-4 h-4 group-hover:text-green-400" />
              <span className="font-medium text-sm text-green-100">Auditoría Global</span>
            </Link>
            <Link href="/admin/atencion" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Users className="w-4 h-4 group-hover:text-blue-400" />
              <span className="font-medium text-sm text-blue-100">Bandeja PQR (Portal Web)</span>
            </Link>
            <Link href="/admin/transferencias" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white group">
              <Activity className="w-4 h-4 group-hover:text-brand" />
              <span className="font-medium text-sm">Transferencias</span>
            </Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
           <h2 className="font-bold text-gray-900">Portal de Administrador</h2>
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold">A</div>
               <div>
                 <p className="text-sm font-bold text-gray-900">Admin</p>
                 <p className="text-xs text-gray-500">gerencia@agrobanco.pe</p>
               </div>
             </div>
             <form action={signOutAdmin}>
               <button className="flex items-center justify-center p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
                 <LogOut className="w-5 h-5" />
               </button>
             </form>
           </div>
        </header>
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
