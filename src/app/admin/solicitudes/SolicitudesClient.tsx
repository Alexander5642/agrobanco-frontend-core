'use client'

import React, { useState } from 'react'
import { Filter, Search, CreditCard, X, ChevronRight, CheckCircle2, XCircle, Banknote, CalendarDays, FileText, Leaf } from 'lucide-react'
import { updateEstadoCredito } from '../actions'
import Link from 'next/link'

export default function SolicitudesClient({ creditosLista }: { creditosLista: any[] }) {
  const [estadoFiltro, setEstadoFiltro] = useState('TODOS')
  const [searchFiltro, setSearchFiltro] = useState('')
  const [selectedCredito, setSelectedCredito] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const formatMoney = (val: number) => `S/ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const filteredCreditos = creditosLista.filter((c: any) => {
    const matchEstado = estadoFiltro === 'TODOS' || c.estado === estadoFiltro;
    const searchStr = `${c.id} ${c.user_name} ${c.user_dni}`.toLowerCase();
    const matchSearch = searchStr.includes(searchFiltro.toLowerCase());
    return matchEstado && matchSearch;
  });

  const handleUpdateEstado = async (nuevoEstado: string) => {
    if (!selectedCredito) return;
    setIsUpdating(true);
    try {
      await updateEstadoCredito(selectedCredito.id, nuevoEstado);
      setSelectedCredito({ ...selectedCredito, estado: nuevoEstado });
      window.location.reload();
    } catch (error) {
      alert("Error al actualizar el estado");
    }
    setIsUpdating(false);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-[#008c4a]/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-[#008c4a]" />
            </div>
            Gestión de Solicitudes
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Flujo de trabajo y revisión de expedientes crediticios.</p>
        </div>
        
        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 bg-white shadow-sm px-4 py-2.5 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#008c4a]" />
            <select 
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer py-1"
            >
              <option value="TODOS">Todos los estados</option>
              <option value="PENDIENTE">En Evaluación (Pendiente)</option>
              <option value="ENVIADO">Enviado (Nuevo)</option>
              <option value="APROBADO">Aprobado (Comité)</option>
              <option value="DESEMBOLSADO">Desembolsado</option>
              <option value="RECHAZADO">Rechazado</option>
            </select>
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por DNI o Nombre..."
              value={searchFiltro}
              onChange={(e) => setSearchFiltro(e.target.value)}
              className="bg-transparent text-sm outline-none w-56 text-gray-700 placeholder-gray-400 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008c4a] to-emerald-400"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">ID Solicitud</th>
                <th className="px-6 py-5">Cliente</th>
                <th className="px-6 py-5">Destino del Fondo</th>
                <th className="px-6 py-5">Monto y Plazo</th>
                <th className="px-6 py-5">Estado Actual</th>
                <th className="px-6 py-5 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCreditos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    No se encontraron solicitudes que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                filteredCreditos.map((c: any, i: number) => {
                  let badgeColor = 'bg-gray-100 text-gray-800 border-gray-200';
                  let icon = null;
                  if (c.estado === 'APROBADO') {
                    badgeColor = 'bg-green-50 text-green-700 border-green-200';
                    icon = <CheckCircle2 className="w-3 h-3 mr-1" />;
                  }
                  if (c.estado === 'PENDIENTE' || c.estado === 'ENVIADO') {
                    badgeColor = 'bg-orange-50 text-orange-700 border-orange-200';
                  }
                  if (c.estado === 'DESEMBOLSADO') {
                    badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                  }
                  if (c.estado === 'RECHAZADO') {
                    badgeColor = 'bg-red-50 text-red-700 border-red-200';
                    icon = <XCircle className="w-3 h-3 mr-1" />;
                  }

                  return (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedCredito(c)}
                      className="hover:bg-[#008c4a]/5 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs group-hover:bg-white group-hover:text-[#008c4a] transition-colors">
                          {c.id.includes('-') ? c.id.split('-').slice(0,2).join('-') : c.id.slice(0,8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{c.user_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">DNI: {c.user_dni}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800 max-w-[200px] truncate">
                        {c.tipo_credito || c.destino || 'Crédito General'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#008c4a]">{formatMoney(c.monto)}</div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {c.meses} meses ({c.frecuencia_pago || 'Mensual'})
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider border ${badgeColor}`}>
                          {icon}
                          {c.estado.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center text-[#008c4a] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-bold mr-1">Revisar</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Lateral de Detalle de Solicitud */}
      {selectedCredito && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-gray-900/60 backdrop-blur-sm transition-all duration-300">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#008c4a]"></div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Evaluación de Expediente</h2>
                <p className="text-sm text-gray-500 font-mono mt-1 uppercase flex items-center gap-2">
                  ID: <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded">{selectedCredito.id}</span>
                </p>
              </div>
              <button 
                onClick={() => setSelectedCredito(null)}
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-8 overflow-y-auto flex-1 bg-gray-50/50">
              
              {/* Tarjeta Cliente & Estado */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Titular de la Solicitud</p>
                  <p className="font-bold text-gray-900 text-2xl">{selectedCredito.user_name}</p>
                  <p className="text-sm text-gray-500 mt-1">Documento Nacional: <strong>{selectedCredito.user_dni}</strong></p>
                  <Link href={`/admin/clientes/${selectedCredito.user_id}`} className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#008c4a] hover:text-[#006132] bg-[#008c4a]/10 px-3 py-1.5 rounded-md transition-colors">
                    Ver perfil completo e historial &rarr;
                  </Link>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Estado del Trámite</p>
                  <span className={`inline-flex items-center px-4 py-2 text-xs font-bold uppercase rounded-lg border ${
                    selectedCredito.estado === 'APROBADO' ? 'bg-green-50 text-green-700 border-green-200' :
                    (selectedCredito.estado === 'PENDIENTE' || selectedCredito.estado === 'ENVIADO') ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    selectedCredito.estado === 'DESEMBOLSADO' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {selectedCredito.estado}
                  </span>
                </div>
              </div>

              {/* Grid de Información del Crédito */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Banknote className="w-32 h-32" />
                </div>
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#008c4a]" />
                  Detalles Financieros
                </h3>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm relative z-10">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Monto Solicitado</span>
                    <span className="font-bold text-[#008c4a] text-2xl">{formatMoney(selectedCredito.monto)}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Total a Pagar (Aprox.)</span>
                    <span className="font-bold text-gray-900 text-xl">{selectedCredito.total ? formatMoney(selectedCredito.total) : 'N/A'}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 text-xs uppercase font-bold block mb-1">Destino / Producto</span>
                    <span className="font-bold text-gray-900 text-base">{selectedCredito.tipo_credito || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase font-bold block mb-1">Tasa Efectiva Anual</span>
                    <span className="font-bold text-gray-900 text-base">{selectedCredito.tea}% TEA</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 text-xs uppercase font-bold block mb-1">Plazo de Financiamiento</span>
                    <span className="font-bold text-gray-900 text-base">{selectedCredito.meses} meses</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase font-bold block mb-1">Frecuencia de Pago</span>
                    <span className="font-bold text-gray-900 text-base">{selectedCredito.frecuencia_pago || 'Mensual'}</span>
                  </div>
                </div>
              </div>

              {/* Evaluación Agropecuaria (Si existe) */}
              {(selectedCredito.hectareas || selectedCredito.cabezas_ganado || selectedCredito.ingreso_anual_uit) && (
                <div className="bg-[#008c4a]/5 rounded-xl shadow-sm border border-[#008c4a]/20 p-6 mb-6">
                  <h3 className="font-bold text-[#006132] mb-5 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Parámetros Agropecuarios (Validación)
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    {selectedCredito.hectareas && (
                      <div className="flex flex-col">
                        <span className="text-[#006132]/70 text-xs font-bold uppercase tracking-wider mb-1">Extensión (Hectáreas)</span>
                        <span className="font-bold text-gray-900">{selectedCredito.hectareas} ha. declaradas</span>
                      </div>
                    )}
                    {selectedCredito.cabezas_ganado && (
                      <div className="flex flex-col">
                        <span className="text-[#006132]/70 text-xs font-bold uppercase tracking-wider mb-1">Cabezas de Ganado</span>
                        <span className="font-bold text-gray-900">{selectedCredito.cabezas_ganado} animales</span>
                      </div>
                    )}
                    {selectedCredito.ingreso_anual_uit && (
                      <div className="flex flex-col">
                        <span className="text-[#006132]/70 text-xs font-bold uppercase tracking-wider mb-1">Ingreso Anual (Escala)</span>
                        <span className="font-bold text-gray-900">{selectedCredito.ingreso_anual_uit} UIT</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Acciones del Comité */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-3">Dictamen del Comité</h3>
                <p className="text-sm text-gray-500 mb-5">Determina el estado final de esta solicitud de crédito. Esta acción registrará el usuario que autoriza.</p>
                
                <div className="flex flex-wrap gap-3">
                  {(selectedCredito.estado === 'PENDIENTE' || selectedCredito.estado === 'ENVIADO') && (
                    <>
                      <button 
                        onClick={() => handleUpdateEstado('APROBADO')}
                        disabled={isUpdating}
                        className="bg-[#008c4a] hover:bg-[#006132] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-center flex justify-center items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Aprobar Crédito
                      </button>
                      <button 
                        onClick={() => handleUpdateEstado('RECHAZADO')}
                        disabled={isUpdating}
                        className="bg-white hover:bg-red-50 text-red-600 font-bold py-3 px-6 rounded-lg transition-all border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-center flex justify-center items-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Denegar
                      </button>
                    </>
                  )}
                  {selectedCredito.estado === 'APROBADO' && (
                    <button 
                      onClick={() => handleUpdateEstado('DESEMBOLSADO')}
                      disabled={isUpdating}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full text-center flex justify-center items-center gap-2"
                    >
                      <Banknote className="w-5 h-5" />
                      Procesar Desembolso
                    </button>
                  )}
                  {(selectedCredito.estado === 'DESEMBOLSADO' || selectedCredito.estado === 'RECHAZADO') && (
                    <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        El expediente se encuentra en estado terminal. No requiere más acciones.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
