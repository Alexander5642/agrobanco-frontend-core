'use client'

import { Leaf, FileText, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'
import { solicitarCredito } from './actions'
import { useState, useRef } from 'react'

export default function CreditForm({ creditos }: { creditos: any[] }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const [monto, setMonto] = useState('45000')
  const [meses, setMeses] = useState('24')
  
  const m = parseFloat(monto) || 0
  const tea = 43.92
  const tem = Math.pow(1 + (tea / 100), 1 / 12) - 1
  const mesesInt = parseInt(meses || '1')
  const cuota = m > 0 ? m * ((tem * Math.pow(1 + tem, mesesInt)) / (Math.pow(1 + tem, mesesInt) - 1)) : 0
  
  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      await solicitarCredito(formData)
      setSuccess(true)
      formRef.current?.reset()
    } catch (e: any) {
      setError(e.message || 'Error al solicitar el crédito')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créditos y Préstamos</h1>
          <p className="text-gray-500">Solicita financiamiento con las mejores tasas del mercado</p>
        </div>
        <div className="bg-brand-accent/20 text-brand-dark px-4 py-2 rounded-lg font-bold text-sm border border-brand-accent/30 shadow-sm">
          TEA desde 40.92%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <form ref={formRef} action={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand p-2 rounded-lg">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Simulador de Préstamo Personal</h2>
              </div>
              
              {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm mb-6">{error}</div>}
              {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-sm font-bold flex items-center gap-2 mb-6">¡Solicitud enviada exitosamente! Está en revisión.</div>}

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿Cuánto dinero necesitas?</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">S/</span>
                    <input 
                      type="number"
                      name="monto"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      className="w-full text-2xl font-bold px-4 py-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿En cuántos meses pagarás?</label>
                  <select 
                    name="meses"
                    value={meses}
                    onChange={(e) => setMeses(e.target.value)}
                    className="w-full text-lg px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer appearance-none"
                  >
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="48">48 meses</option>
                  </select>
                </div>
              </div>

              <div className="bg-brand-dark rounded-xl p-6 text-white flex justify-between items-center relative overflow-hidden shadow-sm">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/4"></div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Tu cuota mensual aproximada será de</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-brand-accent">{formatMoney(cuota)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs mb-1 uppercase tracking-wider">TEA</p>
                  <p className="font-bold text-lg">43.92%</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HelpCircle className="w-4 h-4" />
                Sujeto a evaluación crediticia
              </div>
              <button disabled={loading} type="submit" className="bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm disabled:opacity-50">
                {loading ? 'Enviando...' : 'Solicitar Crédito'}
              </button>
            </div>
          </form>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Historial de Solicitudes</h3>
            </div>
            
            <div className="p-2">
              {creditos.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No tienes solicitudes registradas.</div>
              ) : (
                creditos.map((cred, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="bg-brand/10 p-3 rounded-full">
                        <FileText className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Crédito Personal</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(cred.creado_en).toLocaleDateString()} • {cred.meses} cuotas de {formatMoney(cred.cuota_mes)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatMoney(cred.monto)}</p>
                      <span className="inline-block mt-1 px-3 py-1 bg-yellow-50 text-yellow-700 text-[10px] font-bold rounded-md border border-yellow-100 uppercase">
                        {cred.estado}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6">Beneficios</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Aprobación Rápida</p>
                  <p className="text-xs text-gray-500">Evaluación en menos de 24 horas laborables.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Sin Aval</p>
                  <p className="text-xs text-gray-500">Para montos hasta S/ 15,000 según evaluación.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Cuotas Fijas</p>
                  <p className="text-xs text-gray-500">Paga la misma cantidad todos los meses sin sorpresas.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand rounded-2xl shadow-sm p-6 text-white text-center flex flex-col items-center">
             <div className="bg-white/10 p-3 rounded-full mb-4">
               <HelpCircle className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold mb-2">¿Necesitas ayuda?</h3>
             <p className="text-xs text-white/80 mb-6">Nuestros asesores están listos para guiarte en tu solicitud.</p>
             <button className="w-full bg-white text-brand font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
               Contactar Asesor
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
