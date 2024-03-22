import { z } from 'zod';
import { createDutySchema } from '../../lib/schemas/models/createDutySchema';
import { updateDutySchema } from '../../lib/schemas/models/updateDutySchema';
import { deleteDutySchema } from '../../lib/schemas/models/deleteDutySchema';
import { findDutiesSchema } from '../../lib/schemas/models/findDutiesSchema';

export type FindDuties = z.infer<typeof findDutiesSchema>;

export type CreateDuty = z.infer<typeof createDutySchema>;

export type UpdateDuty = z.infer<typeof updateDutySchema>;

export type DeleteDuty = z.infer<typeof deleteDutySchema>;
