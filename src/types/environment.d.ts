declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PSQL_USER: string;
            PSQL_HOST: string;
            PSQL_DATABASE: string;
            PSQL_PASSWORD: string;
            PSQL_PORT: number;
            NODE_ENV: 'dev' | 'prod' | 'staging'
        }
    }
}

export {};