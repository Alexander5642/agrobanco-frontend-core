'use server'

import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function submitPQR(formData: FormData) {
  const tipo = formData.get('tipo') as string
  const nombres = formData.get('nombres') as string
  const documento = formData.get('documento') as string
  const telefono = formData.get('telefono') as string
  const email = formData.get('email') as string
  const mensaje = formData.get('mensaje') as string

  const db = readDB()
  
  // Si no existe el array en el JSON antiguo, lo inicializamos
  if (!db.solicitudes_publicas) {
    db.solicitudes_publicas = []
  }

  db.solicitudes_publicas.push({
    id: `pqr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tipo, 
    nombres, 
    documento, 
    telefono, 
    email, 
    mensaje,
    creado_en: new Date().toISOString(),
    estado: 'PENDIENTE'
  })

  writeDB(db)

  // Refrescar la vista del administrador para que vea la nueva queja
  revalidatePath('/admin/atencion')
  
  return { success: 'Su solicitud ha sido radicada exitosamente con Agrobanco.' }
}
