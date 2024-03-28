import { validateSchemaSafe, ZodSchema } from '../../src/lib/schemas/index';
import { DutyStatus } from '../../src/enums/dutyStatus';

describe('Schema Validation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateSchemaSafe', () => {
        it.each([
            ['CreateDuty', { name: 'New Duty' }],
            ['DeleteDuty', { id: 1, fullDelete: false }],
            ['FindDuties', { status: DutyStatus.PENDING }],
            ['UpdateDuty', { id: 1, name: 'Updated Duty', status: DutyStatus.DONE }],
        ])('validates %s schema correctly', async (schemaId, data) => {
            const result = validateSchemaSafe(schemaId as ZodSchema, data);
            expect(result).toEqual(data);
        });

        it.each([
            ['CreateDuty', { name: 1 }],
            ['DeleteDuty', { id: 0, fullDelete: null }],
            ['FindDuties', { status: undefined }],
            ['UpdateDuty', { id: -1, name: '', status: null }],
        ])('returns null for invalid %s data', (schemaId, data) => {
            const result = validateSchemaSafe(schemaId as ZodSchema, data);
            expect(result).toBeNull();
        });
    });
});
