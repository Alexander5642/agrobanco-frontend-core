'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

export async function pagarServicio(formData: FormData) {
  const { user, token } = await getUser()

  if (!user || !token) throw new Error("No autenticado")

  const servicio = formData.get('servicio') as string
  const monto = parseFloat(formData.get('monto') as string)
  const codigo = formData.get('codigo') as string
  const cuentaOrigenId = formData.get('cuenta_origen') as string

  if (isNaN(monto) || monto <= 0) {
    throw new Error("Monto inválido")
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  const res = await fetch(`${apiUrl}/operaciones/pagar-servicio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      cuentaOrigenId,
      monto,
      servicio: `${servicio} (Cód: ${codigo})`
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al realizar el pago en el servidor");
  }

  revalidatePath('/', 'layout')
}
