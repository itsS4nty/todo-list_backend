import { z } from 'zod';
import { DutyStatus } from '../../../enums/dutyStatus';

export const updateDutySchema = z.object({
    id: z.number().positive(),
    name: z.string().optional(),
    status: z.nativeEnum(DutyStatus).optional(),
});
