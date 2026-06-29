const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_EcAFR5vYjlZ9@ep-steep-night-aty4m52i.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require' });
pool.query('ALTER TABLE creditos DROP CONSTRAINT creditos_estado_check;')
  .then(() => pool.query(`ALTER TABLE creditos ADD CONSTRAINT creditos_estado_check CHECK (estado IN ('PENDIENTE', 'PRE_SOLICITUD', 'REGISTRO', 'EN_COMITE', 'APROBADO', 'RECHAZADO', 'DESEMBOLSADO', 'PAGADO', 'ENVIADO', 'TODOS'));`))
  .then(() => { console.log('Constraint updated'); process.exit(0); })
  .catch(console.error);
