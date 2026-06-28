import fs from 'fs';
import path from 'path';

// Ruta al archivo de la base de datos local
const DB_FILE = path.join(process.cwd(), 'src', 'data', 'db.json');

// Interface general para la base de datos
export interface LocalDB {
  users: any[];
  cuentas: any[];
  movimientos: any[];
  tarjetas: any[];
  creditos: any[];
  pagos: any[];
  solicitudes_publicas?: any[];
}

const defaultDB: LocalDB = {
  users: [
    {
      id: 'usr-alexander',
      email: '74975772@continental.edu.pe',
      password: 'password123', // Para la simulación
      nombres: 'Alexander',
      apellidos: 'B.',
      dni: '74975772',
      creado_en: new Date().toISOString()
    }
  ],
  cuentas: [
    {
      id: 'cta-1',
      user_id: 'usr-alexander',
      numero_cuenta: '191-27865389',
      saldo: 1000.00,
      trea: 1.5,
      tem: 0.1241,
      creado_en: new Date().toISOString()
    }
  ],
  movimientos: [
    {
      id: 'mov-1',
      cuenta_id: 'cta-1',
      tipo: 'Apertura de cuenta',
      monto: 1000.00,
      es_ingreso: true,
      creado_en: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'mov-2',
      cuenta_id: 'cta-1',
      tipo: 'Pago de servicios - Luz',
      monto: 150.00,
      es_ingreso: false,
      creado_en: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'mov-3',
      cuenta_id: 'cta-1',
      tipo: 'Transferencia recibida',
      monto: 500.00,
      es_ingreso: true,
      creado_en: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'mov-4',
      cuenta_id: 'cta-1',
      tipo: 'Compra con tarjeta',
      monto: 350.00,
      es_ingreso: false,
      creado_en: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  tarjetas: [
    {
      id: 'tar-1',
      user_id: 'usr-alexander',
      cuenta_id: 'cta-1',
      numero_tarjeta: '4555 6666 7777 8888',
      fecha_expiracion: '12/28',
      cvv: '123',
      tipo: 'DEBITO',
      estado: 'ACTIVA',
      creado_en: new Date().toISOString()
    }
  ],
  creditos: [
    {
      id: 'cred-1',
      user_id: 'usr-alexander',
      monto: 5000.00,
      meses: 12,
      tea: 3.5,
      cuota_mes: 430.50,
      intereses: 166.00,
      total: 5166.00,
      estado: 'APROBADO',
      creado_en: new Date().toISOString()
    }
  ],
  pagos: []
};

// Función para inicializar la base de datos si no existe
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    // Si no existe, creamos el directorio si falta y guardamos la DB por defecto
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2), 'utf-8');
  }
}

// Leer la base de datos
export function readDB(): LocalDB {
  initDB();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as LocalDB;
  } catch (error) {
    console.error("Error reading DB:", error);
    return defaultDB;
  }
}

// Escribir en la base de datos
export function writeDB(data: LocalDB): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing DB:", error);
  }
}
