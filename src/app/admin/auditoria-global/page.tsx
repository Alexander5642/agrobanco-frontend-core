import { readDB } from '@/data/db'
import { FileText, CheckCircle2, Database, Calculator, Leaf, Search } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function AdminAuditoriaGlobalPage({ searchParams }: { searchParams?: { q?: string } }) {
  const db = readDB()
  const q = searchParams?.q?.toLowerCase() || ''

  let creditos = db.creditos
    .map(credito => {
      const cliente = db.users.find(u => u.id === credito.user_id) || {}
      return {
        ...credito,
        clientes: {
          nombres: cliente.nombres || 'Cliente',
          apellidos: cliente.apellidos || 'Desconocido',
          dni: cliente.dni || '00000000'
        }
      }
    })
    .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())

  // Cálculos globales (antes de aplicar el filtro de búsqueda para no alterar el dashboard resumen)
  const totalCasos = db.creditos.length
  const aprobados = db.creditos.filter(c => c.estado === 'APROBADO' || c.estado === 'DESEMBOLSADO').length
  const carteraTotal = db.creditos.reduce((acc, c) => acc + c.monto, 0)
  const interesTotal = db.creditos.reduce((acc, c) => acc + c.intereses, 0)

  // Aplicar filtro si existe
  if (q) {
    creditos = creditos.filter(c => 
      c.destino.toLowerCase().includes(q) ||
      c.clientes.nombres.toLowerCase().includes(q) ||
      c.clientes.apellidos.toLowerCase().includes(q) ||
      c.clientes.dni.includes(q)
    )
  }

  const formatMoney = (amount: number) => `S/ ${Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-brand p-2.5 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Auditoría Global</h1>
              <p className="text-gray-500 text-sm">Registro histórico y evaluación financiera de la base de datos real del banco</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="bg-blue-50 p-3 rounded-xl">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium">Total Créditos</p>
            <p className="text-2xl font-bold text-gray-900">{totalCasos}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="bg-green-50 p-3 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium">Aprobados / Desembolsados</p>
            <p className="text-2xl font-bold text-green-600">{aprobados}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="bg-purple-50 p-3 rounded-xl">
            <Database className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium">Cartera Total</p>
            <p className="text-lg font-bold text-gray-900">{formatMoney(carteraTotal)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="bg-amber-50 p-3 rounded-xl">
            <Calculator className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium">Intereses Esperados</p>
            <p className="text-lg font-bold text-amber-700">{formatMoney(interesTotal)}</p>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-brand-dark p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-brand-accent" />
            <h3 className="font-bold text-sm">Tabla General de Operaciones Crediticias</h3>
          </div>
        </div>

        <div className="p-4 bg-white border-b border-gray-100">
          <form method="GET" className="relative max-w-sm flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="Buscar por DNI, Nombre o Destino..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors"
            />
            <button type="submit" className="hidden">Buscar</button>
          </form>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs border-b border-gray-100">
                <th className="p-3 font-semibold">Cliente</th>
                <th className="p-3 font-semibold">Destino del Crédito</th>
                <th className="p-3 font-semibold text-right">Monto (S/)</th>
                <th className="p-3 font-semibold text-center">Plazo</th>
                <th className="p-3 font-semibold text-center">TEA%</th>
                <th className="p-3 font-semibold text-right">Cuota Mensual</th>
                <th className="p-3 font-semibold text-right">Total a Pagar</th>
                <th className="p-3 font-semibold text-right">Intereses</th>
                <th className="p-3 font-semibold text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {creditos.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">No se encontraron créditos registrados en la base de datos.</td>
                </tr>
              ) : (
                creditos.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{res.clientes.nombres} {res.clientes.apellidos}</p>
                      <p className="text-xs text-gray-500 font-mono">DNI: {res.clientes.dni}</p>
                    </td>
                    <td className="p-3 text-gray-700 font-medium max-w-[200px] truncate" title={res.destino}>{res.destino}</td>
                    <td className="p-3 text-right font-mono font-bold text-gray-900">{formatMoney(res.monto)}</td>
                    <td className="p-3 text-center text-gray-600">{res.meses}m</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${res.tea > 42 ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'}`}>
                        {res.tea}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-brand font-bold">{formatMoney(res.cuota_mes)}</td>
                    <td className="p-3 text-right font-mono text-gray-600">{formatMoney(res.total)}</td>
                    <td className="p-3 text-right font-mono text-amber-600">{formatMoney(res.intereses)}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 py-1 px-2.5 rounded-md text-xs font-bold uppercase tracking-wider
                        ${res.estado === 'APROBADO' || res.estado === 'DESEMBOLSADO' ? 'bg-green-50 text-green-700 border border-green-100' : 
                          res.estado === 'VENCIDO' ? 'bg-red-50 text-red-700 border border-red-100' : 
                          'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                        {res.estado.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
