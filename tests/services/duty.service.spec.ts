import { findDuties, insertDuty, updateDuty, deleteDuty, fullDeleteDuty } from '../../src/services/duty.service';
import * as databaseModule from '../../src/database/connect';
import { log } from 'console';
import { DutyStatus } from '../../src/enums/dutyStatus';

jest.mock('../../src/database/connect', () => ({
    query: jest.fn(),
    createTables: jest.fn(),
}));

jest.mock('console', () => ({
    log: jest.fn(),
}));

describe('Duties Functions', () => {
    const mockedQuery = databaseModule.query as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findDuties', () => {
        it('should return data on success', async () => {
            const mockData = { rows: ['duty1', 'duty2'] };
            mockedQuery.mockResolvedValueOnce(mockData);
            const result = await findDuties(DutyStatus.PENDING);
            expect(mockedQuery).toHaveBeenCalledWith('SELECT * FROM duties WHERE status = $1', [
                DutyStatus.PENDING,
            ]);
            expect(result).toEqual(mockData);
        });

        it('should return null on query failure', async () => {
            mockedQuery.mockRejectedValue(new Error('Query failed'));
            const result = await findDuties(DutyStatus.PENDING);
            expect(log).toHaveBeenCalledWith(expect.any(Error));
            expect(result).toBeNull();
        });
    });

    describe('insertDuty', () => {
        it('returns true on successful insertion', async () => {
            mockedQuery.mockResolvedValueOnce({});
            const result = await insertDuty('Test Duty');
            expect(mockedQuery).toHaveBeenCalledTimes(1);
            expect(result).toBe(true);
        });

        it('returns false and logs error on failure', async () => {
            mockedQuery.mockRejectedValue(new Error('Insert failed'));
            const result = await insertDuty('Test Duty');
            expect(log).toHaveBeenCalledWith(expect.any(Error));
            expect(result).toBe(false);
        });
    });

    describe('updateDuty', () => {
        it('returns true on successful update', async () => {
            mockedQuery.mockResolvedValueOnce({});
            const result = await updateDuty(1, 'Updated Duty', DutyStatus.DONE);
            expect(mockedQuery).toHaveBeenCalled();
            expect(result).toBe(true);
        });

        it('returns false when no updates are specified', async () => {
            const result = await updateDuty(1);
            expect(log).toHaveBeenCalledWith('No updates specified.');
            expect(result).toBe(false);
        });

        it('returns false and logs error on failure', async () => {
            mockedQuery.mockRejectedValue(new Error('Update failed'));
            const result = await updateDuty(1, 'Updated Duty');
            expect(log).toHaveBeenCalledWith(expect.any(Error));
            expect(result).toBe(false);
        });
    });

    describe('deleteDuty', () => {
        it('returns true on successful soft delete', async () => {
            mockedQuery.mockResolvedValueOnce({});
            const result = await deleteDuty(1);
            expect(mockedQuery).toHaveBeenCalledWith(
                'UPDATE duties SET status = $1 WHERE id = $2',
                [DutyStatus.DELETED, 1],
            );
            expect(result).toBe(true);
        });

        it('returns false and logs error on failure', async () => {
            mockedQuery.mockRejectedValue(new Error('Soft delete failed'));
            const result = await deleteDuty(1);
            expect(log).toHaveBeenCalledWith(expect.any(Error));
            expect(result).toBe(false);
        });
    });

    describe('fullDeleteDuty', () => {
        it('returns true on successful record deletion', async () => {
            mockedQuery.mockResolvedValueOnce({});
            const result = await fullDeleteDuty(1);
            expect(mockedQuery).toHaveBeenCalledWith('DELETE FROM duties WHERE id = $1', [1]);
            expect(result).toBe(true);
        });

        it('returns false and logs error on deletion failure', async () => {
            mockedQuery.mockRejectedValue(new Error('Delete failed'));
            const result = await fullDeleteDuty(1);
            expect(log).toHaveBeenCalledWith(expect.any(Error));
            expect(result).toBe(false);
        });
    });
});
