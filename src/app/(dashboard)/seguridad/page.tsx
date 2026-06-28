'use client'

import { ShieldCheck, Lock, Smartphone, AlertTriangle, Key } from 'lucide-react'

export default function SeguridadPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seguridad y Preferencias</h1>
        <p className="text-gray-500">Gestiona tus contraseñas, topes y bloqueos preventivos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cambio de Clave */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Cambio de Clave Virtual</h3>
              <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso web</p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <input type="password" placeholder="Clave actual" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <input type="password" placeholder="Nueva clave (solo números)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <input type="password" placeholder="Confirmar nueva clave" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <button type="button" className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">
              Actualizar Clave
            </button>
          </form>
        </div>

        {/* Soft Token */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-full text-brand">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Autenticación Soft Token</h3>
                <p className="text-sm text-gray-500">Validación de transacciones en 2 pasos</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              Tu aplicación móvil (App Agrobanco) está vinculada a este perfil. Actualmente las transferencias mayores a S/ 500 requieren confirmación con Token.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <span className="font-bold text-gray-700">Estado del Token</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> ACTIVO
            </span>
          </div>
        </div>

        {/* Bloqueo Preventivo */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-full text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Bloqueo Preventivo de Productos</h3>
              <p className="text-sm text-gray-500">Congela tus tarjetas o cuentas temporalmente si sospechas de fraude</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-red-300 transition-colors cursor-pointer group">
              <Lock className="w-6 h-6 text-gray-400 mb-2 group-hover:text-red-500 transition-colors" />
              <span className="font-bold text-gray-700 text-sm">Bloquear Tarjeta Débito</span>
              <span className="text-xs text-gray-400 mt-1">Terminada en 4821</span>
            </div>
            <div className="border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-red-300 transition-colors cursor-pointer group">
              <Lock className="w-6 h-6 text-gray-400 mb-2 group-hover:text-red-500 transition-colors" />
              <span className="font-bold text-gray-700 text-sm">Bloquear Banca Virtual</span>
              <span className="text-xs text-gray-400 mt-1">Cierra todas las sesiones</span>
            </div>
            <div className="bg-red-50 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-red-100">
              <span className="font-bold text-red-700 text-sm mb-2">¿Pérdida o Robo?</span>
              <p className="text-xs text-red-600 mb-3">Llama inmediatamente a nuestra línea de emergencias 24/7</p>
              <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 w-full">Llamar al (601) 338 0000</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
