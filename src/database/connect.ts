import { Pool } from 'pg';

// TODO: Read values from .env file
const pool = new Pool({
    user: 'yourUsername',
    host: 'localhost',
    database: 'yourDatabaseName',
    password: 'yourPassword',
    port: 5432,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
