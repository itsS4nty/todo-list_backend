import Router from 'koa-router';
import { validateSchemaSafe } from '../../lib/schemas';
import { CreateDuty, DeleteDuty, FindDuties, UpdateDuty } from '../../types/duty/request';
import { CreateDutyResponse, DeleteDutyResponse, GetDutiesResponse, UpdateDutyRespone } from '../../types/duty/response';
import { addDuty, delDuty, getDuties, updDuty } from '../../controllers/duty/duty.controller';

const dutyRouter = new Router({
    prefix: '/duty',
});

// GET

dutyRouter.get('/', async ctx => {
    const data = validateSchemaSafe<FindDuties>('FindDuties', ctx.request.query);
    const result: GetDutiesResponse = await getDuties(data);
    ctx.status = result.status_code;
    ctx.body = result.data;
    if (result.error) ctx.message = result.error_message ?? 'General error';
});

// POST

dutyRouter.post('/', async ctx => {
    const data = validateSchemaSafe<CreateDuty>('CreateDuty', ctx.request.body);
    const result: CreateDutyResponse = await addDuty(data);
    ctx.status = result.status_code;
    ctx.body = result.data;
    if (result.error) ctx.message = result.error_message ?? 'General error';
});

// PUT

dutyRouter.put('/', async ctx => {
    const data = validateSchemaSafe<UpdateDuty>('UpdateDuty', ctx.request.body);
    const result: UpdateDutyRespone = await updDuty(data);
    ctx.status = result.status_code;
    ctx.body = result.data;
    if (result.error) ctx.message = result.error_message ?? 'General error';
});

// DELETE

dutyRouter.delete('/', async ctx => {
    const data = validateSchemaSafe<DeleteDuty>('DeleteDuty', ctx.request.body);
    const result: DeleteDutyResponse = await delDuty(data);
    ctx.status = result.status_code;
    ctx.body = result.data;
    if (result.error) ctx.message = result.error_message ?? 'General error';
});

export default dutyRouter;
