import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import PagosForm from './PagosForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function PagosPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()
  
  let cuenta = db.cuentas.find(c => c.user_id === user.id)

  return <PagosForm cuenta={cuenta} />
}
