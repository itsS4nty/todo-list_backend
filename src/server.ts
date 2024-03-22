/* eslint-disable no-console */
import { Server } from 'http';
import { AddressInfo } from 'net';
import app from './app';
import 'dotenv/config';
import { createTables } from './database/connect';

export class ApiServer {
    server!: Server;
    public constructor() {}

    listen = async () => {
        const PORT = process.env.PORT || 3000;
        this.server = app.listen(PORT, async () => {
            console.log(`When it's ${new Date().toLocaleString()} we are getting ready`);
            console.log(`Starting in ${process.env.NODE_ENV} mode`);
            console.log(`Listening on ${PORT}`);
        });
        await createTables();
    };

    close = () => {
        this.server.close();
    };

    address = () => {
        return this.server.address() as AddressInfo;
    };
}
