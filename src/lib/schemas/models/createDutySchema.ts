import { z } from 'zod';

export const createDutySchema = z.object({ name: z.string() });
