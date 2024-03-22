import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
// import jwt from 'koa-jwt';
import serve from 'koa-static';
import 'dotenv/config';
import router from '@routes/router';

// init
const app = new koa();
// middlewares
app.use(serve('public', { hidden: true }));
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

// jwt
// Middleware below this line is only reached if JWT token is valid
// app.use(
//     jwt({ secret: `${process.env.JWT_TOKEN}` }).unless({
//         path: [/^\/admin\/user\/login/, /^\/api/, /^\/health/],
//     }),
// );

// routes
app.use(router.routes());

// export server
export default app;
