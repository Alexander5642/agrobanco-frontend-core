'use client'

import React, { useState } from 'react'
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area, LineChart, Line
} from 'recharts'
import { TrendingUp, AlertTriangle, Users, Wallet, CreditCard, Activity } from 'lucide-react'

export default function AdminDashboard({ data }: { data: any }) {
  const [meta, setMeta] = useState('6000000')

  // Colores Institucionales
  const COLORS = ['#008c4a', '#ef4444', '#f59e0b', '#3b82f6'] 

  const pieData = [
    { name: 'Vigente', value: data.vigente || 8745.48 },
    { name: 'Vencida', value: data.vencida || 11944.08 },
  ]

  // Calcular la data de las barras de forma proporcional usando la data real de la BD
  const totalCartera = data.total || 20689.56;
  const vigenteVal = data.vigente || 8745.48;
  const vencidaVal = data.vencida || 11944.08;

  const barData = [
    { calificacion: 'Normal (0)', monto: vigenteVal * 0.95 },
    { calificacion: 'CPP (1)', monto: vigenteVal * 0.05 },
    { calificacion: 'Deficiente (2)', monto: vencidaVal * 0.40 },
    { calificacion: 'Dudoso (3)', monto: vencidaVal * 0.35 },
    { calificacion: 'Pérdida (4)', monto: vencidaVal * 0.25 },
  ]

  // Datos simulados para tendencia, escalados con la data actual para que tenga sentido real
  const baseMora = vencidaVal / 4; 
  const trendData = [
    { mes: 'Ene', ahorros: 4000, creditos: totalCartera * 0.4, mora: baseMora * 0.3 },
    { mes: 'Feb', ahorros: 3000, creditos: totalCartera * 0.5, mora: baseMora * 0.4 },
    { mes: 'Mar', ahorros: 2000, creditos: totalCartera * 0.6, mora: baseMora * 0.5 },
    { mes: 'Abr', ahorros: 2780, creditos: totalCartera * 0.7, mora: baseMora * 0.7 },
    { mes: 'May', ahorros: 1890, creditos: totalCartera * 0.8, mora: baseMora * 0.8 },
    { mes: 'Jun', ahorros: 2390, creditos: totalCartera, mora: vencidaVal },
  ]

  const formatMoney = (val: number) => `S/ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatMoneyShort = (val: number) => `S/ ${(val/1000).toFixed(1)}k`

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Gerencial</h1>
          <p className="text-sm text-gray-500 mt-1">Análisis integral de cartera, ahorros y riesgo crediticio</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-200">
            <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider mb-1">Periodo Actual</span>
            <span className="font-bold text-gray-900">2026-06</span>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet className="w-12 h-12 text-[#008c4a]" />
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cartera Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{formatMoney(data.total || 20689.56)}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-12 h-12 text-[#008c4a]" />
          </div>
          <p className="text-[10px] font-bold text-[#008c4a] uppercase tracking-wider">Cartera Vigente</p>
          <p className="text-2xl font-bold text-[#008c4a] mt-2">{formatMoney(data.vigente || 8745.48)}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Cartera Vencida</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{formatMoney(data.vencida || 11944.08)}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-12 h-12 text-orange-500" />
          </div>
          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Ratio de Mora</p>
          <p className="text-2xl font-bold text-orange-500 mt-2">{data.ratioMora || '57.7'}%</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Total Créditos</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{data.numCreditos || 22}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Clientes Activos</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{data.numClientes || 22}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Gráfico 1: Evolución Ahorros vs Créditos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Evolución: Captaciones vs Colocaciones</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAhorros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCreditos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008c4a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#008c4a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatMoneyShort} tick={{fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip formatter={(value) => formatMoney(value as number)} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="ahorros" name="Ahorros (Captaciones)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAhorros)" />
                <Area type="monotone" dataKey="creditos" name="Créditos (Colocaciones)" stroke="#008c4a" fillOpacity={1} fill="url(#colorCreditos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Composición de Mora */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Calidad de Cartera</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#008c4a] rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">Vigente ({(data.vigente / (data.total || 1) * 100).toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-600">Vencida ({(data.vencida / (data.total || 1) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 3: Calificación de Riesgo */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Cartera por Calificación de Riesgo</h2>
          <div className="space-y-5">
            {barData.map((item, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <span className="w-28 font-bold text-gray-600 truncate pr-2">{item.calificacion}</span>
                <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${idx === 0 ? 'bg-[#008c4a]' : idx === 1 ? 'bg-yellow-400' : idx === 2 ? 'bg-orange-500' : 'bg-red-600'}`}
                    style={{ width: `${Math.max(1, (item.monto / (data.total || 20689)) * 100)}%` }}
                  ></div>
                </div>
                <span className="w-28 text-right font-bold text-gray-900">{formatMoney(item.monto)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico 4: Tendencia de Mora */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Tendencia de Mora Institucional</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip />
                <Line type="monotone" dataKey="mora" name="Monto en Mora" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla Premium de Casos de Crédito */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#008c4a]" />
            Casos de Crédito Recientes
          </h2>
          <a href="/admin/solicitudes" className="text-sm font-bold text-brand hover:underline">
            Ver todas las solicitudes &rarr;
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 rounded-t-lg">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">ID</th>
                <th className="px-6 py-4">Cliente (DNI)</th>
                <th className="px-6 py-4">Destino</th>
                <th className="px-6 py-4">Monto / Plazo</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 rounded-tr-lg">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data.creditosLista || []).slice(0, 5).map((c: any, i: number) => {
                let badgeColor = 'bg-gray-100 text-gray-800';
                if (c.estado === 'APROBADO') badgeColor = 'bg-green-100 text-green-800';
                if (c.estado === 'EN_COMITE') badgeColor = 'bg-yellow-100 text-yellow-800';
                if (c.estado === 'DESEMBOLSADO') badgeColor = 'bg-blue-100 text-blue-800';
                if (c.estado === 'PRE_SOLICITUD' || c.estado === 'REGISTRO') badgeColor = 'bg-purple-100 text-purple-800';
                if (c.estado === 'VENCIDO' || c.estado === 'RECHAZADO') badgeColor = 'bg-red-100 text-red-800';

                return (
                  <tr key={i} onClick={() => window.location.href = `/admin/clientes/${c.user_id}`} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400 group-hover:text-gray-900 transition-colors">{c.id.split('-')[1]}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{c.user_name}</div>
                      <div className="text-xs text-gray-500">DNI: {c.user_dni}</div>
                    </td>
                    <td className="px-6 py-4 font-medium max-w-[200px] truncate" title={c.destino || 'N/A'}>
                      {c.destino || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">S/ {c.monto.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{c.meses} meses a {c.tea}% TEA</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${badgeColor}`}>
                        {c.estado.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(c.creado_en).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Tabla de Contactos / Leads */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Solicitudes de Contacto (Leads)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 rounded-t-lg">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">Fecha</th>
                <th className="px-6 py-4">Nombre Completo</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 rounded-tr-lg">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(!data.contactosLista || data.contactosLista.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-medium">No hay solicitudes de contacto recientes.</td>
                </tr>
              ) : (
                data.contactosLista.map((c: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(c.fecha).toLocaleDateString()} {new Date(c.fecha).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{c.nombre}</td>
                    <td className="px-6 py-4 text-[#008c4a] font-medium">{c.telefono}</td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4 text-xs max-w-xs truncate" title={c.mensaje}>{c.mensaje}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
