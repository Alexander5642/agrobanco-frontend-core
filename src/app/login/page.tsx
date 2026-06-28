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

const CAROUSEL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Cultivamos el Futuro del Perú',
    description: 'Financiamiento hecho a la medida para los agricultores y ganaderos peruanos.'
  },
  {
    image: 'https://images.unsplash.com/photo-1559884743-74a57598c6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Impulso a la Microempresa',
    description: 'Créditos rápidos y seguros para que tu negocio nunca deje de crecer.'
  },
  {
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Banca Virtual Segura',
    description: 'Transacciones 100% protegidas desde cualquier lugar, las 24 horas del día.'
  }
];

function LoginCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative">
      {CAROUSEL_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            {/* Gradiente oscuro para que el texto sea legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <Leaf className="w-16 h-16 text-[#a3d977] mb-6 drop-shadow-md" />
            <h2 className="text-4xl font-bold mb-4 drop-shadow-md">{slide.title}</h2>
            <p className="text-lg text-white/90 drop-shadow max-w-md">
              {slide.description}
            </p>
          </div>
        </div>
      ))}
      
      {/* Indicadores del Carrusel */}
      <div className="absolute bottom-6 left-12 z-20 flex gap-2">
        {CAROUSEL_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? 'bg-[#a3d977] w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
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

      {/* Lado izquierdo - Carrusel Automático */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#006132] flex-col justify-center items-center relative overflow-hidden">
        <LoginCarousel />
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
