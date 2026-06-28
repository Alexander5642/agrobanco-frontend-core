'use server'

import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function aprobarEnComite(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  
  if (index === -1 || db.creditos[index].estado !== 'EN_COMITE') {
    throw new Error("Crédito no válido o no está en comité")
  }

  // Cambiar estado a APROBADO (listo para desembolso)
  db.creditos[index].estado = 'APROBADO'
  writeDB(db)

  revalidatePath('/admin/comite', 'page')
}

export async function rechazarEnComite(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  if (index !== -1) {
    db.creditos[index].estado = 'RECHAZADO'
    writeDB(db)
  }
  
  revalidatePath('/admin/comite', 'page')
}
