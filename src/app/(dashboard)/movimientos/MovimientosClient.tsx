'use client'

import { useState } from 'react'
import { Search, Download, Filter, ArrowDownRight, ArrowUpRight, Calendar, ArrowRightLeft } from 'lucide-react'

export default function MovimientosClient({ movimientosIniciales }: { movimientosIniciales: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT'>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  // Filtering logic
  const filteredMovimientos = movimientosIniciales.filter(mov => {
    const matchesSearch = mov.tipo.toLowerCase().includes(searchTerm.toLowerCase()) || mov.monto.toString().includes(searchTerm)
    
    if (!matchesSearch) return false
    
    if (filterType === 'IN' && !mov.es_ingreso) return false
    if (filterType === 'OUT' && mov.es_ingreso) return false
    
    return true
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredMovimientos.length / itemsPerPage)
  const paginatedMovimientos = filteredMovimientos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Movimientos</h1>
          <p className="text-gray-500">Historial de transacciones de tus cuentas</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 active:scale-95">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center bg-gray-50/50">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por descripción o monto..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          
          <div className="flex items-center gap-2 sm:border-l sm:border-gray-200 sm:pl-4 w-full sm:w-auto overflow-x-auto">
            <button 
              onClick={() => { setFilterType('ALL'); setCurrentPage(1); }}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${filterType === 'ALL' ? 'bg-brand text-white' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'}`}
            >
              <Filter className={`w-4 h-4 ${filterType === 'ALL' ? 'text-white' : 'text-gray-500'}`} />
              Todos
            </button>
            <button 
              onClick={() => { setFilterType('IN'); setCurrentPage(1); }}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${filterType === 'IN' ? 'bg-brand text-white' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'}`}
            >
              <ArrowDownRight className={`w-4 h-4 ${filterType === 'IN' ? 'text-white' : 'text-green-500'}`} />
              Ingresos
            </button>
            <button 
              onClick={() => { setFilterType('OUT'); setCurrentPage(1); }}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${filterType === 'OUT' ? 'bg-brand text-white' : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'}`}
            >
              <ArrowUpRight className={`w-4 h-4 ${filterType === 'OUT' ? 'text-white' : 'text-red-500'}`} />
              Egresos
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider bg-white">
          <div className="col-span-3">Fecha</div>
          <div className="col-span-6">Descripción</div>
          <div className="col-span-3 text-right">Monto</div>
        </div>

        {/* Transactions List */}
        <div className="flex flex-col">
          {paginatedMovimientos.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <ArrowRightLeft className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">No hay movimientos para mostrar con estos filtros</p>
            </div>
          ) : (
            paginatedMovimientos.map((mov, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-4 border-b border-gray-50 items-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="col-span-1 sm:col-span-3 text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                  {new Date(mov.creado_en).toLocaleString()}
                </div>
                <div className="col-span-1 sm:col-span-6 flex items-center gap-3 order-1 sm:order-2">
                  <div className={mov.es_ingreso ? "bg-green-100 p-2 rounded-full" : "bg-red-100 p-2 rounded-full"}>
                    {mov.es_ingreso ? <ArrowDownRight className="w-4 h-4 text-brand" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-1">{mov.tipo}</p>
                    <p className="text-xs text-gray-500">Operación exitosa</p>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-3 text-right order-3">
                  <p className={`font-bold text-lg ${mov.es_ingreso ? 'text-brand' : 'text-red-500'}`}>
                    {mov.es_ingreso ? '+' : '-'} {formatMoney(mov.monto)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
            <p>Mostrando {paginatedMovimientos.length} de {filteredMovimientos.length} resultados</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
