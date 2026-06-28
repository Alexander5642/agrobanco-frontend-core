import { FileText, Mail, Phone, Clock, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function AdminPQRPage() {
  // Datos dummy de atención al cliente
  let pqrData = [
      {
        id: '1',
        tipo: 'Solicitud Credito',
        nombres: 'María Gómez',
        documento: '45321890',
        telefono: '3124567890',
        email: 'maria.g@gmail.com',
        mensaje: 'Deseo información sobre el crédito Mujer Rural para mi finca cafetera.',
        estado: 'PENDIENTE',
        creado_en: new Date().toISOString()
      },
      {
        id: '2',
        tipo: 'PQR',
        nombres: 'Carlos Restrepo',
        documento: '10987654',
        telefono: '3009876543',
        email: 'carlosr@empresa.com',
        mensaje: 'El cajero de la sucursal me retuvo la tarjeta Palmera.',
        estado: 'EN_REVISION',
        creado_en: new Date(Date.now() - 86400000).toISOString()
      }
    ]

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 p-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Atención al Ciudadano (PQR)</h1>
        <p className="text-gray-500">Gestión de solicitudes web, quejas y peticiones de productos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-full">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Casos</p>
            <p className="text-3xl font-bold text-gray-900">{pqrData.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Bandeja de Entrada</h3>
        </div>
        
        <div className="flex flex-col">
          {pqrData.map((pqr) => (
            <div key={pqr.id} className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex gap-4 items-start w-full md:w-auto">
                <div className={`p-4 rounded-xl shrink-0 ${pqr.tipo === 'PQR' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-[#006132]'}`}>
                  {pqr.tipo === 'PQR' ? <AlertCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{pqr.tipo}</span>
                    <h4 className="font-bold text-gray-900">{pqr.nombres}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> DNI: {pqr.documento}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {pqr.telefono}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(pqr.creado_en).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">"{pqr.mensaje}"</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
                <span className={`px-4 py-1.5 font-bold text-xs rounded-lg uppercase tracking-wider border ${
                  pqr.estado === 'PENDIENTE' ? 'bg-red-50 text-red-600 border-red-200' :
                  pqr.estado === 'EN_REVISION' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                  'bg-green-50 text-green-600 border-green-200'
                }`}>
                  {pqr.estado}
                </span>
                <button className="px-4 py-2 mt-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-xl text-sm transition-colors w-full md:w-auto">
                  Atender Caso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
