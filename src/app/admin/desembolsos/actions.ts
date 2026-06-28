'use server'

import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function desembolsarCredito(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  // 1. Obtener detalles del crédito
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  
  if (index === -1 || db.creditos[index].estado !== 'APROBADO') {
    throw new Error("Crédito no válido o no está listo para desembolso")
  }

  const credito = db.creditos[index]

  // 2. Obtener cuenta del cliente (con auto-reparación)
  let cuentaIndex = db.cuentas.findIndex((c: any) => c.user_id === credito.user_id)
  let cuenta: any = null

  if (cuentaIndex === -1) {
    // Crear cuenta
    cuenta = {
      id: crypto.randomUUID(),
      user_id: credito.user_id,
      numero_cuenta: '191-' + Math.floor(Math.random() * 90000000 + 10000000),
      saldo: 0.00
    }
    db.cuentas.push(cuenta)
    cuentaIndex = db.cuentas.length - 1
  } else {
    cuenta = db.cuentas[cuentaIndex]
  }

  // 3. Cambiar estado del crédito a VIGENTE
  db.creditos[index].estado = 'VIGENTE'

  // 4. Depositar dinero en la cuenta
  db.cuentas[cuentaIndex].saldo = Number(db.cuentas[cuentaIndex].saldo) + Number(credito.monto)

  // 5. Registrar el movimiento
  db.movimientos.push({
    id: crypto.randomUUID(),
    cuenta_id: cuenta.id,
    tipo: `DESEMBOLSO DE CRÉDITO`,
    monto: Number(credito.monto),
    es_ingreso: true,
    fecha: new Date().toISOString()
  })

  writeDB(db)

  revalidatePath('/admin/desembolsos', 'page')
}

export async function rechazarDesembolso(formData: FormData) {
  const db = readDB()
  const creditoId = formData.get('credito_id') as string
  
  const index = db.creditos.findIndex((c: any) => c.id === creditoId)
  if (index !== -1) {
    db.creditos[index].estado = 'RECHAZADO'
    writeDB(db)
  }
  
  revalidatePath('/admin/desembolsos', 'page')
}
