'use client'

import { useState, useEffect, Suspense } from 'react'
import { Leaf, ShieldCheck, Delete, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { login } from './actions'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keypad, setKeypad] = useState<number[]>([])

  // Mezclar teclado virtual al cargar
  useEffect(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]
    }
    setKeypad(numbers)
  }, [])

  const handleKeyPress = (num: number) => {
    setPassword(prev => prev + num.toString())
  }

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    setPassword('')
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3 mb-8 lg:hidden">
        <Leaf className="w-8 h-8 text-[#008c4a]" />
        <h1 className="font-bold text-2xl text-[#006132]">Agrobanco</h1>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Ingreso Seguro</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008c4a]" /> Validado por Soft Token
          </p>
        </div>

        <form action={login} className="flex flex-col gap-6">
          {/* Selector de Documento Simulando Banco Real */}
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Tipo</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008c4a] focus:bg-white outline-none transition-all appearance-none font-medium text-gray-700">
                <option>CC</option>
                <option>CE</option>
                <option>NIT</option>
              </select>
            </div>
            <div className="w-2/3">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Usuario / Correo
              </label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008c4a] focus:bg-white outline-none transition-all font-medium"
                placeholder="Ingrese su documento o usuario"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Clave Virtual
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008c4a] focus:bg-white outline-none transition-all font-medium text-2xl tracking-widest text-center"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <div className="w-px h-6 bg-gray-200"></div>
                <button type="button" onClick={handleClear} className="text-xs text-gray-400 hover:text-gray-600 font-semibold uppercase">Limpiar</button>
              </div>
            </div>
            
            {/* Teclado Virtual Numérico Aleatorio */}
            <div className="mt-4 bg-gray-100 p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-center text-gray-500 mb-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Use el teclado virtual para proteger su clave
              </p>
              <div className="grid grid-cols-3 gap-2">
                {keypad.map((num, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleKeyPress(num)}
                    className="bg-white hover:bg-[#008c4a] hover:text-white text-gray-800 font-bold py-3 rounded-lg shadow-sm border border-gray-200 transition-colors text-lg"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleDelete}
                  className="col-span-2 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 font-bold py-3 rounded-lg shadow-sm border border-gray-300 transition-colors flex items-center justify-center"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#008c4a] hover:bg-[#006132] text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 mt-2"
          >
            Ingresar
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
         <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-semibold text-gray-500 mb-6 border border-gray-200">
           <ShieldCheck className="w-4 h-4 text-gray-400" /> Sitio Verificado y Protegido
         </div>
         <p className="text-sm text-gray-600">
           ¿No tienes cuenta?{' '}
           <Link href="/registro" className="text-[#008c4a] font-bold hover:underline">
             Regístrate aquí
           </Link>
         </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen relative">
      {/* Botón Flotante Volver al Inicio */}
      <a 
        href="/" 
        className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 px-5 py-3 rounded-xl shadow-lg border border-gray-200 hover:border-[#008c4a] hover:text-[#008c4a] transition-all group cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        Volver a la Web Principal
      </a>

      {/* Lado izquierdo - Decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#006132] flex-col justify-center items-center relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute transform rotate-45 -left-1/4 -top-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <Leaf className="w-20 h-20 mx-auto mb-8 text-[#a3d977]" />
          <h2 className="text-4xl font-bold mb-4">Bienvenido a tu<br/>Banca Virtual</h2>
          <p className="text-lg text-white/80 max-w-md mx-auto">
            Transacciones seguras, rápidas y al alcance de tu mano. Agrobanco te acompaña en cada paso.
          </p>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-4 sm:p-12">
        <Suspense fallback={<div className="p-8 text-center">Cargando módulo de seguridad...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
