import { readDB, writeDB } from '@/data/db'
import { FileText, Send } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function RegistroSolicitudPage() {
  const db = readDB()

  // Jalar todos los prospectos en proceso de registro de solicitud
  const creditos = db.creditos
    .filter(c => c.estado === 'REGISTRO')
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
                    {credito.estado}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                     <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-xl text-sm transition-colors">
                       Editar Expediente
                     </button>
                    {/* Botón visual para enviar a la bandeja principal */}
                    <form action={async (formData) => {
                         'use server'
                         const { readDB, writeDB } = await import('@/data/db')
                         const localDb = readDB()
                         const index = localDb.creditos.findIndex((c: any) => c.id === credito.id)
                         if (index !== -1) {
                           localDb.creditos[index].estado = 'ENVIADO'
                           writeDB(localDb)
                         }
                         const { revalidatePath } = await import('next/cache')
                         revalidatePath('/admin/solicitudes/registro')
                         revalidatePath('/admin/solicitudes')
                    }}>
                      <button type="submit" className="px-4 py-2 bg-brand text-white hover:bg-brand-dark font-bold rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2">
                        Enviar a Evaluación <Send className="w-4 h-4" />
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
