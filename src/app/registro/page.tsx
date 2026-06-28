import { signup } from './actions'
import { Leaf, ShieldCheck, User, CreditCard, Phone, Calendar, MapPin, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-brand text-white p-3 rounded-2xl mb-4 shadow-sm">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Apertura de Cuenta</h1>
          <p className="text-gray-500 mt-2">Completa tus datos para unirte a Agrobanco Banca Digital</p>
          
          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <ShieldCheck className="w-4 h-4" /> Tus datos están encriptados de forma segura
          </div>
        </div>

        <form className="flex flex-col gap-8">
          
          {/* SECCIÓN 1: Datos Personales */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">1. Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="nombres" type="text" required placeholder="Ej. Juan Carlos" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="apellidos" type="text" required placeholder="Ej. Pérez Gómez" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="dni" type="text" required maxLength={8} pattern="[0-9]{8}" placeholder="8 dígitos" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="fecha_nacimiento" type="date" required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: Contacto */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">2. Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="celular" type="tel" required placeholder="9 dígitos" maxLength={9} pattern="[0-9]{9}" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Actual</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="direccion" type="text" required placeholder="Ej. Av. Primavera 123, Lima" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-gray-50 focus:bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: Credenciales */}
          <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10">
            <h3 className="text-lg font-bold text-brand-dark mb-4">3. Credenciales de Acceso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="email" type="email" required placeholder="tu@correo.com" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-white shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="password" type="password" required placeholder="Mínimo 6 caracteres" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-colors bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {params?.error && (
            <div className="text-red-600 text-sm p-4 bg-red-50 rounded-xl border border-red-200 flex items-center font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> {params.error}
            </div>
          )}

          <div>
             <p className="text-xs text-gray-500 mb-6 text-center leading-relaxed max-w-xl mx-auto">
                Al hacer clic en "Solicitar Apertura de Cuenta", confirmas que la información proporcionada es veraz y aceptas nuestros Términos de Servicio y Políticas de Privacidad del Banco.
             </p>
            <button
              formAction={signup}
              className="w-full bg-brand hover:bg-[#004a29] text-white font-bold text-lg py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
            >
              Solicitar Apertura de Cuenta <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-600">
          ¿Ya eres cliente de Agrobanco?{' '}
          <Link href="/login" className="text-brand font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
