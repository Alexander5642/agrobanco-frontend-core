import AdminDashboard from './AdminDashboard';
import { getUser } from '@/lib/localAuth';
import { redirect } from 'next/navigation';
import { readDB } from '@/data/db';

export default async function AdminIndex() {
  const { user, token } = await getUser();
  if (!user || user.rol !== 'ADMIN') redirect('/login');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  let creditosConUsuarios: any[] = [];
  try {
    const res = await fetch(`${API_URL}/creditos/all`, { 
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store' 
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) creditosConUsuarios = result.data;
    }
  } catch (error) {
    console.error("Error fetching creditos:", error);
  }

  let total = 0;
  let vigente = 0;
  let vencida = 0;

  if (creditosConUsuarios.length > 0) {
    creditosConUsuarios.forEach((c: any) => {
      total += Number(c.monto);
      if (c.estado === 'VENCIDO' || c.estado === 'RECHAZADO') {
        vencida += Number(c.monto);
      } else {
        vigente += Number(c.monto);
      }
    });
  }

  const db = readDB();
  const numClientes = db.users.filter((u: any) => u.rol !== 'ADMIN').length;

  const dashboardData = {
    total: total > 0 ? total : 0,
    vigente: total > 0 ? vigente : 0,
    vencida: total > 0 ? vencida : 0,
    ratioMora: total > 0 ? ((vencida / total) * 100).toFixed(1) : 0,
    numCreditos: creditosConUsuarios.length,
    numClientes: numClientes || 0,
    creditosLista: creditosConUsuarios,
    contactosLista: [] // Fallback
  };

  try {
    const res = await fetch(`${API_URL}/contactos`, { cache: 'no-store' });
    if (res.ok) {
      const result = await res.json();
      if (result.success) dashboardData.contactosLista = result.data;
    }
  } catch (error) {
    console.error("Error fetching contactos:", error);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen font-sans bg-slate-50">
      
      {/* Componente interactivo y dinámico del Dashboard */}
      <AdminDashboard data={dashboardData} />
      
    </div>
  );
}
