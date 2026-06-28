import { getUser } from '@/lib/localAuth';
import { redirect } from 'next/navigation';
import SolicitudesClient from './SolicitudesClient';

export const dynamic = 'force-dynamic';

export default async function AdminCreditosPage() {
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

  // Sort descending by date
  creditosConUsuarios.sort((a: any, b: any) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime());

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-8">
      <SolicitudesClient creditosLista={creditosConUsuarios} />
    </div>
  )
}
