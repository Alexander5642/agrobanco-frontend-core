'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { registerUser } from '@/lib/localAuth'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nombres = formData.get('nombres') as string
  const apellidos = formData.get('apellidos') as string
  const dni = formData.get('dni') as string
  const celular = formData.get('celular') as string
  const fecha_nacimiento = formData.get('fecha_nacimiento') as string
  const direccion = formData.get('direccion') as string

  const { user, error } = await registerUser({
    email,
    password,
    nombres,
    apellidos,
    dni,
    celular,
    fecha_nacimiento,
    direccion
  });

  if (error || !user) {
    return redirect('/registro?error=' + encodeURIComponent((error as Error)?.message || 'Error en el registro'))
  }

  // Redirección inteligente unificada
  if (user.rol === 'ADMIN') {
    revalidatePath('/admin', 'layout')
    redirect('/admin')
  } else {
    revalidatePath('/resumen', 'layout')
    redirect('/resumen')
  }
}
