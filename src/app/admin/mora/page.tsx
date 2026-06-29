import pool from '@/lib/db'
import { AlertCircle, Scale, ShieldAlert } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function AdminMoraPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q?.toLowerCase() || ''

  // Jalar créditos morosos, judiciales o castigados
  const { rows } = await pool.query(`
    SELECT c.*, u.nombres, u.apellidos, u.dni, u.celular 
    FROM creditos c
    JOIN usuarios u ON c.user_id = u.id
    WHERE c.estado IN ('VENCIDO', 'JUDICIAL', 'CASTIGO')
    ORDER BY c.creado_en DESC
  `);
  
  let creditos = rows.map(row => ({
    ...row, 
    creado_en: row.creado_en ? new Date(row.creado_en).toISOString() : null, 
    clientes: {
      nombres: row.nombres || 'Cliente',
      apellidos: row.apellidos || 'Desconocido',
      dni: row.dni || '00000000',
      celular: row.celular || 'No registrado'
    }
  }));

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bandeja de Cobranzas y Mora</h1>
        <p className="text-gray-500">Gestión de cartera atrasada (Prevención, Judicial y Castigo)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Clientes en Mora / Judicial</p>
            <p className="text-3xl font-bold text-gray-900">{creditos.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Cartera en Riesgo</h3>
          <form method="GET" className="flex items-center">
            <input type="text" name="q" placeholder="Buscar DNI o nombre..." defaultValue={q} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            <button type="submit" className="ml-2 px-3 py-1.5 bg-brand text-white text-sm rounded-lg font-medium">Buscar</button>
          </form>
        </div>
        
        <div className="flex flex-col overflow-y-auto max-h-[600px]">
          {creditos.length === 0 ? (
            <div className="p-12 text-center text-gray-500">¡Excelente! No hay clientes en mora actualmente.</div>
          ) : (
            creditos.map((credito) => (
              <div key={credito.id} className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-full bg-red-100">
                    {credito.estado === 'JUDICIAL' ? (
                       <Scale className="w-6 h-6 text-red-700" />
                    ) : credito.estado === 'CASTIGO' ? (
                       <ShieldAlert className="w-6 h-6 text-red-700" />
                    ) : (
                       <AlertCircle className="w-6 h-6 text-red-700" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{credito.clientes?.nombres} {credito.clientes?.apellidos}</h4>
                    <p className="text-sm text-gray-500 mb-1">DNI: {credito.clientes?.dni} • Tel: {credito.clientes?.celular || 'No registrado'} • Fecha Originación: {new Date(credito.creado_en).toLocaleDateString()}</p>
                    <p className="font-medium text-gray-700">
                      Deuda Activa: <span className="font-bold text-red-600">{formatMoney(credito.total)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1.5 font-bold text-xs rounded-lg uppercase tracking-wider border ${credito.estado === 'CASTIGO' ? 'bg-gray-800 text-white border-gray-900' : credito.estado === 'JUDICIAL' ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                    {credito.estado}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    {credito.estado === 'VENCIDO' && (
                       <form action={async () => {
                           'use server'
                           const { updateEstadoCredito } = await import('@/app/admin/actions');
                           await updateEstadoCredito(credito.id, 'JUDICIAL');
                       }}>
                         <button type="submit" className="px-3 py-1.5 bg-orange-600 text-white hover:bg-orange-700 font-bold rounded-xl text-sm shadow-sm transition-colors">
                           Derivar a Judicial (&gt;121d)
                         </button>
                       </form>
                    )}

                    {(credito.estado === 'VENCIDO' || credito.estado === 'JUDICIAL') && (
                       <form action={async () => {
                           'use server'
                           const { updateEstadoCredito } = await import('@/app/admin/actions');
                           await updateEstadoCredito(credito.id, 'CASTIGO');
                       }}>
                         <button type="submit" className="px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-900 font-bold rounded-xl text-sm shadow-sm transition-colors">
                           Castigar Cartera (&gt;180d)
                         </button>
                       </form>
                    )}
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
