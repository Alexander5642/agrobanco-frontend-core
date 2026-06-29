const fs = require('fs');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_EcAFR5vYjlZ9@ep-steep-night-aty4m52i.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require' });
const db = JSON.parse(fs.readFileSync('src/data/db.json', 'utf8'));

async function migrate() {
  try {
    const { rows } = await pool.query('SELECT id FROM usuarios LIMIT 10');
    const userIds = rows.map(r => r.id);
    if(userIds.length === 0) return console.log("No users found");

    for (let c of db.creditos) {
      const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
      await pool.query(
        'INSERT INTO creditos (id, user_id, monto, meses, tea, cuota_mes, intereses, total, destino, estado, creado_en) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING',
        [c.id, randomUser, c.monto, c.meses, c.tea || 20, c.cuota_mes || 50, c.intereses || 100, c.total || c.monto * 1.2, c.destino_fondos || 'Agricola', c.estado, c.creado_en || new Date().toISOString()]
      );
    }
    console.log('Migrated', db.creditos.length, 'creditos');
  } catch (error) {
    console.error("Migration Error:", error);
  } finally {
    process.exit(0);
  }
}

migrate();
