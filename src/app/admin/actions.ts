'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

export async function updateEstadoCredito(creditoId: string, nuevoEstado: string) {
  const { user, token } = await getUser()

  if (!user || user.rol !== 'ADMIN') throw new Error("No autenticado o sin permisos")

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  const res = await fetch(`${apiUrl}/creditos/${creditoId}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar crédito");
  }

  revalidatePath('/admin', 'page')
}
