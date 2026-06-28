'use client'

import { useState } from 'react'
import { Wallet, ArrowDownRight, ArrowUpRight, FileText, ChevronRight, Leaf, Activity, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ResumenClient({ 
  user, 
  cuenta, 
  movimientosTotales, 
  creditos 
}: { 
  user: any, 
  cuenta: any, 
  movimientosTotales: any[], 
  creditos: any[] 
}) {
  const [periodo, setPeriodo] = useState<'ESTE_MES' | 'MES_PASADO' | 'TODO'>('ESTE_MES')

  // Logica de filtro de tiempo
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  const movimientosFiltrados = movimientosTotales.filter(m => {
    const movDate = new Date(m.creado_en)
    if (periodo === 'ESTE_MES') {
      return movDate.getMonth() === currentMonth && movDate.getFullYear() === currentYear
    } else if (periodo === 'MES_PASADO') {
      const pastMonthDate = new Date(now)
      pastMonthDate.setMonth(now.getMonth() - 1)
      return movDate.getMonth() === pastMonthDate.getMonth() && movDate.getFullYear() === pastMonthDate.getFullYear()
    }
    return true
  })

  const totalIngresos = movimientosFiltrados.filter(m => m.es_ingreso).reduce((acc, curr) => acc + curr.monto, 0)
  const totalEgresos = movimientosFiltrados.filter(m => !m.es_ingreso).reduce((acc, curr) => acc + curr.monto, 0)
  const movimientosRecientes = movimientosFiltrados.slice(0, 5) // Muestra los últimos 5 del periodo
  
  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Buenas noches, <span className="text-brand">{user.nombres}</span> <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500 mt-2">Aquí tienes el resumen interactivo de tu actividad</p>
        </div>
        
        {/* Filtro de tiempo */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1">
          <button 
            onClick={() => setPeriodo('ESTE_MES')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${periodo === 'ESTE_MES' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Este mes
          </button>
          <button 
            onClick={() => setPeriodo('MES_PASADO')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${periodo === 'MES_PASADO' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Mes pasado
          </button>
          <button 
            onClick={() => setPeriodo('TODO')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${periodo === 'TODO' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Histórico
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-br from-brand to-brand-dark p-6 rounded-2xl shadow-md text-white flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 group">
          <Wallet className="w-6 h-6 text-white/80 mb-2" />
          <div>
            <p className="text-3xl font-bold">{formatMoney(cuenta.saldo)}</p>
            <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">Saldo Disponible</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
            <ArrowDownRight className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatMoney(totalIngresos)}</p>
            <p className="text-xs text-gray-500 font-medium">Ingresos ({periodo.replace('_', ' ').toLowerCase()})</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <ArrowUpRight className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatMoney(totalEgresos)}</p>
            <p className="text-xs text-gray-500 font-medium">Egresos ({periodo.replace('_', ' ').toLowerCase()})</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
          <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center mb-2">
             <FileText className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{creditos.length}</p>
            <p className="text-xs text-gray-500 font-medium">Solicitudes de crédito</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Card Resumen de Ahorros mejorada */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col sm:flex-row">
            <div className="p-8 sm:w-2/3">
              <div className="flex items-center gap-2 text-brand font-bold mb-4">
                <Leaf className="w-5 h-5" /> Cuenta principal
              </div>
              <h3 className="text-gray-500 text-sm mb-1">N° {cuenta.numero_cuenta}</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">{formatMoney(cuenta.saldo)}</p>
              
              <div className="flex gap-3">
                <Link href="/transferencias" className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                  Transferir
                </Link>
                <Link href="/ahorros" className="bg-gray-50 hover:bg-gray-100 text-brand px-5 py-2.5 rounded-xl text-sm font-bold transition-colors border border-gray-200">
                  Ver detalles
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-8 sm:w-1/3 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-center">
               <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Rendimiento</p>
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-2xl font-bold text-brand">{Number(cuenta.trea).toFixed(2)}%</span>
                 <span className="text-xs text-gray-500 font-bold">TREA</span>
               </div>
               <p className="text-xs text-gray-400">Generando intereses a tu favor mes a mes.</p>
            </div>
          </div>

          {/* Últimos Movimientos Dinámicos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-900">
                <Activity className="w-5 h-5 text-brand" />
                <h3 className="font-bold">Actividad en {periodo.replace('_', ' ').toLowerCase()}</h3>
              </div>
              <Link href="/movimientos" className="text-sm font-bold text-brand hover:underline bg-brand/5 px-3 py-1 rounded-lg">
                Ver historial completo
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              {movimientosRecientes.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <Calendar className="w-10 h-10 text-gray-200 mb-3" />
                  <p className="text-gray-500 font-medium">No hay movimientos en este periodo</p>
                </div>
              ) : (
                movimientosRecientes.map((mov, i) => (
                  <div key={i} className="p-5 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={mov.es_ingreso ? "bg-green-100 p-3 rounded-full shadow-inner" : "bg-red-50 border border-red-100 p-3 rounded-full"}>
                        {mov.es_ingreso ? <ArrowDownRight className="w-5 h-5 text-brand" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{mov.tipo}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{new Date(mov.creado_en).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className={`font-bold text-lg ${mov.es_ingreso ? 'text-brand' : 'text-red-500'}`}>
                      {mov.es_ingreso ? '+' : '-'} {formatMoney(mov.monto)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6">
          {/* Créditos Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-accent" />
                <h3 className="font-bold text-gray-900">Mis Créditos</h3>
              </div>
              <Link href="/creditos" className="text-xs font-bold text-brand hover:underline">Gestionar</Link>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {creditos.length === 0 ? (
                <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-sm font-medium">No tienes créditos activos</p>
                </div>
              ) : (
                creditos.slice(0, 5).map((cred, i) => {
                  let badgeColor = 'bg-gray-100 text-gray-800';
                  if (cred.estado === 'APROBADO') badgeColor = 'bg-green-100 text-green-800 border-green-200';
                  if (cred.estado === 'EN_COMITE') badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                  if (cred.estado === 'DESEMBOLSADO') badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                  if (cred.estado === 'PRE_SOLICITUD' || cred.estado === 'REGISTRO' || cred.estado === 'ENVIADO') badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
                  if (cred.estado === 'VENCIDO' || cred.estado === 'RECHAZADO') badgeColor = 'bg-red-100 text-red-800 border-red-200';

                  return (
                    <div key={i} className="flex flex-col p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{formatMoney(cred.monto)}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 font-bold uppercase truncate max-w-[150px]" title={cred.destino}>
                            {cred.destino || 'Crédito Personal'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border ${badgeColor}`}>
                          {cred.estado.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                        <span className="text-xs font-medium text-gray-500">{cred.meses} cuotas</span>
                        <span className="text-xs font-bold text-gray-700">TEA: {cred.tea}%</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <Link href="/creditos" className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-colors text-center block shadow-md">
              Solicitar Nuevo Préstamo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
