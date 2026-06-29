import { getUser } from '@/lib/localAuth';
import { redirect } from 'next/navigation';
import SolicitudesClient from './SolicitudesClient';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminCreditosPage() {
  const { user } = await getUser();
  if (!user || user.rol !== 'ADMIN') redirect('/login');

  const { rows } = await pool.query(`
    SELECT c.*, u.nombres, u.apellidos, u.dni 
    FROM creditos c
    JOIN usuarios u ON c.user_id = u.id
    ORDER BY c.creado_en DESC
  `);

  const creditosConUsuarios = rows.map(c => ({
    ...c,
    user_name: `${c.nombres} ${c.apellidos}`,
    user_dni: c.dni,
    monto: Number(c.monto),
    creado_en: c.creado_en ? new Date(c.creado_en).toISOString() : new Date().toISOString(),
    actualizado_en: c.actualizado_en ? new Date(c.actualizado_en).toISOString() : new Date().toISOString()
  }));

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-8">
      <SolicitudesClient creditosLista={creditosConUsuarios} />
    </div>
  )
}
