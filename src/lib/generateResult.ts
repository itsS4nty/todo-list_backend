import { HttpStatus } from '@enums/httpStatus';

export const generateResult = <T>(value: T) => {
    return {
        error: true,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: value,
        error_message: 'General error',
    };
};
