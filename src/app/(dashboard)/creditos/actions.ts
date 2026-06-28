'use server'

import { getUser } from '@/lib/localAuth'
import { revalidatePath } from 'next/cache'

export async function solicitarCredito(formData: FormData) {
  const { user, token } = await getUser()

  if (!user || !token) throw new Error("No autenticado")

  const monto = parseFloat(formData.get('monto') as string)
  const meses = parseInt(formData.get('meses') as string)
  const tipo_credito = formData.get('tipo_credito') as string
  const frecuencia_pago = formData.get('frecuencia_pago') as string
  const hectareas = formData.get('hectareas') ? parseInt(formData.get('hectareas') as string) : null
  const cabezas_ganado = formData.get('cabezas_ganado') ? parseInt(formData.get('cabezas_ganado') as string) : null
  const ingreso_anual_uit = formData.get('ingreso_anual_uit') ? parseFloat(formData.get('ingreso_anual_uit') as string) : null
  
  if (isNaN(monto) || monto < 1000) throw new Error("El monto mínimo es S/ 1,000")
  if (isNaN(meses) || meses < 1) throw new Error("Plazo inválido")

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  const res = await fetch(`${apiUrl}/creditos/solicitar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      monto, meses, tipo_credito, frecuencia_pago, hectareas, cabezas_ganado, ingreso_anual_uit 
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al solicitar crédito en el servidor");
  }

  revalidatePath('/', 'layout')
}
