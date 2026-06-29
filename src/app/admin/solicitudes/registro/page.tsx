import pool from '@/lib/db'
import { FileText, Send } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function RegistroSolicitudPage() {
  const { rows } = await pool.query(`
    SELECT c.*, u.nombres, u.apellidos, u.dni, u.celular 
    FROM creditos c
    JOIN usuarios u ON c.user_id = u.id
    WHERE c.estado = 'REGISTRO'
    ORDER BY c.creado_en DESC
  `);
  
  const creditos = rows.map(row => ({
    ...row, 
    creado_en: row.creado_en ? new Date(row.creado_en).toISOString() : null, 
    actualizado_en: row.actualizado_en ? new Date(row.actualizado_en).toISOString() : null,
    clientes: {
      nombres: row.nombres || 'Cliente',
      apellidos: row.apellidos || 'Desconocido',
      dni: row.dni || '00000000',
      celular: row.celular || 'No registrado'
    }
  }));

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 p-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Solicitud</h1>
        <p className="text-gray-500">Ingreso de datos del prospecto y armado del expediente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="bg-emerald-50 p-4 rounded-full">
            <FileText className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Expedientes en Trámite</p>
            <p className="text-3xl font-bold text-gray-900">{creditos.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Casos en Registro</h3>
        </div>
        
        <div className="flex flex-col">
          {creditos.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No hay expedientes en proceso de registro.</div>
          ) : (
            creditos.map((credito) => (
               <div key={credito.id} className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-full bg-emerald-100">
                    <FileText className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{credito.clientes?.nombres} {credito.clientes?.apellidos}</h4>
                    <p className="text-sm text-gray-500 mb-1">DNI: {credito.clientes?.dni} • Expediente abierto: {new Date(credito.creado_en).toLocaleString()}</p>
                    <p className="font-medium text-gray-700">
                      Monto a solicitar: <span className="font-bold text-emerald-600">{formatMoney(credito.monto)}</span> a {credito.meses} meses
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1.5 font-bold text-xs rounded-lg uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {credito.estado.replace('_', ' ')}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                     <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-xl text-sm transition-colors">
                       Editar Expediente
                     </button>
                    {Number(credito.monto) < 15000 ? (
                      <form action={async () => {
                           'use server'
                           const { updateEstadoCredito } = await import('@/app/admin/actions');
                           await updateEstadoCredito(credito.id, 'APROBADO');
                      }}>
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2">
                          Aprobar Directamente (Riesgo Bajo) <Send className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <form action={async () => {
                           'use server'
                           const { updateEstadoCredito } = await import('@/app/admin/actions');
                           await updateEstadoCredito(credito.id, 'EN_COMITE');
                      }}>
                        <button type="submit" className="px-4 py-2 bg-brand text-white hover:bg-brand-dark font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2">
                          Derivar a Comité <Send className="w-4 h-4" />
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
