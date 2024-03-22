import { z } from 'zod';

export const findDutiesSchema = z.object({
    deleted: z.boolean(),
});
