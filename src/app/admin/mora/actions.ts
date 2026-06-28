'use server'

import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function registrarCobranza(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  // Cambiar estado del crédito a VIGENTE de nuevo, simulando que se puso al día
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  if (index !== -1) {
    db.creditos[index].estado = 'VIGENTE'
    writeDB(db)
  }

  revalidatePath('/admin/mora', 'page')
}
