/* eslint-disable no-console */
import { Server } from 'http';
import { AddressInfo } from 'net';
import app from './app';
import 'dotenv/config';

export class ApiServer {
    server!: Server;
    public constructor() {}

    listen = () => {
        const PORT = process.env.PORT || 3000;
        this.server = app.listen(PORT, async () => {
            console.log(`When it's ${new Date().toLocaleString()} we are getting ready`);
            console.log(`Starting in ${process.env.NODE_ENV} mode`);
            console.log(`Listening on ${PORT}`);
        });
    };

    close = () => {
        this.server.close();
    };

    address = () => {
        return this.server.address() as AddressInfo;
    };
}
