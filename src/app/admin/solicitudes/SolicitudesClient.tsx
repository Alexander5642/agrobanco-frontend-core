'use client'

import React, { useState } from 'react'
import { Filter, Search, CreditCard, X } from 'lucide-react'
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
      // The server action revalidatePath('/admin') might not revalidate this path, but let's assume it does or we just refresh local state
      window.location.reload();
    } catch (error) {
      alert("Error al actualizar el estado");
    }
    setIsUpdating(false);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-[#008c4a]" />
          Bandeja de Flujo de Trabajo (Solicitudes)
        </h2>
        
        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 bg-white shadow-sm p-2 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            <select 
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer py-1"
            >
              <option value="TODOS">Todos los estados</option>
              <option value="PENDIENTE">En Evaluación (Pendiente)</option>
              <option value="ENVIADO">Enviado (Nuevo)</option>
              <option value="APROBADO">Aprobado (Comité)</option>
              <option value="DESEMBOLSADO">Desembolsado</option>
              <option value="RECHAZADO">Rechazado</option>
            </select>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2 px-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Ej. Juan o DNI"
              value={searchFiltro}
              onChange={(e) => setSearchFiltro(e.target.value)}
              className="bg-transparent text-sm outline-none w-48 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 rounded-t-lg border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">ID Solicitud</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Tipo / Destino</th>
                <th className="px-6 py-4">Monto / Plazo</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 rounded-tr-lg">Fecha Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCreditos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400 font-medium">No se encontraron solicitudes que coincidan con los filtros.</td>
                </tr>
              ) : (
                filteredCreditos.map((c: any, i: number) => {
                  let badgeColor = 'bg-gray-100 text-gray-800';
                  if (c.estado === 'APROBADO') badgeColor = 'bg-green-100 text-green-800';
                  if (c.estado === 'PENDIENTE' || c.estado === 'ENVIADO') badgeColor = 'bg-yellow-100 text-yellow-800';
                  if (c.estado === 'DESEMBOLSADO') badgeColor = 'bg-blue-100 text-blue-800';
                  if (c.estado === 'RECHAZADO') badgeColor = 'bg-red-100 text-red-800';

                  return (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedCredito(c)}
                      className="hover:bg-brand/5 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900 uppercase">
                        {c.id.includes('-') ? c.id.split('-').slice(0,2).join('-') : c.id.slice(0,8)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{c.user_name}</div>
                        <div className="text-xs text-gray-500">DNI: {c.user_dni}</div>
                      </td>
                      <td className="px-6 py-4 font-medium max-w-[200px] truncate">
                        {c.tipo_credito || c.destino || 'Crédito General'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{formatMoney(c.monto)}</div>
                        <div className="text-xs text-gray-500">{c.meses} meses ({c.frecuencia_pago || 'Mensual'})</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider border border-current ${badgeColor}`}>
                          {c.estado.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(c.creado_en).toLocaleDateString()}
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
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-sm transition-all">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detalle de Solicitud</h2>
                <p className="text-sm text-gray-500 font-mono mt-1 uppercase">{selectedCredito.id}</p>
              </div>
              <button 
                onClick={() => setSelectedCredito(null)}
                className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cliente</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedCredito.user_name}</p>
                  <p className="text-sm text-gray-500">DNI: {selectedCredito.user_dni}</p>
                  <Link href={`/admin/clientes/${selectedCredito.user_id}`} className="inline-block mt-2 text-xs font-bold text-brand hover:underline">
                    Ver expediente completo del cliente &rarr;
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Estado Actual</p>
                  <span className={`inline-block mt-1 px-3 py-1 text-xs font-bold uppercase rounded-md border ${
                    selectedCredito.estado === 'APROBADO' ? 'bg-green-100 text-green-800 border-green-200' :
                    (selectedCredito.estado === 'PENDIENTE' || selectedCredito.estado === 'ENVIADO') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    selectedCredito.estado === 'DESEMBOLSADO' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {selectedCredito.estado}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Información del Crédito</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="text-gray-500 block mb-1">Tipo de Fondo</span>
                    <span className="font-bold text-gray-900">{selectedCredito.tipo_credito || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Frecuencia de Pago</span>
                    <span className="font-bold text-gray-900">{selectedCredito.frecuencia_pago || 'Mensual'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Monto Solicitado</span>
                    <span className="font-bold text-[#008c4a] text-lg">{formatMoney(selectedCredito.monto)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Plazo</span>
                    <span className="font-bold text-gray-900">{selectedCredito.meses} meses</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">TEA Asignada</span>
                    <span className="font-bold text-gray-900">{selectedCredito.tea}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Total a Pagar Aprox.</span>
                    <span className="font-bold text-gray-900">{selectedCredito.total ? formatMoney(selectedCredito.total) : 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Reglas Agrobanco Dinámicas */}
              {(selectedCredito.hectareas || selectedCredito.cabezas_ganado || selectedCredito.ingreso_anual_uit) && (
                <div className="bg-brand/5 rounded-xl p-6 border border-brand/10 mb-8">
                  <h3 className="font-bold text-brand mb-4 border-b border-brand/10 pb-2">Evaluación Agropecuaria</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    {selectedCredito.hectareas && (
                      <div>
                        <span className="text-gray-500 block mb-1">Hectáreas Declaradas</span>
                        <span className="font-bold text-gray-900">{selectedCredito.hectareas} ha</span>
                      </div>
                    )}
                    {selectedCredito.cabezas_ganado && (
                      <div>
                        <span className="text-gray-500 block mb-1">Cabezas de Ganado</span>
                        <span className="font-bold text-gray-900">{selectedCredito.cabezas_ganado}</span>
                      </div>
                    )}
                    {selectedCredito.ingreso_anual_uit && (
                      <div>
                        <span className="text-gray-500 block mb-1">Ingreso Anual (UIT)</span>
                        <span className="font-bold text-gray-900">{selectedCredito.ingreso_anual_uit} UIT</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Acciones del Administrador */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Acciones de Flujo (Comité)</h3>
                <div className="flex flex-wrap gap-3">
                  {(selectedCredito.estado === 'PENDIENTE' || selectedCredito.estado === 'ENVIADO') && (
                    <>
                      <button 
                        onClick={() => handleUpdateEstado('APROBADO')}
                        disabled={isUpdating}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                      >
                        Aprobar Solicitud
                      </button>
                      <button 
                        onClick={() => handleUpdateEstado('RECHAZADO')}
                        disabled={isUpdating}
                        className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2.5 px-6 rounded-lg transition-colors border border-red-200 disabled:opacity-50"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {selectedCredito.estado === 'APROBADO' && (
                    <button 
                      onClick={() => handleUpdateEstado('DESEMBOLSADO')}
                      disabled={isUpdating}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                    >
                      Realizar Desembolso
                    </button>
                  )}
                  {(selectedCredito.estado === 'DESEMBOLSADO' || selectedCredito.estado === 'RECHAZADO') && (
                    <p className="text-sm text-gray-500 italic">No hay acciones disponibles para este estado.</p>
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
