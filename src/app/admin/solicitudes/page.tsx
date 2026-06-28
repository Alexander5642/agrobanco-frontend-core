import { getUser } from '@/lib/localAuth';
import { redirect } from 'next/navigation';
import SolicitudesClient from './SolicitudesClient';
import { readDB } from '@/data/db';

export const dynamic = 'force-dynamic';

export default async function AdminCreditosPage() {
  const { user } = await getUser();
  if (!user || user.rol !== 'ADMIN') redirect('/login');

  const db = readDB();
  const creditos = db.creditos || [];

  const creditosConUsuarios = creditos.map((c: any) => {
    const usr = db.users.find((u: any) => u.id === c.user_id);
    return {
      ...c,
      user_name: usr ? `${usr.nombres} ${usr.apellidos}` : 'Cliente Desconocido',
      user_dni: usr ? usr.dni : 'N/A'
    };
  });

  // Sort descending by date
  creditosConUsuarios.sort((a: any, b: any) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime());

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-8">
      <SolicitudesClient creditosLista={creditosConUsuarios} />
    </div>
  )
}
