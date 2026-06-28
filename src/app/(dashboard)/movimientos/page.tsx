import MovimientosClient from './MovimientosClient'
import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function MovimientosPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()
  
  const cuenta = db.cuentas.find(c => c.user_id === user.id)
  
  let movimientos: any[] = []
  
  if (cuenta) {
    movimientos = db.movimientos
      .filter(m => m.cuenta_id === cuenta.id)
      .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())
  }

  return <MovimientosClient movimientosIniciales={movimientos} />
}
