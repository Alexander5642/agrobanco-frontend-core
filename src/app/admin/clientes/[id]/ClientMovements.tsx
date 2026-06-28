'use client'

import React, { useState } from 'react'
import { Wallet, ArrowDownRight, ArrowUpRight, Search } from 'lucide-react'

export default function ClientMovements({ movimientos }: { movimientos: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(5)

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  const filteredMovimientos = movimientos.filter(mov => 
    mov.tipo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mov.monto.toString().includes(searchTerm)
  )

  const displayedMovimientos = filteredMovimientos.slice(0, visibleCount)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-gray-900">Historial de Movimientos</h3>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar operación o monto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-700 w-48"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {filteredMovimientos.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No se encontraron movimientos.</div>
        ) : (
          displayedMovimientos.map((mov) => (
            <div key={mov.id} className="p-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={mov.es_ingreso ? "bg-green-100 p-2 rounded-full" : "bg-red-100 p-2 rounded-full"}>
                  {mov.es_ingreso ? <ArrowDownRight className="w-4 h-4 text-[#008c4a]" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{mov.tipo}</p>
                  <p className="text-xs text-gray-500">{new Date(mov.creado_en).toLocaleString()}</p>
                </div>
              </div>
              <p className={`font-bold text-sm ${mov.es_ingreso ? 'text-[#008c4a]' : 'text-red-500'}`}>
                {mov.es_ingreso ? '+' : '-'} {formatMoney(mov.monto)}
              </p>
            </div>
          ))
        )}
      </div>
      
      {filteredMovimientos.length > visibleCount && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="text-sm font-bold text-[#008c4a] hover:underline"
          >
            Ver más movimientos
          </button>
        </div>
      )}
    </div>
  )
}
