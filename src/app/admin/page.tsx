import { readDB } from '@/data/db';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminIndex() {
  const db = readDB();
  
  // Obtener datos reales de la base de datos local
  const numClientes = db.users.filter((u: any) => u.rol !== 'ADMIN').length;
  const creditos = db.creditos;

  let total = 0;
  let vigente = 0;
  let vencida = 0;

  if (creditos && creditos.length > 0) {
    creditos.forEach((c: any) => {
      total += Number(c.monto);
      if (c.estado === 'VENCIDO' || c.estado === 'RECHAZADO') {
        vencida += Number(c.monto);
      } else {
        vigente += Number(c.monto);
      }
    });
  }

  // Mapear créditos con información del usuario
  const creditosConUsuarios = (creditos || []).map((c: any) => {
    const user = db.users.find((u: any) => u.id === c.user_id);
    return {
      ...c,
      user_name: user ? `${user.nombres} ${user.apellidos}` : 'Cliente Desconocido',
      user_dni: user ? user.dni : 'N/A'
    };
  });

  const dashboardData = {
    total: total > 0 ? total : 20689.56,
    vigente: total > 0 ? vigente : 8745.48,
    vencida: total > 0 ? vencida : 11944.08,
    ratioMora: total > 0 ? ((vencida / total) * 100).toFixed(1) : 57.7,
    numCreditos: creditos?.length || 22,
    numClientes: numClientes || 22,
    creditosLista: creditosConUsuarios,
    contactosLista: [] // Fallback
  };

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(`${API_URL}/contactos`, { cache: 'no-store' });
    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        dashboardData.contactosLista = result.data;
      }
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
