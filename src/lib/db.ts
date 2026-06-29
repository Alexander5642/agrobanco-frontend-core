import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_EcAFR5vYjlZ9@ep-steep-night-aty4m52i.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

export default pool;
