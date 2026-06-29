const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_EcAFR5vYjlZ9@ep-steep-night-aty4m52i.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require' });
pool.query("SELECT conname, pg_get_constraintdef(c.oid) FROM pg_constraint c JOIN pg_namespace n ON n.oid = c.connamespace WHERE conrelid = 'creditos'::regclass;")
  .then(res => { console.log(res.rows); process.exit(0); })
  .catch(console.error);
