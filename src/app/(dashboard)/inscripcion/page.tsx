'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Search, Building2, CreditCard, CheckCircle } from 'lucide-react'

interface CuentaInscrita {
  alias: string
  banco: string
  tipoProducto: string
  numeroCuenta: string
  estado: string
}

const DEFAULT_CUENTAS: CuentaInscrita[] = [
  {
    alias: 'Proveedor Semillas - Huancayo',
    banco: 'Banco de la Nación',
    tipoProducto: 'Cuenta Corriente',
    numeroCuenta: '**** 8219',
    estado: 'ACTIVA'
  },
  {
    alias: 'Fundo La Esperanza - Insumos',
    banco: 'Banco de Crédito del Perú (BCP)',
    tipoProducto: 'Cuenta de Ahorros',
    numeroCuenta: '**** 4589',
    estado: 'ACTIVA'
  }
]

export default function InscripcionCuentasPage() {
  const [paso, setPaso] = useState(1)
  const [cuentas, setCuentas] = useState<CuentaInscrita[]>([])

  // Form states
  const [banco, setBanco] = useState('')
  const [tipoProducto, setTipoProducto] = useState('Cuenta de Ahorros')
  const [numeroCuenta, setNumeroCuenta] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('DNI')
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [alias, setAlias] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('cuentas_inscritas')
    if (stored) {
      try {
        setCuentas(JSON.parse(stored))
      } catch (e) {
        setCuentas(DEFAULT_CUENTAS)
      }
    } else {
      setCuentas(DEFAULT_CUENTAS)
      localStorage.setItem('cuentas_inscritas', JSON.stringify(DEFAULT_CUENTAS))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!banco || banco === 'Selecciona un Banco') {
      setError('Por favor selecciona un banco destino')
      return
    }
    if (!numeroCuenta.trim()) {
      setError('Por favor ingresa el número de cuenta')
      return
    }
    if (!numeroDocumento.trim()) {
      setError('Por favor ingresa el número de documento del titular')
      return
    }
    if (!alias.trim()) {
      setError('Por favor ingresa un alias para la cuenta')
      return
    }

    const enmascarada = numeroCuenta.length > 4 
      ? '**** ' + numeroCuenta.slice(-4) 
      : numeroCuenta

    const nueva: CuentaInscrita = {
      alias,
      banco,
      tipoProducto,
      numeroCuenta: enmascarada,
      estado: 'ACTIVA'
    }

    const updated = [nueva, ...cuentas]
    setCuentas(updated)
    localStorage.setItem('cuentas_inscritas', JSON.stringify(updated))
    setPaso(2)

    // Reset form
    setBanco('')
    setNumeroCuenta('')
    setNumeroDocumento('')
    setAlias('')
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscripción de Cuentas</h1>
        <p className="text-gray-500">Agrega cuentas de otros bancos para realizar transferencias seguras</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Inscripción */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {paso === 1 ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-brand" /> Nueva Cuenta Destino
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-semibold">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Banco Destino</label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                    <select 
                      value={banco}
                      onChange={(e) => setBanco(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand text-gray-700 appearance-none cursor-pointer"
                    >
                      <option value="">Selecciona un Banco</option>
                      <option value="Banco de Crédito del Perú (BCP)">Banco de Crédito del Perú (BCP)</option>
                      <option value="BBVA Perú">BBVA Perú</option>
                      <option value="Interbank">Interbank</option>
                      <option value="Banco de la Nación">Banco de la Nación</option>
                      <option value="Scotiabank Perú">Scotiabank Perú</option>
                      <option value="Caja Arequipa">Caja Arequipa</option>
                      <option value="Caja Piura">Caja Piura</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Producto</label>
                    <select 
                      value={tipoProducto}
                      onChange={(e) => setTipoProducto(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand text-gray-700"
                    >
                      <option value="Cuenta de Ahorros">Cuenta de Ahorros</option>
                      <option value="Cuenta Corriente">Cuenta Corriente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Cuenta o CCI</label>
                    <input 
                      type="text" 
                      value={numeroCuenta}
                      onChange={(e) => setNumeroCuenta(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" 
                      placeholder="Ej: 191-123456789" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo Documento Titular</label>
                    <select 
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand text-gray-700"
                    >
                      <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                      <option value="RUC">RUC</option>
                      <option value="Carnet Extranjería">Carnet de Extranjería</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Documento</label>
                    <input 
                      type="text" 
                      value={numeroDocumento}
                      onChange={(e) => setNumeroDocumento(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" 
                      placeholder="Documento del titular" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Personalizado (Alias)</label>
                  <input 
                    type="text" 
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" 
                    placeholder="Ej: Cuenta de mi esposa, Proveedor Semillas..." 
                  />
                </div>

                <button type="submit" className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-md mt-4">
                  Validar e Inscribir Cuenta
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cuenta Inscrita Exitosamente</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                La cuenta ha sido añadida a tus favoritos y está lista para recibir transferencias de inmediato.
              </p>
              <button onClick={() => setPaso(1)} className="bg-brand text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-hover transition-colors">
                Inscribir otra cuenta
              </button>
            </div>
          )}
        </div>

        {/* Cuentas ya inscritas */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-400" /> Mis Cuentas Frecuentes
          </h3>
          
          <div className="space-y-4">
            {cuentas.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No tienes cuentas frecuentes.</p>
            ) : (
              cuentas.map((c, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 truncate max-w-[140px]" title={c.alias}>{c.alias}</h4>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{c.estado}</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1 truncate" title={c.banco}>
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-gray-400"/> {c.banco}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 shrink-0 text-gray-400"/> {c.tipoProducto} {c.numeroCuenta}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
