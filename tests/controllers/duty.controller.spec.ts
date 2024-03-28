import { getDuties, addDuty, updDuty, delDuty } from '../../src/controllers/duty/duty.controller';
import * as dutyService from '../../src/services/duty.service';
import * as generateResultModule from '../../src/lib/generateResult';
import { HttpStatus } from '../../src/enums/httpStatus';
import { DutyStatus } from '../../src/enums/dutyStatus';

jest.mock('../../src/services/duty.service');
jest.mock('../../src/lib/generateResult');

const mockedDutyService = dutyService as jest.Mocked<typeof dutyService>;
const mockedGenerateResult = generateResultModule.generateResult as jest.Mock;

describe('Duty Controller Functions', () => {
    // Setup common mock return structure for generateResult
    beforeEach(() => {
        jest.clearAllMocks();
        mockedGenerateResult.mockImplementation(defaultValue => ({
            data: defaultValue,
            error: true,
            status_code: HttpStatus.INTERNAL_SERVER_ERROR,
            error_message: 'General error',
        }));
    });

    describe('getDuties', () => {
        const mockFindDutiesData = {
            rows: [
                {
                    id: 1,
                    name: 'Test Duty',
                    status: DutyStatus.PENDING,
                    created_at: Date.now(),
                    modified_at: Date.now(),
                },
            ],
            command: 'SELECT',
            rowCount: 1,
            oid: 1,
            fields: [],
        };

        it('returns duties correctly when valid data is provided', async () => {
            mockedDutyService.findDuties.mockResolvedValueOnce(mockFindDutiesData);
            const response = await getDuties({ status: DutyStatus.PENDING });

            expect(dutyService.findDuties).toHaveBeenCalledWith(DutyStatus.PENDING);
            expect(response.data).toEqual([{ id: 1, name: 'Test Duty' }]);
            expect(response.status_code).toBe(HttpStatus.OK);
        });

        it('returns error when data is null', async () => {
            const response = await getDuties(null);

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.BAD_REQUEST);
        });

        it('handles exceptions thrown by findDuties service', async () => {
            mockedDutyService.findDuties.mockRejectedValue(new Error('Internal Server Error'));
            const response = await getDuties({ status: DutyStatus.PENDING });

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    });

    describe('addDuty', () => {
        it('successfully adds a duty', async () => {
            mockedDutyService.insertDuty.mockResolvedValueOnce(true);
            const response = await addDuty({ name: 'New Duty' });

            expect(dutyService.insertDuty).toHaveBeenCalledWith('New Duty');
            expect(response.data).toBe(true);
            expect(response.status_code).toBe(HttpStatus.OK);
        });

        it('returns error for null data', async () => {
            const response = await addDuty(null);

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.BAD_REQUEST);
        });

        it('handles exceptions thrown during duty insertion', async () => {
            mockedDutyService.insertDuty.mockRejectedValue(new Error('Insertion Failed'));
            const response = await addDuty({ name: 'Failing Duty' });

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    });

    describe('updDuty', () => {
        it('successfully updates a duty', async () => {
            mockedDutyService.updateDuty.mockResolvedValueOnce(true);
            const response = await updDuty({
                id: 1,
                name: 'Updated Duty',
                status: DutyStatus.DONE,
            });

            expect(dutyService.updateDuty).toHaveBeenCalledWith(1, 'Updated Duty', DutyStatus.DONE);
            expect(response.data).toBe(true);
            expect(response.status_code).toBe(HttpStatus.OK);
        });

        it('returns error for null data', async () => {
            const response = await updDuty(null);

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.BAD_REQUEST);
        });

        it('handles exceptions during duty update', async () => {
            mockedDutyService.updateDuty.mockRejectedValue(new Error('Update Failed'));
            const response = await updDuty({
                id: 1,
                name: 'Failing Update',
                status: DutyStatus.DONE,
            });

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    });

    describe('delDuty', () => {
        it('successfully deletes a duty', async () => {
            mockedDutyService.deleteDuty.mockResolvedValueOnce(true);
            const response = await delDuty({ id: 1, fullDelete: false });

            expect(dutyService.deleteDuty).toHaveBeenCalledWith(1);
            expect(response.data).toBe(true);
            expect(response.status_code).toBe(HttpStatus.OK);
        });

        it('successfully fully deletes a duty', async () => {
            mockedDutyService.fullDeleteDuty.mockResolvedValueOnce(true);
            const response = await delDuty({ id: 2, fullDelete: true });

            expect(dutyService.fullDeleteDuty).toHaveBeenCalledWith(2);
            expect(response.data).toBe(true);
            expect(response.status_code).toBe(HttpStatus.OK);
        });

        it('returns error for null data', async () => {
            const response = await delDuty(null);

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.BAD_REQUEST);
        });

        it('handles exceptions during duty deletion', async () => {
            mockedDutyService.deleteDuty.mockRejectedValue(new Error('Deletion Failed'));
            const response = await delDuty({ id: 1, fullDelete: false });

            expect(response.error_message).not.toBeNull();
            expect(response.status_code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    });
});
