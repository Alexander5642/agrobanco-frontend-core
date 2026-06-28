'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

export async function transferir(formData: FormData) {
  const { user, token } = await getUser()

  if (!user || !token) throw new Error("No autenticado")

  const cuentaDestino = formData.get('cuenta_destino') as string
  const cuentaOrigenId = formData.get('cuenta_origen') as string
  const monto = parseFloat(formData.get('monto') as string)
  const concepto = formData.get('concepto') as string || 'Transferencia'

  if (isNaN(monto) || monto <= 0) {
    throw new Error("Monto inválido")
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  const res = await fetch(`${apiUrl}/operaciones/transferir`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      cuentaOrigenId,
      numeroCuentaDestino: cuentaDestino,
      monto,
      descripcion: concepto
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al realizar la transferencia en el servidor");
  }

  revalidatePath('/', 'layout')
}
