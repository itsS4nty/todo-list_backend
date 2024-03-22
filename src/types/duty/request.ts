import { z } from 'zod';
import { findDutiesSchema } from '@zodSchemas/findDutiesSchema';
import { createDutySchema } from '@zodSchemas/createDutySchema';
import { updateDutySchema } from '@zodSchemas/updateDutySchema';
import { deleteDutySchema } from '@zodSchemas/deleteDutySchema';

export type FindDuties = z.infer<typeof findDutiesSchema>;

export type CreateDuty = z.infer<typeof createDutySchema>;

export type UpdateDuty = z.infer<typeof updateDutySchema>;

export type DeleteDuty = z.infer<typeof deleteDutySchema>;
