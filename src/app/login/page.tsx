'use client'

import { useState, Suspense } from 'react'
import { Shield, Briefcase, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { login } from './actions'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Logo */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="w-14 h-14 bg-[#eab308] rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <Briefcase className="w-7 h-7 text-[#001f11]" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>CoreFinanciero</h1>
        <p className="text-[#eab308] text-xs font-bold tracking-[0.2em] mt-1 uppercase">Agrobanco Perú</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#001f11]/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-[#004a2d] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        {/* Decorative subtle glow inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#004a2d]/20 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {/* Security Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
              <span className="text-[10px] font-bold text-[#10b981] tracking-widest uppercase">Seguridad Bancaria Estricta</span>
            </div>
            <Shield className="w-5 h-5 text-[#eab308]" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>Control de Acceso</h2>
          <p className="text-sm text-gray-400 mb-8 font-medium">Ingresa tus credenciales autorizadas y contraseña cifrada.</p>

          <form action={login} className="flex flex-col gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Código de Empleado / Correo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#00140a] border border-[#003d25] rounded-2xl focus:ring-2 focus:ring-[#eab308] focus:border-[#eab308] outline-none transition-all text-white font-medium placeholder-gray-600"
                  placeholder="Ej. admin@agrobanco.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Shield className="w-[18px] h-[18px] text-gray-500" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-[#00140a] border border-[#003d25] rounded-2xl focus:ring-2 focus:ring-[#eab308] focus:border-[#eab308] outline-none transition-all text-white font-medium tracking-widest placeholder-gray-600"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#eab308] hover:bg-[#facc15] text-[#001f11] font-bold text-lg py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2 mt-4 group"
            >
              Ingresar al Core
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-500 mt-8 max-w-xs mx-auto leading-relaxed">
            Acceso restringido exclusivamente a personal autorizado de <strong className="text-gray-300">Agrobanco</strong>. Todo ingreso es auditado.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#002213] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#003b22] to-[#00140a] flex items-center justify-center p-4 relative">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#008c4a] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-[#eab308] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full">
        <Suspense fallback={<div className="p-8 text-center text-white">Cargando seguridad...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
