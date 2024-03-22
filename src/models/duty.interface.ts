import { DutyStatus } from '../enums/dutyStatus';

export interface IDuty {
    id: number;
    name: string;
    status: DutyStatus;
    created_at: number;
    modified_at: number;
}
