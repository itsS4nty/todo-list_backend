import Router from 'koa-router';
import dutyRouter from './duty/duty.routes';

const router = new Router();

router.use(dutyRouter.routes());

export default router;
