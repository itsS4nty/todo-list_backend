// generateResult.test.ts
import { HttpStatus } from '../../src/enums/httpStatus';
import { generateResult } from '../../src/lib/generateResult';

describe('generateResult', () => {
    it('should return a default error structure for string values', () => {
        const result = generateResult<string>('Test data');
        expect(result).toEqual({
            error: true,
            status_code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: 'Test data',
            error_message: 'General error',
        });
    });

    it('should return a default error structure for numeric values', () => {
        const result = generateResult<number>(123);
        expect(result).toEqual({
            error: true,
            status_code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: 123,
            error_message: 'General error',
        });
    });

    it('should return a default error structure for object values', () => {
        const data = { id: 1, name: 'Test Object' };
        const result = generateResult<typeof data>(data);
        expect(result).toEqual({
            error: true,
            status_code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: data,
            error_message: 'General error',
        });
    });
});
