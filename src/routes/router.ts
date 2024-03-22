import Router from 'koa-router';
import dutyRouter from './duty/duty.controller';

const router = new Router();

router.use(dutyRouter.routes());

export default router;
