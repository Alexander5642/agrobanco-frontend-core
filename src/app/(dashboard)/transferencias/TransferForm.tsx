'use client'

import { ArrowRightLeft, Search, Smartphone, Zap, Droplets, Wifi, CreditCard, Building2, Send } from 'lucide-react'
import { transferir } from './actions'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function TransferForm({ cuenta, movimientos = [] }: { cuenta: any, movimientos?: any[] }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      await transferir(formData)
      setSuccess(true)
      formRef.current?.reset()
    } catch (e: any) {
      setError(e.message || 'Error en la transferencia')
    }
    setLoading(false)
  }

  const formatMoney = (amount: number) => `S/ ${Number(amount || 0).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transferencias y Pagos</h1>
        <p className="text-gray-500">Envía dinero y paga tus servicios de forma segura</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-brand p-8 text-white flex justify-between items-end relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-white/10 p-2 rounded-lg">
                   <ArrowRightLeft className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">Nueva Transferencia</h3>
                   <p className="text-xs text-white/70">Entre cuentas Agrobanco</p>
                 </div>
               </div>
               
               <p className="text-[10px] text-white/60 mb-1 tracking-wider uppercase">Desde tu cuenta</p>
               <p className="font-mono font-bold">{cuenta?.numero_cuenta || '---'}</p>
             </div>
             
             <div className="relative z-10 text-right">
               <p className="text-[10px] text-white/60 mb-1 tracking-wider uppercase">Saldo Disponible</p>
               <p className="text-2xl font-bold text-brand-accent">{formatMoney(cuenta?.saldo)}</p>
             </div>
          </div>
          
          <form ref={formRef} action={handleSubmit} className="p-8 flex flex-col gap-8">
            <input type="hidden" name="cuenta_origen" value={cuenta?.id || ''} />
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">{error}</div>}
            {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-sm font-bold flex items-center gap-2">¡Transferencia exitosa!</div>}

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs">1</span>
                Cuenta destino
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="cuenta_destino"
                  required
                  placeholder="Ej. 191-12345678" 
                  className="w-full text-lg px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand pl-4 pr-32" 
                />
                <button type="button" className="absolute right-2 top-2 bottom-2 bg-[#86c0a0] hover:bg-brand text-white px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" /> Buscar
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs">2</span>
                Monto a transferir
              </label>
              <input 
                type="number" 
                step="0.01"
                name="monto"
                required
                placeholder="S/ 0.00" 
                className="w-full text-xl font-bold px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand mb-3" 
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => {if(formRef.current) formRef.current.monto.value="10"}} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">S/ 10</button>
                <button type="button" onClick={() => {if(formRef.current) formRef.current.monto.value="50"}} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">S/ 50</button>
                <button type="button" onClick={() => {if(formRef.current) formRef.current.monto.value="100"}} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">S/ 100</button>
                <button type="button" onClick={() => {if(formRef.current) formRef.current.monto.value="500"}} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50">S/ 500</button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs">3</span>
                Concepto (opcional)
              </label>
              <input 
                type="text" 
                name="concepto"
                placeholder="Ej. Pago de mercadería, Préstamo personal..." 
                className="w-full text-base px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" 
              />
            </div>

            <button disabled={loading} type="submit" className="mt-4 disabled:opacity-50 w-full bg-brand-accent hover:bg-[#FCD34D] text-gray-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
              {loading ? 'Procesando...' : 'Continuar'} <ArrowRightLeft className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-gray-900">Pago de Servicios</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Recargas</p>
              </Link>
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-yellow-50 group-hover:bg-yellow-100 flex items-center justify-center transition-colors">
                    <Zap className="w-5 h-5 text-yellow-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Luz</p>
              </Link>
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Droplets className="w-5 h-5 text-blue-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Agua</p>
              </Link>
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <Wifi className="w-5 h-5 text-gray-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Internet</p>
              </Link>
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                    <CreditCard className="w-5 h-5 text-red-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Tarjetas</p>
              </Link>
              <Link href="/pagos" className="flex flex-col items-center gap-2 text-center group cursor-pointer">
                 <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <Building2 className="w-5 h-5 text-slate-600" />
                 </div>
                 <p className="text-xs font-medium text-gray-600">Instituciones</p>
              </Link>
            </div>
            
            <Link href="/pagos" className="block text-center text-xs text-brand font-bold hover:underline">
              Pagar un servicio ahora →
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Transferencias Recientes</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 py-2 overflow-y-auto">
              {movimientos && movimientos.length > 0 ? (
                movimientos.map((mov, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${mov.es_ingreso ? 'bg-green-100 text-brand' : 'bg-red-100 text-red-500'}`}>
                        <ArrowRightLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{mov.tipo}</p>
                        <p className="text-xs text-gray-500">{new Date(mov.creado_en).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${mov.es_ingreso ? 'text-brand' : 'text-red-500'}`}>
                      {mov.es_ingreso ? '+' : '-'}{formatMoney(mov.monto)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <Send className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="font-semibold text-gray-900 mb-1">Sin transferencias</p>
                  <p className="text-sm text-gray-500">Realiza tu primera transferencia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
