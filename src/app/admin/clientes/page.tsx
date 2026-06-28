import { readDB } from '@/data/db'
import Link from 'next/link'

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Clientes y Tarjetas</h1>
          <p className="text-slate-500 mt-1">Viendo clientes y sus tarjetas virtuales asociadas (Datos Seguros).</p>
        </div>
        <Link href="/admin" className="px-4 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
          &larr; Volver al Panel
        </Link>
      </div>



      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">DNI / Celular</th>
                <th className="p-4 font-semibold">Tarjeta (Segura)</th>
                <th className="p-4 font-semibold">Rol</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {clientes?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No se encontraron clientes en la base de datos.
                  </td>
                </tr>
              ) : (
                clientes?.map((cliente) => {
                  const tarjeta = tarjetasMap[cliente.id];
                  return (
                    <tr key={cliente.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">
                        {cliente.nombres} {cliente.apellidos}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{cliente.dni}</div>
                        <div className="text-xs text-slate-400">{cliente.celular}</div>
                      </td>
                      <td className="p-4">
                        {tarjeta ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-slate-700 tracking-widest">{maskCard(tarjeta.numero_tarjeta)}</span>
                            <div className="flex gap-2 text-xs text-slate-400 font-mono">
                              <span>EXP: {tarjeta.fecha_expiracion}</span>
                              <span>CVV: •••</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Sin tarjeta generada</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          {cliente.rol}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/admin/clientes/${cliente.id}`} className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1 rounded">
                          Ver Detalle
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
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-500">
            Mostrando los 100 registros más recientes.
          </div>
        )}
      </div>
    </div>
  )
}
