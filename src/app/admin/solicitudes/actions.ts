'use server'

import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function pasarAComite(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  
  if (index === -1 || db.creditos[index].estado !== 'ENVIADO') {
    throw new Error("Crédito no válido o ya fue procesado")
  }

  // Cambiar estado a EN_COMITE
  db.creditos[index].estado = 'EN_COMITE'
  writeDB(db)

  revalidatePath('/admin/solicitudes', 'page')
}

export async function rechazarCredito(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  if (index !== -1) {
    db.creditos[index].estado = 'RECHAZADO'
    writeDB(db)
  }
  
  revalidatePath('/admin/solicitudes', 'page')
}
