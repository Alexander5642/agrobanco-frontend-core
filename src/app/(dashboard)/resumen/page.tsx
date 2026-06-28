import ResumenClient from './ResumenClient'
import { getUser } from '@/lib/localAuth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  if (user.rol === 'ADMIN') {
    redirect('/admin')
  }

  // Fetch real data from backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  let cuenta: any = { numero_cuenta: '---', saldo: 0, trea: 3.50, id: null };
  let movimientos: any[] = [];
  let creditos: any[] = [];
  
  try {
    const resResumen = await fetch(`${apiUrl}/cuentas/resumen?userId=${user.id}`);
    if (resResumen.ok) {
      const data = await resResumen.json();
      if (data.cuentas && data.cuentas.length > 0) {
        cuenta = data.cuentas[0];
        movimientos = cuenta.movimientos || [];
      }
    }
    
    const resCreditos = await fetch(`${apiUrl}/creditos?userId=${user.id}`);
    if (resCreditos.ok) {
      creditos = await resCreditos.json();
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }

  return <ResumenClient user={user} cuenta={cuenta} movimientosTotales={movimientos} creditos={creditos} />
}
