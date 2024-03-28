import { ZodIssue } from 'zod';
import { validateSchemaSafe, ZodSchema } from '../../src/lib/schemas/index';
import { createDutySchema } from '../../src/lib/schemas/models/createDutySchema';
import { deleteDutySchema } from '../../src/lib/schemas/models/deleteDutySchema';
import { findDutiesSchema } from '../../src/lib/schemas/models/findDutiesSchema';
import { updateDutySchema } from '../../src/lib/schemas/models/updateDutySchema';
import { DutyStatus } from '../../src/enums/dutyStatus';

jest.mock('../../src/lib/schemas/models/createDutySchema', () => ({
    createDutySchema: { safeParse: jest.fn() },
}));
jest.mock('../../src/lib/schemas/models/deleteDutySchema', () => ({
    deleteDutySchema: { safeParse: jest.fn() },
}));
jest.mock('../../src/lib/schemas/models/findDutiesSchema', () => ({
    findDutiesSchema: { safeParse: jest.fn() },
}));
jest.mock('../../src/lib/schemas/models/updateDutySchema', () => ({
    updateDutySchema: { safeParse: jest.fn() },
}));

const createMockZodIssue = (message: string): ZodIssue[] => [
    { message, path: [], code: 'custom', params: {} },
];

describe('Schema Validation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateSchemaSafe', () => {
        it.each([
            ['CreateDuty', createDutySchema, { name: 'New Duty' }],
            ['DeleteDuty', deleteDutySchema, { id: 1, fullDelete: false }],
            ['FindDuties', findDutiesSchema, { status: DutyStatus.PENDING }],
            [
                'UpdateDuty',
                updateDutySchema,
                { id: 1, name: 'Updated Duty', status: DutyStatus.DONE },
            ],
        ])('validates %s schema correctly', async (schemaId, schema, data) => {
            // (schema.safeParse as jest.Mock).mockReturnValue({ success: true, data });

            const result = validateSchemaSafe(schemaId as ZodSchema, data);
            expect(result).toEqual(data);
            expect(schema.safeParse).toHaveBeenCalledWith(data);
        });

        it.each([
            ['CreateDuty', createDutySchema, { name: '' }],
            ['DeleteDuty', deleteDutySchema, { id: 0, fullDelete: null }],
            ['FindDuties', findDutiesSchema, { status: undefined }],
            ['UpdateDuty', updateDutySchema, { id: -1, name: '', status: null }],
        ])('returns null for invalid %s data', (schemaId, schema, data) => {
            // (schema.safeParse as jest.Mock).mockReturnValue({
            //     success: false,
            //     error: { issues: createMockZodIssue('Invalid input') },
            // });

            const result = validateSchemaSafe(schemaId as ZodSchema, data);
            expect(result).toBeNull();
            expect(schema.safeParse).toHaveBeenCalledWith(data);
        });
    });
});
