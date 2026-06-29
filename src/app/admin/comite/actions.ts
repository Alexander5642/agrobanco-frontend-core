'use server'

import { revalidatePath } from 'next/cache'
import { updateEstadoCredito } from '../actions'

export async function aprobarEnComite(formData: FormData) {
  const creditoId = formData.get('credito_id') as string
  if (creditoId) {
    await updateEstadoCredito(creditoId, 'APROBADO');
    revalidatePath('/admin/comite', 'page')
  }
}

export async function rechazarEnComite(formData: FormData) {
  const creditoId = formData.get('credito_id') as string
  if (creditoId) {
    await updateEstadoCredito(creditoId, 'RECHAZADO');
    revalidatePath('/admin/comite', 'page')
  }
}
