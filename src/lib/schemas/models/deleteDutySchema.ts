import { z } from 'zod';

export const deleteDutySchema = z.object({
    id: z.number().positive(),
    fullDelete: z.boolean(),
});
