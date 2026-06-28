'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Zap, Droplet, Phone, Tv, Flame, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { pagarServicio } from './actions'

const SERVICIOS = [
  { id: 'LUZ', nombre: 'Energía Eléctrica', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { id: 'AGUA', nombre: 'Servicio de Agua', icon: Droplet, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'TEL', nombre: 'Telefonía / Internet', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { id: 'CABLE', nombre: 'TV por Cable', icon: Tv, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
  { id: 'GAS', nombre: 'Gas Natural', icon: Flame, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  { id: 'MUNI', nombre: 'Tributos Municipales', icon: Building2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
]

export default function PagosForm({ cuenta }: { cuenta: any }) {
  const [servicioSeleccionado, setServicioSeleccionado] = useState('LUZ')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const actionFunc = async (formData: FormData) => {
    setStatus('loading')
    try {
      await pagarServicio(formData)
      setStatus('success')
      setMessage('Pago realizado exitosamente. Comprobante generado.')
      setTimeout(() => router.push('/movimientos'), 2000)
    } catch (e: any) {
      setStatus('error')
      setMessage(e.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pago de Servicios</h1>
        <p className="text-gray-500 mt-2">Paga tus recibos de servicios públicos y privados sin comisiones.</p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          {status === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex items-start gap-4 text-green-800">
              <CheckCircle className="w-8 h-8 shrink-0 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">¡Operación Exitosa!</h3>
                <p className="font-medium mt-1">{message}</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="font-medium">{message}</p>
            </div>
          )}

          <form action={actionFunc} className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">1. Selecciona el servicio a pagar</h3>
              <input type="hidden" name="servicio" value={SERVICIOS.find(s => s.id === servicioSeleccionado)?.nombre || servicioSeleccionado} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SERVICIOS.map((s) => {
                  const isSelected = servicioSeleccionado === s.id;
                  const Icon = s.icon;
                  return (
                    <div 
                      key={s.id}
                      onClick={() => setServicioSeleccionado(s.id)}
                      className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${
                        isSelected ? `border-brand ${s.bg} shadow-md` : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${isSelected ? 'bg-white shadow-sm' : s.bg}`}>
                        <Icon className={`w-6 h-6 ${s.color}`} />
                      </div>
                      <span className={`font-bold text-sm text-center ${isSelected ? 'text-brand-dark' : 'text-gray-700'}`}>
                        {s.nombre}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">2. Ingresa los datos del recibo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Código de Suministro / N° de Recibo</label>
                  <input type="text" name="codigo" required placeholder="Ej: 12345678" className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Monto a pagar</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">S/</span>
                    <input type="number" name="monto" required min="0.1" step="0.01" placeholder="0.00" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-xl font-bold" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500 font-medium">Saldo en tu cuenta principal:</p>
                    <p className="text-sm font-bold text-brand-dark">S/ {cuenta?.saldo.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-lg py-5 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando Pago...
                </>
              ) : 'Confirmar y Pagar Servicio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
