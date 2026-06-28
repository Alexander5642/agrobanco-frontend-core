'use client'

import { useState, Suspense } from 'react'
import { Shield, Briefcase, ChevronRight, AlertCircle, Eye, EyeOff, Leaf } from 'lucide-react'
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
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-gray-100">
          <img src="/logo.png" alt="Agrobanco Logo" className="w-8 h-8 text-[#008c4a] object-contain" />
        </div>
        <h1 className="text-3xl font-bold text-[#006132] tracking-tight">CoreFinanciero</h1>
        <p className="text-[#008c4a] text-xs font-bold tracking-[0.2em] mt-1 uppercase">Agrobanco Perú</p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-200 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          {/* Security Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <div className="w-2 h-2 rounded-full bg-[#008c4a] animate-pulse"></div>
              <span className="text-[10px] font-bold text-[#008c4a] tracking-widest uppercase">Seguridad Activa</span>
            </div>
            <Shield className="w-5 h-5 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Control de Acceso</h2>
          <p className="text-sm text-gray-500 mb-8 font-medium">Ingresa tus credenciales autorizadas.</p>

          <form action={login} className="flex flex-col gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Correo Corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#008c4a] focus:bg-white outline-none transition-all text-gray-900 font-medium placeholder-gray-400"
                  placeholder="Ej. admin@agrobanco.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Shield className="w-[18px] h-[18px] text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#008c4a] focus:bg-white outline-none transition-all text-gray-900 font-medium tracking-widest placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#008c4a] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-xs p-3 bg-red-50 rounded-xl border border-red-100 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#006132] hover:bg-[#008c4a] text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4 group"
            >
              Ingresar al Core
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-400 mt-8 max-w-xs mx-auto leading-relaxed">
            Acceso restringido exclusivamente a personal autorizado de <strong className="text-gray-600">Agrobanco</strong>. Todo ingreso es auditado.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* CSS para Animaciones */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.2); }
          66% { transform: translate(20px, -20px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-float-1 { animation: float1 15s ease-in-out infinite; }
        .animate-float-2 { animation: float2 20s ease-in-out infinite; }
        .bg-grid-pattern {
          background-image: radial-gradient(#006132 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}} />

      {/* Textura de Fondo (Puntos sutiles) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      {/* Background abstract shapes - Agrobanco Colors with Movements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] bg-[#a3d977] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-float-1"></div>
        <div className="absolute top-[50%] -right-[10%] w-[60%] h-[70%] bg-[#006132] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-float-2"></div>
        <div className="absolute top-[20%] left-[40%] w-[30%] h-[40%] bg-[#eab308] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-float-1" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full">
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Cargando seguridad...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
