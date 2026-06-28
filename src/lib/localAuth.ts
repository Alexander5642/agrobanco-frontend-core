import { cookies } from 'next/headers';
import { readDB } from '@/data/db';

export async function getUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('local_session_id')?.value;

  if (!userId) {
    return { user: null };
  }

  const db = readDB();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return { user: null };
  }

  return { user };
}

export async function loginUser(email: string, password?: string) {
  const db = readDB();
  const searchEmail = email.toLowerCase();
  const user = db.users.find((u) => 
    u.email.toLowerCase() === searchEmail || 
    u.dni.toLowerCase() === searchEmail || 
    u.email.toLowerCase().startsWith(searchEmail)
  );
  
  if (user) {
    if (password && user.password !== password) {
      return { user: null, error: new Error('Contraseña incorrecta') };
    }
    
    const cookieStore = await cookies();
    cookieStore.set('local_session_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
    });
    return { user, error: null };
  }
  
  return { user: null, error: new Error('Usuario no encontrado') };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('local_session_id');
}
