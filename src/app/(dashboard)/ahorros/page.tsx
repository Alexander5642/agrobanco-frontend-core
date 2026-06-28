import { RefreshCw, Percent, ShieldCheck, Clock, Smartphone, Wallet, ArrowDownRight, ArrowRightLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import { redirect } from 'next/navigation'
import DepositButton from './DepositButton'

export const dynamic = 'force-dynamic';

export default async function AhorrosPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()
  
  const cuenta = db.cuentas.find(c => c.user_id === user.id) || { numero_cuenta: '---', saldo: 0, trea: 1.50, tem: 0.1241, id: null }
  
  const movimientos = db.movimientos
    .filter(m => m.cuenta_id === cuenta.id && m.es_ingreso)
    .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())

  const formatMoney = (amount: number) => `S/ ${Number(amount).toFixed(2)}`

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ahorros</h1>
          <p className="text-gray-500">Gestiona tu cuenta de ahorros y realiza operaciones</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      {/* TREA Banner */}
      <div className="bg-brand-dark rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-xl">
            <Percent className="w-8 h-8 text-brand-accent" />
          </div>
          <div>
            <p className="text-xs text-white/70 font-semibold tracking-wider mb-1">TASA DE RENDIMIENTO EFECTIVO ANUAL (TREA)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{Number(cuenta.trea).toFixed(2)}%</span>
              <span className="text-sm text-white/80">para depósitos de ahorro</span>
            </div>
          </div>
        </div>
        <div className="flex gap-8 border-l border-white/20 pl-8">
          <div>
            <p className="text-[10px] text-white/60 mb-1">TREA</p>
            <p className="font-bold">{Number(cuenta.trea).toFixed(4)}%</p>
          </div>
          <div>
            <p className="text-[10px] text-white/60 mb-1">TEM</p>
            <p className="font-bold">{Number(cuenta.tem).toFixed(4)}%</p>
          </div>
          <div>
            <p className="text-[10px] text-white/60 mb-1">MANT.</p>
            <p className="font-bold">S/ 0.00</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-brand" />
          <div>
            <p className="text-sm font-bold text-gray-900">Protegido por FSD</p>
            <p className="text-[10px] text-gray-500">Fondo de Seguro de Depósitos</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
          <Clock className="w-5 h-5 text-brand-accent" />
          <div>
            <p className="text-sm font-bold text-gray-900">Sin monto mínimo</p>
            <p className="text-[10px] text-gray-500">Abre tu cuenta con cualquier monto</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
          <Smartphone className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-bold text-gray-900">100% Digital</p>
            <p className="text-[10px] text-gray-500">Opera tu cuenta desde cualquier lugar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Account Info */}
        <div className="lg:col-span-2 bg-brand rounded-2xl p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
              <p className="text-sm font-medium mb-1">Cuenta de Ahorros</p>
              <p className="font-mono text-sm text-white/80">{cuenta.numero_cuenta}</p>
            </div>
            <div className="border border-white/20 p-2 rounded-lg">
              <Wallet className="w-5 h-5 text-white/80" />
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-8">{formatMoney(cuenta.saldo)}</h2>
            
            <div className="flex gap-3">
              <DepositButton />
              <Link href="/transferencias" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-white/10">
                <ArrowRightLeft className="w-4 h-4" />
                Transferir
              </Link>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
          <div className="bg-green-50 p-4 rounded-full mb-4">
            <Wallet className="w-8 h-8 text-brand" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Tu dinero seguro</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Sin costo de mantenimiento. Depósitos protegidos por el Fondo de Seguro de Depósitos.
          </p>
          <div className="w-full pt-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Tu número de cuenta</p>
            <p className="font-mono font-bold text-gray-900">{cuenta.numero_cuenta}</p>
          </div>
        </div>
      </div>

      {/* Estado de Cuenta */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-gray-400" />
            <h3 className="font-bold text-gray-900 text-sm">Estado de Cuenta</h3>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 border border-gray-200 rounded">{movimientos.length} movimientos</span>
        </div>
        
        {movimientos.length === 0 ? (
           <div className="p-8 text-center text-gray-500">No hay movimientos registrados.</div>
        ) : (
          movimientos.map((mov, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className={mov.es_ingreso ? "bg-green-100 p-3 rounded-full" : "bg-red-100 p-3 rounded-full"}>
                  {mov.es_ingreso ? <ArrowDownRight className="w-5 h-5 text-brand" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{mov.tipo}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(mov.creado_en).toLocaleString()}</p>
                </div>
              </div>
              <p className={`font-bold text-lg ${mov.es_ingreso ? 'text-brand' : 'text-red-500'}`}>
                {mov.es_ingreso ? '+' : '-'} {formatMoney(mov.monto)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
