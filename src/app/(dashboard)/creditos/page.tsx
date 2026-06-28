import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import CreditForm from './CreditForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function CreditosPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()
  
  let creditos = db.creditos
    .filter(c => c.user_id === user.id)
    .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())

  return <CreditForm creditos={creditos} />
}
