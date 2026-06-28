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
  const [tipoCredito, setTipoCredito] = useState('Crédito Agrícola Tradicional')
  const [frecuenciaPago, setFrecuenciaPago] = useState('Mensual')
  const [hectareas, setHectareas] = useState('5')
  const [cabezasGanado, setCabezasGanado] = useState('20')
  const [ingresoUIT, setIngresoUIT] = useState('10')
  
  const m = parseFloat(monto) || 0
  
  let tea = 40.92
  if (tipoCredito === 'Fondo Agroperú') tea = 3.5
  if (tipoCredito === 'Crédito Pecuario') tea = 12.5
  if (tipoCredito === 'Crédito Agrícola Tradicional') tea = 15.0

  const tem = Math.pow(1 + (tea / 100), 1 / 12) - 1
  const mesesInt = parseInt(meses || '1')
  
  let cuota = 0
  if (frecuenciaPago === 'Al Vencimiento (Cosecha)') {
    cuota = m * Math.pow(1 + tem, mesesInt)
  } else {
    cuota = m > 0 ? m * ((tem * Math.pow(1 + tem, mesesInt)) / (Math.pow(1 + tem, mesesInt) - 1)) : 0
  }
  
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créditos Agropecuarios</h1>
          <p className="text-gray-500">Solicita financiamiento para el ciclo biológico de tu producción</p>
        </div>
        <div className="bg-brand-accent/20 text-brand-dark px-4 py-2 rounded-lg font-bold text-sm border border-brand-accent/30 shadow-sm">
          TEA preferencial desde 3.5%
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
                <h2 className="text-xl font-bold text-gray-900">Simulador de Crédito</h2>
              </div>
              
              {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm mb-6">{error}</div>}
              {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-sm font-bold flex items-center gap-2 mb-6">¡Solicitud enviada exitosamente! Está en revisión.</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Crédito</label>
                  <select 
                    name="tipo_credito"
                    value={tipoCredito}
                    onChange={(e) => setTipoCredito(e.target.value)}
                    className="w-full text-md px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
                  >
                    <option value="Crédito Agrícola Tradicional">Crédito Agrícola Tradicional</option>
                    <option value="Crédito Pecuario">Crédito Pecuario</option>
                    <option value="Fondo Agroperú">Fondo Agroperú (Tasa 3.5%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Frecuencia de Pago</label>
                  <select 
                    name="frecuencia_pago"
                    value={frecuenciaPago}
                    onChange={(e) => setFrecuenciaPago(e.target.value)}
                    className="w-full text-md px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
                  >
                    <option value="Mensual">Cuotas Mensuales (Estacional)</option>
                    <option value="Al Vencimiento (Cosecha)">Al Vencimiento (Cosecha)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿Cuánto dinero necesitas?</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">S/</span>
                    <input 
                      type="number"
                      name="monto"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      className="w-full text-xl font-bold px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿En cuántos meses pagarás?</label>
                  <select 
                    name="meses"
                    value={meses}
                    onChange={(e) => setMeses(e.target.value)}
                    className="w-full text-xl px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
                  >
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="48">48 meses</option>
                  </select>
                </div>
              </div>

              {/* Campos dinámicos según el tipo de crédito */}
              <div className="bg-brand/5 p-4 rounded-xl border border-brand/10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(tipoCredito === 'Crédito Agrícola Tradicional' || tipoCredito === 'Fondo Agroperú') && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Hectáreas agrícolas (Máx 10)</label>
                    <input 
                      type="number" name="hectareas" value={hectareas} onChange={e => setHectareas(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none" max="10" min="1"
                    />
                  </div>
                )}
                {tipoCredito === 'Crédito Pecuario' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Cabezas de Ganado</label>
                    <input 
                      type="number" name="cabezas_ganado" value={cabezasGanado} onChange={e => setCabezasGanado(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none" min="1"
                    />
                  </div>
                )}
                {tipoCredito === 'Fondo Agroperú' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Ingreso Neto Anual (UIT) (Máx 12)</label>
                    <input 
                      type="number" name="ingreso_anual_uit" value={ingresoUIT} onChange={e => setIngresoUIT(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none" max="12" min="1"
                    />
                  </div>
                )}
              </div>

              <div className="bg-brand-dark rounded-xl p-6 text-white flex justify-between items-center relative overflow-hidden shadow-sm">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/4"></div>
                <div>
                  <p className="text-white/80 text-sm mb-1">
                    {frecuenciaPago === 'Mensual' ? 'Tu cuota mensual aproximada será de' : 'Tu pago total al vencimiento será de'}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-brand-accent">{formatMoney(cuota)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs mb-1 uppercase tracking-wider">TEA PREFERENCIAL</p>
                  <p className="font-bold text-lg">{tea}%</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HelpCircle className="w-4 h-4" />
                Sujeto a evaluación técnica en campo
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
                        <p className="font-bold text-gray-900">{cred.tipo_credito || cred.destino || 'Crédito General'}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(cred.creado_en).toLocaleDateString()} • {cred.frecuencia_pago || 'Mensual'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatMoney(cred.monto)}</p>
                      <span className={`inline-block mt-1 px-3 py-1 text-[10px] font-bold rounded-md border uppercase ${cred.estado === 'PENDIENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : cred.estado === 'APROBADO' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
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
            <h3 className="font-bold text-gray-900 mb-6">Reglas de Agrobanco</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Pequeño Productor Agropecuario (PPA)</p>
                  <p className="text-xs text-gray-500">Máximo 10 hectáreas agrícolas o ventas brutas anuales menores a 100 UIT.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Fondo AGROPERÚ</p>
                  <p className="text-xs text-gray-500">Tasas sumamente bajas (TEA 3.5%) si tu ingreso neto es menor a 12 UIT.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Pagos al Vencimiento</p>
                  <p className="text-xs text-gray-500">Paga el total en una sola cuota al finalizar la cosecha y comercialización.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand rounded-2xl shadow-sm p-6 text-white text-center flex flex-col items-center">
             <div className="bg-white/10 p-3 rounded-full mb-4">
               <HelpCircle className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold mb-2">¿Necesitas ayuda técnica?</h3>
             <p className="text-xs text-white/80 mb-6">Nuestros ingenieros agrónomos están listos para la evaluación de campo.</p>
             <button className="w-full bg-white text-brand font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
               Contactar Asesor
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
