import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import 'dotenv/config';
import router from './routes/router';

// init
const app = new koa();
// middlewares
app.use(cors()); // Add authorized origins
app.use(loggerKoa());
app.use(bodyparser());
app.use(
    mount(
        '/health',
        auth({
            name: 'user',
            pass: 'password',
        }),
    ),
);

// routes
app.use(router.routes());

// export server
export default app;
