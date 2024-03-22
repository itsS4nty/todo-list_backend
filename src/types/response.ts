import { HttpStatus } from '../enums/httpStatus';

export type _Response<T> = {
    error: boolean;
    error_message: string | null;
    status_code: HttpStatus;
    data: T;
};
