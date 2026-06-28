import { getUser } from '@/lib/localAuth'
import { readDB } from '@/data/db'
import ProfileForm from './ProfileForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function PerfilPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const db = readDB()

  let cliente = { nombres: user.nombres, apellidos: user.apellidos, dni: user.dni, celular: user.celular || '', direccion: user.direccion || '' }
  let tarjeta = db.tarjetas.find(t => t.user_id === user.id) || null

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-500">Configuración de tu cuenta e información personal</p>
      </div>
      <ProfileForm cliente={cliente} tarjeta={tarjeta} />
    </div>
  )
}
