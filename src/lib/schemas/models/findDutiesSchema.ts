import { z } from 'zod';
import { DutyStatus } from '../../../enums/dutyStatus';

export const findDutiesSchema = z.object({
    status: z.preprocess(val => Number(val), z.nativeEnum(DutyStatus)),
});
