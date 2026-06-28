'use server'

import { getUser } from '@/lib/localAuth'
import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function depositarAhorros(formData: FormData) {
  const { user } = await getUser()

  if (!user) throw new Error("No autenticado")

  const monto = parseFloat(formData.get('monto') as string)
  if (isNaN(monto) || monto <= 0) throw new Error("Monto inválido")

  const db = readDB()
  const cuentaIndex = db.cuentas.findIndex(c => c.user_id === user.id)
  
  if (cuentaIndex === -1) {
    throw new Error("No se encontró cuenta para depositar")
  }

  // Actualizar saldo
  db.cuentas[cuentaIndex].saldo += monto

  // Registrar movimiento
  db.movimientos.push({
    id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    cuenta_id: db.cuentas[cuentaIndex].id,
    tipo: 'Depósito en Efectivo / Cajero',
    monto: monto,
    es_ingreso: true,
    creado_en: new Date().toISOString()
  })

  writeDB(db)

  revalidatePath('/ahorros', 'page')
  revalidatePath('/movimientos', 'page')
  revalidatePath('/', 'page')
}
