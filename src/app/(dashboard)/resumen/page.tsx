import ResumenClient from './ResumenClient'
import { getUser } from '@/lib/localAuth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { user, token } = await getUser()

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
    const resResumen = await fetch(`${apiUrl}/cuentas/mis-cuentas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (resResumen.ok) {
      const response = await resResumen.json();
      if (response.success && response.data && response.data.cuentas && response.data.cuentas.length > 0) {
        cuenta = response.data.cuentas[0];
        movimientos = cuenta.movimientos || [];
      }
    }
    
    const resCreditos = await fetch(`${apiUrl}/creditos/mis-creditos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (resCreditos.ok) {
      const response = await resCreditos.json();
      if (response.success && response.data) {
        creditos = response.data;
      }
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }

  return <ResumenClient user={user} cuenta={cuenta} movimientosTotales={movimientos} creditos={creditos} />
}
