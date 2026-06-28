import { readDB } from '@/data/db'
import { FileText, CheckCircle2, XCircle, Users } from 'lucide-react'
import { aprobarEnComite, rechazarEnComite } from './actions'

export const dynamic = 'force-dynamic';

export default async function AdminComitePage({ searchParams }: { searchParams?: { q?: string } }) {
  const db = readDB()

  const q = searchParams?.q?.toLowerCase() || ''

  // Jalar todos los créditos en comité
  let creditos = db.creditos
    .filter(c => c.estado === 'EN_COMITE')
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

  if (q) {
    creditos = creditos.filter(c => 
      c.clientes.nombres.toLowerCase().includes(q) || 
      c.clientes.apellidos.toLowerCase().includes(q) || 
      c.clientes.dni.includes(q)
    )
  }

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 p-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Propuesta y Comité</h1>
        <p className="text-gray-500">Evaluación de créditos de montos mayores que requieren comité de riesgos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-purple-50 p-4 rounded-full">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Casos en Comité</p>
            <p className="text-3xl font-bold text-gray-900">{creditos.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Bandeja de Comité</h3>
          <form method="GET" className="flex items-center">
            <input type="text" name="q" placeholder="Buscar DNI o nombre..." defaultValue={q} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            <button type="submit" className="ml-2 px-3 py-1.5 bg-brand text-white text-sm rounded-lg font-medium">Buscar</button>
          </form>
        </div>
        
        <div className="flex flex-col overflow-y-auto max-h-[600px]">
          {creditos.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No hay casos pendientes de comité.</div>
          ) : (
            creditos.map((credito) => (
              <div key={credito.id} className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-full bg-purple-100">
                    <Users className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{credito.clientes?.nombres} {credito.clientes?.apellidos}</h4>
                    <p className="text-sm text-gray-500 mb-1">DNI: {credito.clientes?.dni} • {new Date(credito.creado_en).toLocaleString()}</p>
                    <p className="font-medium text-gray-700">
                      Monto: <span className="font-bold text-brand">{formatMoney(credito.monto)}</span> a {credito.meses} meses (TEA {credito.tea}%)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1.5 font-bold text-xs rounded-lg uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                    {credito.estado.replace('_', ' ')}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    <form action={rechazarEnComite}>
                      <input type="hidden" name="credito_id" value={credito.id} />
                      <button className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl text-sm transition-colors">
                        Rechazar
                      </button>
                    </form>
                    <form action={aprobarEnComite}>
                      <input type="hidden" name="credito_id" value={credito.id} />
                      <button className="px-4 py-2 bg-brand text-white hover:bg-brand-dark font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2">
                        Aprobar Comité <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
