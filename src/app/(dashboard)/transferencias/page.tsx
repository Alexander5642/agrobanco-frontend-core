import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import TransferForm from './TransferForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function TransferenciasPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()
  
  let cuenta = db.cuentas.find(c => c.user_id === user.id)
  
  let movimientos = []
  if (cuenta) {
    movimientos = db.movimientos
      .filter(m => m.cuenta_id === cuenta.id)
      .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())
      .slice(0, 5) // Mostramos los últimos 5 para la barra lateral
  }

  return <TransferForm cuenta={cuenta} movimientos={movimientos} />
}
