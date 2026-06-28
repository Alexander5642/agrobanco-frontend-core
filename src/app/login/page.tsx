'use client'

import { useState, Suspense, useEffect } from 'react'
import { Shield, Briefcase, ChevronRight, AlertCircle, Eye, EyeOff, Fingerprint, Lock, ShieldCheck, Activity } from 'lucide-react'
import { login } from './actions'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  // Efecto visual de escaneo al enfocar
  const handleFocus = () => setIsScanning(true);
  const handleBlur = () => setIsScanning(false);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Logo */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-[#008c4a] opacity-[0.03] blur-3xl rounded-full w-full h-full"></div>
        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative z-10 group">
          <div className="absolute inset-0 bg-[#008c4a]/10 rounded-[2rem] transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
          <img src="/logo.png" alt="Agrobanco Logo" className="w-10 h-10 object-contain relative z-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#006132] tracking-tight relative z-10">CoreFinanciero</h1>
        <div className="flex items-center gap-2 mt-2 bg-white/60 px-3 py-1 rounded-full border border-gray-200/60 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[#008c4a] text-[10px] font-bold tracking-[0.2em] uppercase">Red Agrobanco Segura</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-gray-200 shadow-2xl relative overflow-hidden group">
        
        {/* Efecto Radar de Seguridad (solo visual) */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Fingerprint className="w-48 h-48" />
        </div>
        
        {isScanning && (
          <div className="absolute left-0 w-full h-0.5 bg-[#008c4a]/50 shadow-[0_0_10px_rgba(0,140,74,0.5)] animate-scan z-20 pointer-events-none"></div>
        )}

        <div className="relative z-10">
          {/* Security Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 bg-[#008c4a]/10 px-4 py-2 rounded-xl border border-[#008c4a]/20">
              <ShieldCheck className="w-4 h-4 text-[#008c4a]" />
              <span className="text-[10px] font-bold text-[#008c4a] tracking-widest uppercase">Conexión Cifrada</span>
            </div>
            <Activity className="w-5 h-5 text-gray-300" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Autenticación</h2>
          <p className="text-sm text-gray-500 mb-8 font-medium">Ingrese sus credenciales de administrador.</p>

          <form action={login} className="flex flex-col gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Correo Corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-focus-within:text-[#008c4a] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#008c4a]/20 focus:border-[#008c4a] outline-none transition-all text-gray-900 font-medium placeholder-gray-400"
                  placeholder="Ej. admin@agrobanco.com.pe"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> Clave de Seguridad
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <span className="text-xl font-serif leading-none text-gray-400 group-focus-within:text-[#008c4a] transition-colors">*</span>
                  </div>
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#008c4a]/20 focus:border-[#008c4a] outline-none transition-all text-gray-900 font-medium tracking-widest placeholder-gray-400"
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
              <div className="flex items-center gap-3 text-red-600 text-sm p-4 bg-red-50 rounded-2xl border border-red-100 font-medium animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#006132] to-[#008c4a] hover:from-[#005029] hover:to-[#007a41] text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(0,140,74,0.2)] hover:shadow-[0_10px_25px_rgba(0,140,74,0.3)] flex items-center justify-center gap-3 mt-4 group overflow-hidden relative"
            >
              {/* Efecto brillo en botón */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-[45deg] group-hover:left-[200%] transition-all duration-700 ease-in-out"></div>
              
              <span>Iniciar Sesión Segura</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-3">
            <Fingerprint className="w-6 h-6 text-gray-300" />
            <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">
              Sistema monitoreado 24/7. El acceso no autorizado está penado por la ley.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* CSS para Animaciones */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -50px) scale(1.1) rotate(5deg); }
          66% { transform: translate(-20px, 20px) scale(0.9) rotate(-5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-30px, 50px) scale(1.2) rotate(-5deg); }
          66% { transform: translate(20px, -20px) scale(0.8) rotate(5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-float-1 { animation: float1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float2 25s ease-in-out infinite; }
        .animate-scan { animation: scan 2s linear infinite; }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 140, 74, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 140, 74, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />

      {/* Textura de Fondo (Cuadrícula Tecnológica) */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>

      {/* Background abstract shapes - Agrobanco Colors with Movements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] bg-[#008c4a] rounded-full filter blur-[120px] opacity-10 animate-float-1"></div>
        <div className="absolute top-[50%] -right-[10%] w-[60%] h-[70%] bg-[#006132] rounded-full filter blur-[150px] opacity-[0.08] animate-float-2"></div>
        <div className="absolute top-[20%] left-[40%] w-[30%] h-[40%] bg-[#eab308] rounded-full filter blur-[100px] opacity-5 animate-float-1" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full">
        <Suspense fallback={<div className="p-8 text-center text-gray-500 font-mono text-sm animate-pulse">Iniciando protocolos de seguridad...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
