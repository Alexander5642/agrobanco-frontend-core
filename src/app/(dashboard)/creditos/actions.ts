'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

export async function solicitarCredito(formData: FormData) {
  const { user, token } = await getUser()

  if (!user || !token) throw new Error("No autenticado")

  const monto = parseFloat(formData.get('monto') as string)
  const meses = parseInt(formData.get('meses') as string)
  
  if (isNaN(monto) || monto < 1000) throw new Error("El monto mínimo es S/ 1,000")
  if (isNaN(meses) || meses < 1) throw new Error("Plazo inválido")

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  const res = await fetch(`${apiUrl}/creditos/solicitar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ monto, meses })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al solicitar crédito en el servidor");
  }

  revalidatePath('/', 'layout')
}
