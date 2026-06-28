'use server'

import { readDB, writeDB } from '@/data/db';

export async function saveContacto(contactForm: { nombre: string; telefono: string; email: string; mensaje: string }) {
  try {
    const db = readDB();
    if (!db.solicitudes_publicas) {
      db.solicitudes_publicas = [];
    }

    const newContacto = {
      id: `cont-${Date.now()}`,
      nombres: contactForm.nombre,
      telefono: contactForm.telefono,
      email: contactForm.email,
      mensaje: contactForm.mensaje,
      creado_en: new Date().toISOString()
    };

    db.solicitudes_publicas.push(newContacto);
    writeDB(db);

    return { success: true };
  } catch (error) {
    console.error("Error saving contacto:", error);
    return { success: false };
  }
}
