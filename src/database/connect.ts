import { Pool } from 'pg';

const { PSQL_USER, PQSL_HOST, PSQL_DATABASE, PSQL_PASSWORD, PSQL_PORT } = process.env;
const pool = new Pool({
    user: PSQL_USER,
    host: PQSL_HOST,
    database: PSQL_DATABASE,
    password: PSQL_PASSWORD,
    port: Number(PSQL_PORT ?? 5432),
});

export const createTables = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS duties(
            id SERIAL,
            name VARCHAR(255) NOT NULL,
            status INTEGER NOT NULL,
            created_at BIGINT NOT NULL,
            modified_at BIGINT NOT NULL
        );
    `;
    query(queryText).catch(err => {
        throw err;
    });
};

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
