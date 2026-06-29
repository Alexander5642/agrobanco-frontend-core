'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

import pool from '@/lib/db'

export async function updateEstadoCredito(creditoId: string, nuevoEstado: string) {
  const { user, token } = await getUser()

  if (!user || user.rol !== 'ADMIN') throw new Error("No autenticado o sin permisos")
  
  try {
    await pool.query(
      'UPDATE creditos SET estado = $1, actualizado_en = CURRENT_TIMESTAMP WHERE id = $2',
      [nuevoEstado, creditoId]
    );
  } catch (error: any) {
    console.error("DB Update error:", error);
    throw new Error("Error al actualizar crédito en la base de datos");
  }

  revalidatePath('/admin', 'page')
}
