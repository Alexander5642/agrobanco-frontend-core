'use client'

import { useState } from 'react'
import { submitPQR } from './actions'
import { HeadphonesIcon, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function SoportePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const result = (await submitPQR(formData)) as any

    if (result?.error) {
      setStatus('error')
      setMessage(result.error)
    } else if (result?.success) {
      setStatus('success')
      setMessage(result.success)
      ;(e.target as HTMLFormElement).reset()
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Atención al Cliente</h1>
        <p className="text-gray-500">Radicación de Peticiones, Quejas, Reclamos y Solicitudes (PQRS)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Línea Nacional</h3>
            <p className="text-gray-500 text-sm mb-4">Lunes a Viernes de 8:00 am a 6:00 pm</p>
            <p className="text-xl font-bold text-brand">01 8000 91 5000</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
             <h3 className="font-bold text-gray-900 mb-2">Asistente Anita</h3>
             <p className="text-gray-500 text-sm mb-4">Resuelve dudas por chat 24/7</p>
             <button className="bg-green-50 text-brand font-bold py-2 px-4 rounded-xl w-full border border-green-200 hover:bg-green-100 transition-colors">
               Iniciar Chat
             </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand" /> Formulario de Radicación
          </h2>

          {status === 'success' && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-start gap-3 mb-6 border border-green-200">
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-medium text-sm">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 mb-6 border border-red-200">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-medium text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Solicitud</label>
                <select name="tipo" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand text-gray-700">
                  <option value="PQR">Petición, Queja o Reclamo (PQR)</option>
                  <option value="Solicitud Credito">Solicitud de Producto / Crédito</option>
                  <option value="Contacto">Soporte Técnico / Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombres Completos</label>
                <input type="text" name="nombres" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Ej: Juan Pérez" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Documento de Identidad</label>
                <input type="text" name="documento" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Ej: 74975772" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono de Contacto</label>
                <input type="tel" name="telefono" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Celular" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
              <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="tucorreo@ejemplo.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje / Detalle de la Petición</label>
              <textarea name="mensaje" required rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand resize-none" placeholder="Explica detalladamente tu caso..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-hover transition-colors disabled:opacity-50 shadow-md"
            >
              {status === 'loading' ? 'Enviando...' : 'Radicar Solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
