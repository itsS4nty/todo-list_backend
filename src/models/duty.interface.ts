import { DutyStatus } from '../enums/dutyStatus';

export interface IDuty {
    id: string;
    name: string;
    status: DutyStatus;
    createdAt: number;
    modifiedAt: number;
}
