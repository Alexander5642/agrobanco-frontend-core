'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { loginUser } from '@/lib/localAuth'

export async function login(formData: FormData) {
  let email = formData.get('email') as string
  const password = formData.get('password') as string

  // Se eliminó el mapeo automático que rompía el inicio de sesión

  const { user, error } = await loginUser(email, password)

  if (error || !user) {
    return redirect('/login?error=Credenciales invalidas')
  }

  // En el CORE, solo pueden entrar ADMINS
  if (user.rol !== 'ADMIN') {
    return redirect('/login?error=Acceso denegado. Solo administradores.')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
