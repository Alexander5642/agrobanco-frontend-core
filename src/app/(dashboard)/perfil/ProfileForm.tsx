'use client'

import { useState } from 'react'
import { User, Save, CreditCard, ShieldCheck } from 'lucide-react'
import { updateProfile } from './actions'

export default function ProfileForm({ cliente, tarjeta }: { cliente: any, tarjeta?: any }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      await updateProfile(formData)
      setSuccess(true)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  // Formatear tarjeta como XXXX XXXX XXXX XXXX
  const formatCardNumber = (num: string) => {
    if (!num) return '•••• •••• •••• ••••';
    return num.match(/.{1,4}/g)?.join(' ') || num;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Tarjeta Virtual Section */}
      <div className="bg-gradient-to-br from-brand-dark to-[#001f12] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Mi Tarjeta Virtual Agrobanco</h3>
            <div className="flex items-center gap-2 text-brand-accent">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Activa y Segura</span>
            </div>
          </div>
          <CreditCard className="w-8 h-8 text-white/50" />
        </div>

        <div className="relative z-10">
          <p className="font-mono text-3xl tracking-widest mb-6">
            {tarjeta ? formatCardNumber(tarjeta.numero_tarjeta) : 'Generando...'}
          </p>
          <div className="flex justify-between items-end">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Expira</p>
                <p className="font-mono text-lg">{tarjeta ? tarjeta.fecha_expiracion : 'MM/YY'}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">CVV</p>
                <p className="font-mono text-lg">{tarjeta ? tarjeta.cvv : '•••'}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">PIN Cajero</p>
                <p className="font-mono text-lg">{tarjeta ? tarjeta.clave_pin : '••••'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Titular</p>
              <p className="font-medium tracking-wide">{cliente.nombres.toUpperCase()} {cliente.apellidos.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de Perfil */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-brand/10 p-4 rounded-2xl">
            <User className="w-7 h-7 text-brand" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">Información Personal</h3>
            <p className="text-gray-500 text-sm">Actualiza tus datos para mantener tu cuenta al día</p>
          </div>
        </div>

      <form action={handleSubmit} className="flex flex-col gap-6">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">{error}</div>}
        {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-sm font-bold">¡Perfil actualizado correctamente!</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nombres</label>
            <input 
              type="text" 
              name="nombres"
              defaultValue={cliente.nombres}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Apellidos</label>
            <input 
              type="text" 
              name="apellidos"
              defaultValue={cliente.apellidos}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">DNI</label>
            <input 
              type="text" 
              name="dni"
              defaultValue={cliente.dni}
              required
              maxLength={8}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Celular</label>
            <input 
              type="text" 
              name="celular"
              defaultValue={cliente.celular}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
            <input 
              type="text" 
              name="direccion"
              defaultValue={cliente.direccion}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-brand hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}
