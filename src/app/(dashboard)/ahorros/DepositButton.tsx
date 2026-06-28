'use client'

import { useState } from 'react'
import { ArrowDownRight, X, CreditCard, ShieldCheck } from 'lucide-react'
import { depositarAhorros } from './actions'

export default function DepositButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [monto, setMonto] = useState('')

  async function handleDeposit(formData: FormData) {
    setLoading(true)
    setError('')
    try {
      await depositarAhorros(formData)
      setIsOpen(false)
      setMonto('')
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-brand-dark hover:bg-[#003820] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
      >
        <ArrowDownRight className="w-4 h-4" />
        Recargar Cuenta
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand/10 p-3 rounded-2xl text-brand">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">Recargar con Tarjeta</h3>
                <p className="text-sm text-gray-500">Transfiere desde otro banco usando tu tarjeta</p>
              </div>
            </div>

            <form action={handleDeposit} className="flex flex-col gap-5">
              {error && <div className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-100 font-medium">{error}</div>}
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Monto a recargar</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">S/</span>
                  <input 
                    type="number" 
                    name="monto"
                    step="0.01"
                    min="1"
                    value={monto}
                    onChange={e => setMonto(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-bold text-xl transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-4">Datos de la Tarjeta (Externa)</label>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Número de Tarjeta</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 text-sm transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Vencimiento</label>
                      <input 
                        type="text" 
                        placeholder="MM/AA"
                        maxLength={5}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 text-sm transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">CVV</label>
                      <input 
                        type="password" 
                        placeholder="***"
                        maxLength={4}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 text-sm transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre del Titular</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Pérez"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 text-sm transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center mt-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-500 font-medium">Transacción 100% segura y encriptada</span>
              </div>

              <button 
                type="submit" 
                disabled={loading || !monto}
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-50 disabled:hover:bg-brand shadow-lg shadow-brand/20 flex justify-center items-center gap-2"
              >
                {loading ? 'Procesando...' : `Recargar S/ ${monto || '0.00'}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
