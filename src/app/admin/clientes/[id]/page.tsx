import { readDB } from '@/data/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Phone, MapPin, Calendar, Wallet, FileText, ArrowDownRight, ArrowUpRight } from 'lucide-react'

import ClientMovements from './ClientMovements';

// Utiliza el id del params
export default async function AdminClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = readDB()

  // Traer cliente
  const cliente = db.users.find((u: any) => u.id === id)
  if (!cliente) return <div>Cliente no encontrado</div>

  // Traer cuenta
  const cuenta = db.cuentas.find((c: any) => c.user_id === id)

  // Traer creditos
  const creditos = db.creditos.filter((c: any) => c.user_id === id).sort((a: any, b: any) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())

  // Traer movimientos
  let movimientos: any[] = []
  if (cuenta) {
    movimientos = db.movimientos.filter((m: any) => m.cuenta_id === cuenta.id).map(m => ({...m, creado_en: m.fecha || new Date().toISOString()})).sort((a: any, b: any) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())
  }

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="mb-4">
        <Link href="/admin" className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver al listado
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expediente de Cliente</h1>
        <p className="text-gray-500">ID: {cliente.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Perfil y Cuenta */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                <User className="w-8 h-8 text-brand" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{cliente.nombres} {cliente.apellidos}</h3>
                <p className="text-sm text-gray-500 font-mono">DNI: {cliente.dni}</p>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{cliente.celular || 'No registrado'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{cliente.direccion || 'No registrada'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Nacimiento: {cliente.fecha_nacimiento ? new Date(cliente.fecha_nacimiento).toLocaleDateString() : 'No registrado'}</span>
              </div>
            </div>
          </div>

          {cuenta ? (
            <div className="bg-brand rounded-2xl shadow-sm p-6 text-white">
              <div className="flex items-center gap-2 mb-4 text-white/80">
                <Wallet className="w-5 h-5" />
                <h3 className="font-bold text-sm">Cuenta de Ahorros</h3>
              </div>
              <h2 className="text-4xl font-bold mb-2">{formatMoney(cuenta.saldo)}</h2>
              <p className="font-mono text-white/80 text-sm">{cuenta.numero_cuenta}</p>
            </div>
          ) : (
             <div className="bg-gray-100 rounded-2xl shadow-sm p-6 text-gray-500 text-center">
               El cliente no tiene cuenta activa.
             </div>
          )}
        </div>

        {/* Columna Derecha: Créditos y Movimientos */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Historial de Créditos</h3>
            </div>
            <div className="flex flex-col">
              {!creditos || creditos.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">El cliente no ha solicitado créditos.</div>
              ) : (
                creditos.slice(0, 5).map((credito) => (
                  <div key={credito.id} className="p-4 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{formatMoney(credito.monto)} <span className="text-sm font-normal text-gray-500">a {credito.meses} meses</span></p>
                      <p className="text-xs text-gray-500">{new Date(credito.creado_en).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 font-bold text-[10px] rounded-lg uppercase tracking-wider ${
                      credito.estado === 'ENVIADO' ? 'bg-yellow-100 text-yellow-800' :
                      credito.estado === 'APROBADO' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {credito.estado}
                    </span>
                  </div>
                ))
              )}
              {creditos.length > 5 && (
                 <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                   <Link href="/admin/solicitudes" className="text-sm font-bold text-brand hover:underline">
                     Ir a la bandeja de todas las solicitudes
                   </Link>
                 </div>
              )}
            </div>
          </div>

          <ClientMovements movimientos={movimientos} />

        </div>
      </div>
    </div>
  )
}
