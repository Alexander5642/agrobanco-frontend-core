import { readDB } from '@/data/db'
import { FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function PreSolicitudPage({ searchParams }: { searchParams?: { q?: string } }) {
  const db = readDB()

  const q = searchParams?.q?.toLowerCase() || ''
  
  // Jalar todos los prospectos en pre-solicitud
  let creditos = db.creditos
    .filter(c => c.estado === 'PRE_SOLICITUD')
    .map(credito => {
      const cliente = db.users.find(u => u.id === credito.user_id) || {}
      return {
        ...credito,
        clientes: {
          nombres: cliente.nombres || 'Cliente',
          apellidos: cliente.apellidos || 'Desconocido',
          dni: cliente.dni || '00000000',
          celular: cliente.telefono || 'No registrado'
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pre-solicitudes</h1>
        <p className="text-gray-500">Evaluación inicial rápida de prospectos y leads generados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="bg-blue-50 p-4 rounded-full">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Prospectos Nuevos</p>
            <p className="text-3xl font-bold text-gray-900">{creditos.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Bandeja de Prospectos</h3>
          <form method="GET" className="flex items-center">
            <input type="text" name="q" placeholder="Buscar DNI o nombre..." defaultValue={q} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            <button type="submit" className="ml-2 px-3 py-1.5 bg-brand text-white text-sm rounded-lg font-medium">Buscar</button>
          </form>
        </div>
        
        <div className="flex flex-col overflow-y-auto max-h-[600px]">
          {creditos.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No hay pre-solicitudes pendientes en este momento.</div>
          ) : (
            creditos.map((credito) => (
              <div key={credito.id} className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-full bg-blue-100">
                    <FileText className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{credito.clientes?.nombres} {credito.clientes?.apellidos}</h4>
                    <p className="text-sm text-gray-500 mb-1">DNI: {credito.clientes?.dni} • Cel: {credito.clientes?.celular || 'No registrado'}</p>
                    <p className="font-medium text-gray-700">
                      Monto sugerido: <span className="font-bold text-blue-600">{formatMoney(credito.monto)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1.5 font-bold text-xs rounded-lg uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                    {credito.estado.replace('_', ' ')}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    <Link href={`/admin/solicitudes/registro?id=${credito.id}`} className="px-4 py-2 bg-brand text-white hover:bg-brand-dark font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2">
                      Pasar a Registro <ArrowRight className="w-4 h-4" />
                    </Link>
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
