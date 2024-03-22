import { z } from 'zod';

export const findDutiesSchema = z.object({
    deleted: z.preprocess(
        val => (val === 'true' ? true : val === 'false' ? false : null),
        z.boolean(),
    ),
});
