'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Nuevos datos del cliente
  const nombres = formData.get('nombres') as string
  const apellidos = formData.get('apellidos') as string
  const dni = formData.get('dni') as string
  const celular = formData.get('celular') as string
  const fecha_nacimiento = formData.get('fecha_nacimiento') as string
  const direccion = formData.get('direccion') as string

  // 1. Crear el usuario en Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect('/registro?error=' + error.message)
  }

  // 2. Insertar en tabla clientes si el registro fue exitoso
  if (data.user) {
     const { error: clienteError } = await supabase.from('clientes').insert({
        id: data.user.id,
        nombres,
        apellidos,
        dni,
        celular,
        fecha_nacimiento,
        direccion
     })
     
     if (clienteError) {
         // Log the error but don't fail completely since auth succeeded
         console.error("Error guardando cliente:", clienteError)
     }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
