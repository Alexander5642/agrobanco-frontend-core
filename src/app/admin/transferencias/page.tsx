import { readDB } from '@/data/db'
import { Activity, ArrowDownRight, ArrowUpRight, Search } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function AdminTransferenciasPage({ searchParams }: { searchParams?: { q?: string } }) {
  const db = readDB()

  const q = searchParams?.q?.toLowerCase() || ''

  // Traer movimientos uniendo cuentas y clientes
  let movimientos = db.movimientos
    .map((mov: any) => {
      const cuenta = db.cuentas.find((c: any) => c.id === mov.cuenta_id) || {}
      const cliente = db.users.find((u: any) => u.id === cuenta.user_id) || {}
      return {
        ...mov,
        creado_en: mov.fecha || new Date().toISOString(),
        cuentas: {
          numero_cuenta: cuenta.numero_cuenta || 'No asignada',
          clientes: {
            nombres: cliente.nombres || 'Desconocido',
            apellidos: cliente.apellidos || '',
            dni: cliente.dni || '00000000'
          }
        }
      }
    })
    .sort((a: any, b: any) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())

  if (q) {
    movimientos = movimientos.filter(mov => 
      mov.cuentas.clientes.nombres.toLowerCase().includes(q) || 
      mov.cuentas.clientes.apellidos.toLowerCase().includes(q) || 
      mov.cuentas.clientes.dni.includes(q) ||
      mov.tipo.toLowerCase().includes(q)
    )
  }

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Auditoría Global</h1>
          <p className="text-gray-500">Historial completo de todas las operaciones del banco</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <form method="GET" className="relative flex-1 max-w-md flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="Buscar por DNI, Nombre o Tipo..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
            <button type="submit" className="hidden">Buscar</button>
          </form>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-gray-100">Fecha y Hora</th>
                <th className="p-4 font-bold border-b border-gray-100">Cliente (Origen/Destino)</th>
                <th className="p-4 font-bold border-b border-gray-100">Operación</th>
                <th className="p-4 font-bold border-b border-gray-100 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No hay movimientos registrados en el banco.</td>
                </tr>
              ) : (
                movimientos.map((mov) => {
                  const cliente = mov.cuentas?.clientes
                  return (
                    <tr key={mov.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(mov.creado_en).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{cliente?.nombres} {cliente?.apellidos}</p>
                        <p className="text-xs text-gray-500 font-mono">Cta: {mov.cuentas?.numero_cuenta} • DNI: {cliente?.dni}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={mov.es_ingreso ? "bg-green-100 p-1.5 rounded-full shrink-0" : "bg-red-100 p-1.5 rounded-full shrink-0"}>
                            {mov.es_ingreso ? <ArrowDownRight className="w-4 h-4 text-brand" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{mov.tipo}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-bold ${mov.es_ingreso ? 'text-brand' : 'text-red-500'}`}>
                           {mov.es_ingreso ? '+' : '-'} {formatMoney(mov.monto)}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
