'use server'

import { getUser } from '@/lib/localAuth'
import { readDB, writeDB } from '@/data/db'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const { user } = await getUser()

  if (!user) throw new Error("No autenticado")

  const nombres = formData.get('nombres') as string
  const apellidos = formData.get('apellidos') as string
  const dni = formData.get('dni') as string
  const celular = formData.get('celular') as string
  const direccion = formData.get('direccion') as string

  if (!nombres || !apellidos || !dni) {
    throw new Error("Los campos nombres, apellidos y dni son obligatorios")
  }

  const db = readDB()
  
  const userIndex = db.users.findIndex(u => u.id === user.id)
  
  if (userIndex !== -1) {
    db.users[userIndex].nombres = nombres
    db.users[userIndex].apellidos = apellidos
    db.users[userIndex].dni = dni
    db.users[userIndex].celular = celular
    db.users[userIndex].direccion = direccion
    writeDB(db)
  }

  revalidatePath('/perfil', 'page')
  revalidatePath('/', 'layout')
}
