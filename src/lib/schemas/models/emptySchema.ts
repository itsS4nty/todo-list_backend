import { z } from 'zod';

export const emptySchema = z.object({ empty: z.never() });
