'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, ShieldCheck, Smartphone, Users, ChevronRight, ChevronLeft, Briefcase, User, GraduationCap, X, CreditCard } from 'lucide-react'

// Simulamos la lógica para el Modal Anti-Phishing
const SafeLink = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Advertencia de Seguridad</h3>
            </div>
            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
              Usted está a punto de ingresar a un sitio externo a esta sede electrónica. El Agrobanco no se hace responsable por el contenido de dicho sitio web.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                Cancelar
              </button>
              <a href={href} className="px-5 py-2.5 bg-[#006132] hover:bg-[#008c4a] text-white rounded-xl font-bold transition-colors">
                Continuar
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function LandingPage() {
  const [audience, setAudience] = useState('productor') // productor, independiente, micro
  const [lang, setLang] = useState<'ES' | 'EN'>('ES')

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* 1. Barra de Herramientas Flotantes (Top Header) */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <Link href="/soporte" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Asistente Anita</span>
            </Link>
            <Link href="/soporte" className="hover:text-white transition-colors">Llamada Virtual / Chat</Link>
            <Link href="/transparencia" className="hover:text-white transition-colors">Transparencia y PQR</Link>
          </div>
          <div>
            <Link href="/registro" className="bg-[#a3d977] text-[#006132] font-bold px-4 py-1 rounded-full hover:bg-white transition-colors flex items-center gap-1">
              Solicita Tu Producto
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Módulo de Puertas de Acceso Transaccional */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="w-10 h-10 text-[#008c4a]" />
            <div>
              <h1 className="font-bold text-2xl text-[#006132] leading-none tracking-tight">Agrobanco</h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">de Colombia</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <SafeLink href="https://www.pse.com.co/" className="hidden md:flex items-center gap-2 border border-[#006132] text-[#006132] hover:bg-green-50 px-5 py-2.5 rounded-lg font-bold transition-all">
              Paga tu crédito aquí PSE
            </SafeLink>
            
            <div className="relative group">
              <button className="bg-[#006132] hover:bg-[#008c4a] text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2">
                Ingresa a la Banca Virtual
              </button>
              {/* Dropdown Banca Virtual */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/login" className="block px-4 py-3 text-gray-700 font-bold hover:bg-gray-50 hover:text-[#006132] border-b border-gray-100">Personas</Link>
                <Link href="/login" className="block px-4 py-3 text-gray-700 font-bold hover:bg-gray-50 hover:text-[#006132]">Empresas</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-[#006132] overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform -rotate-45 right-0 -top-1/4 w-[100%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {lang === 'ES' ? (
              <>Crece con el Banco que <span className="text-[#a3d977]">impulsa tu tierra</span></>
            ) : (
              <>Grow with the Bank that <span className="text-[#a3d977]">drives your land</span></>
            )}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            {lang === 'ES' 
              ? 'Soluciones financieras ágiles y seguras para el campo y la ciudad.' 
              : 'Agile and secure financial solutions for the countryside and the city.'}
          </p>
        </div>
      </section>

      {/* 3. Conmutador de Roles (Audience Switcher) */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative z-20 -mt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setAudience('productor')}
              className={`px-8 py-4 font-bold whitespace-nowrap transition-all border-b-4 ${audience === 'productor' ? 'border-[#008c4a] text-[#006132]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              {lang === 'ES' ? 'Soy productor agropecuario' : 'I am an agricultural producer'}
            </button>
            <button 
              onClick={() => setAudience('independiente')}
              className={`px-8 py-4 font-bold whitespace-nowrap transition-all border-b-4 ${audience === 'independiente' ? 'border-[#008c4a] text-[#006132]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              {lang === 'ES' ? 'Soy asalariado / pensionado' : 'I am a salaried / pensioner'}
            </button>
            <button 
              onClick={() => setAudience('micro')}
              className={`px-8 py-4 font-bold whitespace-nowrap transition-all border-b-4 ${audience === 'micro' ? 'border-[#008c4a] text-[#006132]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
            >
              {lang === 'ES' ? 'Soy microempresario' : 'I am a microentrepreneur'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Núcleo de Navegación por Intenciones ("Quiero...") */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">¿Qué deseas hacer hoy?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Quiero crecer mi actividad productiva', 'Quiero administrar mis recursos', 'Quiero comprar lo que deseo', 'Quiero proteger mi patrimonio'].map((intent, i) => (
              <button key={i} className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#008c4a] hover:text-[#006132] px-6 py-4 rounded-xl font-bold text-gray-700 transition-all">
                {intent}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Carruseles de Productos Dinámicos según el Segmento */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-[#006132]">
              {audience === 'productor' ? 'Financiación y Fomento Rural' : 
               audience === 'micro' ? 'Soluciones para tu Negocio' : 
               'Cuentas, Tarjetas y Seguros'}
            </h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#008c4a] hover:text-white transition-colors"><ChevronLeft className="w-5 h-5"/></button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#008c4a] hover:text-white transition-colors"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PRODUCTOS: Productor */}
            {audience === 'productor' && (
              <>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-[#008c4a] group-hover:scale-110 transition-transform">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Crédito Mujer Rural</h4>
                  <p className="text-gray-600 mb-6 text-sm">Condiciones preferenciales para impulsar los proyectos liderados por mujeres campesinas.</p>
                  <Link href="/registro" className="text-[#008c4a] font-bold flex items-center gap-2 hover:underline">Solicitar ahora <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Fondo IIGRA e ICR</h4>
                  <p className="text-gray-600 mb-6 text-sm">Accede al Incentivo a la Capitalización Rural subsidiado por el Gobierno Nacional.</p>
                  <Link href="/registro" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">Conoce más <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Tarjeta Cacaotera / Palmera</h4>
                  <p className="text-gray-600 mb-6 text-sm">Medio de pago gremial exclusivo. Compra fertilizantes y maquinaria con tasa especial.</p>
                  <Link href="/registro" className="text-orange-600 font-bold flex items-center gap-2 hover:underline">Adquirir tarjeta <ChevronRight className="w-4 h-4" /></Link>
                </div>
              </>
            )}

            {/* PRODUCTOS: Microempresario */}
            {audience === 'micro' && (
              <>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Crédito Capital de Trabajo</h4>
                  <p className="text-gray-600 mb-6 text-sm">Liquidez inmediata para comprar inventario, pagar nómina o expandir tu negocio local.</p>
                  <Link href="/registro" className="text-purple-600 font-bold flex items-center gap-2 hover:underline">Simular crédito <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Recaudo y Datáfonos</h4>
                  <p className="text-gray-600 mb-6 text-sm">Acepta pagos con tarjeta y recibe el dinero en tu cuenta corriente Agrobanco el mismo día.</p>
                  <Link href="/registro" className="text-indigo-600 font-bold flex items-center gap-2 hover:underline">Solicitar datáfono <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Seguro Protección Negocio</h4>
                  <p className="text-gray-600 mb-6 text-sm">Protege tu local comercial contra incendios, robos y eventualidades climáticas.</p>
                  <Link href="/registro" className="text-red-600 font-bold flex items-center gap-2 hover:underline">Cotizar seguro <ChevronRight className="w-4 h-4" /></Link>
                </div>
              </>
            )}

            {/* PRODUCTOS: Independiente / Asalariado */}
            {audience === 'independiente' && (
              <>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-[#008c4a] group-hover:scale-110 transition-transform">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cuenta de Ahorro Activo</h4>
                  <p className="text-gray-600 mb-6 text-sm">Ahorra sin cuota de manejo y retira gratis en toda la red de cajeros Servibanca a nivel nacional.</p>
                  <Link href="/registro" className="text-[#008c4a] font-bold flex items-center gap-2 hover:underline">Abrir cuenta <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Crédito de Libre Inversión</h4>
                  <p className="text-gray-600 mb-6 text-sm">Haz realidad tus proyectos de viaje, remodelación o unifica tus deudas con nosotros.</p>
                  <Link href="/registro" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">Solicitar aquí <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">CDT Tasa Fija</h4>
                  <p className="text-gray-600 mb-6 text-sm">Asegura la rentabilidad de tu dinero desde $1.000.000 COP con las mejores tasas del mercado.</p>
                  <Link href="/registro" className="text-teal-600 font-bold flex items-center gap-2 hover:underline">Invertir ahora <ChevronRight className="w-4 h-4" /></Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5B. Información Legal y Transparencia */}
      <section className="bg-gray-100 py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 text-xs text-gray-600">
          <ShieldCheck className="w-6 h-6 text-gray-400 shrink-0" />
          <p>
            <strong>Aviso Legal (Ley 1328 de 2009):</strong> Las tasas, tarifas y condiciones de los productos agropecuarios están sujetas a la normatividad de FINAGRO y la Superintendencia Financiera de Colombia. El Agrobanco no solicita transferencias a cuentas de terceros para la aprobación de créditos ni subsidios. Verifique siempre que se encuentra en un entorno seguro (https). Los depósitos están cubiertos por el Seguro de Depósitos FOGAFIN.
          </p>
        </div>
      </section>

      {/* 6. Footer Documental y de Seguridad */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-[#a3d977]" />
              <h2 className="font-bold text-2xl text-white">Agrobanco</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">Sede Principal: Calle 16 No. 6-66, Bogotá D.C.<br/>Línea Gratuita: 01 8000 91 5000</p>
            <div className="flex gap-4">
              {/* Logos de vigilancia estáticos text */}
              <span className="text-[10px] uppercase border border-gray-700 p-2 rounded text-gray-500 font-bold">Vigilado Superfinanciera</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Documentación Técnica</h4>
            <ul className="space-y-3 text-sm">
              <li><SafeLink href="/portafolio.pdf" className="hover:text-white transition-colors">Portafolio Ganadero (PDF)</SafeLink></li>
              <li><SafeLink href="/tasas.pdf" className="hover:text-white transition-colors">Tasas y Tarifas 2026</SafeLink></li>
              <li><SafeLink href="/seguridad" className="hover:text-white transition-colors">Políticas de Privacidad</SafeLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Transparencia</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/pqr" className="hover:text-white transition-colors">Módulo PQR</Link></li>
              <li><Link href="/denuncias" className="hover:text-white transition-colors">Línea Transparente Anticorrupción</Link></li>
              <li><Link href="/ley-acceso" className="hover:text-white transition-colors">Ley de Acceso a la Información</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Accesibilidad</h4>
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <span className="text-sm">Alto Contraste</span>
                <div className="w-8 h-4 bg-gray-600 rounded-full relative"><div className="w-4 h-4 bg-gray-400 rounded-full absolute left-0"></div></div>
              </button>
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-gray-800 py-2 rounded-lg text-lg font-bold hover:bg-gray-700">-A</button>
                <button className="flex-1 bg-gray-800 py-2 rounded-lg text-lg font-bold hover:bg-gray-700">+A</button>
              </div>
              <div className="flex gap-2 text-sm mt-2">
                <button 
                  onClick={() => setLang('ES')} 
                  className={`font-bold transition-colors ${lang === 'ES' ? 'text-white border-b border-white' : 'text-gray-500 hover:text-white'}`}
                >
                  ES
                </button>
                <button 
                  onClick={() => setLang('EN')} 
                  className={`font-bold transition-colors ${lang === 'EN' ? 'text-white border-b border-white' : 'text-gray-500 hover:text-white'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Agrobanco. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
