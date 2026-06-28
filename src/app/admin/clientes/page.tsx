import { readDB } from '@/data/db'
import Link from 'next/link'
import { Users, ShieldCheck, ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function ClientesPage() {
  const db = readDB()

  // 1. Fetchear todos los clientes que no sean ADMIN
  const clientes = db.users.filter((u: any) => u.rol !== 'ADMIN')

  // 2. Fetchear tarjetas de esos clientes
  let tarjetasMap: Record<string, any> = {};
  if (clientes && clientes.length > 0) {
    if (db.tarjetas) {
      db.tarjetas.forEach((t: any) => {
        tarjetasMap[t.user_id] = t;
      });
    }
  }

  // Helper para enmascarar tarjeta
  const maskCard = (num: string) => {
    if (!num || num.length < 16) return 'No registrada';
    return `•••• •••• •••• ${num.slice(-4)}`;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#008c4a]" />
            Directorio de Clientes
          </h1>
          <p className="text-gray-500 mt-2">Gestión y auditoría de perfiles y credenciales seguras.</p>
        </div>
        <Link href="/admin" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#008c4a] transition-all shadow-sm flex items-center gap-2">
          &larr; Regresar al Panel
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008c4a] to-[#00b05b]"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <th className="p-5">Titular / Identidad</th>
                <th className="p-5">Contacto</th>
                <th className="p-5">Credencial Segura</th>
                <th className="p-5">Nivel de Acceso</th>
                <th className="p-5 text-right">Expediente</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {clientes?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">
                    <Users className="w-12 h-12 mx-auto text-gray-200 mb-3" />
                    No se encontraron clientes registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                clientes?.map((cliente) => {
                  const tarjeta = tarjetasMap[cliente.id];
                  return (
                    <tr key={cliente.id} className="hover:bg-[#008c4a]/5 transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-gray-900 text-base group-hover:text-[#008c4a] transition-colors">
                          {cliente.nombres} {cliente.apellidos}
                        </div>
                        <div className="text-xs text-gray-400 font-mono mt-1">ID: {cliente.id.split('-')[0]}</div>
                      </td>
                      <td className="p-5 text-gray-600">
                        <div className="font-medium text-gray-800">DNI: {cliente.dni}</div>
                        <div className="text-sm mt-0.5">{cliente.celular}</div>
                      </td>
                      <td className="p-5">
                        {tarjeta ? (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                              <ShieldCheck className="w-5 h-5 text-[#008c4a]" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono font-medium text-gray-700 tracking-wider">{maskCard(tarjeta.numero_tarjeta)}</span>
                              <div className="flex gap-3 text-xs text-gray-400 font-mono">
                                <span>Vence: {tarjeta.fecha_expiracion}</span>
                                <span>CVC: ***</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                            Sin credencial activa
                          </span>
                        )}
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#008c4a]/10 text-[#008c4a] uppercase tracking-wide">
                          {cliente.rol}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <Link href={`/admin/clientes/${cliente.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#008c4a] hover:text-[#006132] bg-[#008c4a]/5 px-3 py-1.5 rounded-lg transition-colors">
                          Ver Perfil
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        {clientes?.length === 100 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs font-medium text-gray-500 uppercase tracking-widest">
            Limitado a los últimos 100 registros
          </div>
        )}
      </div>
    </div>
  )
}
