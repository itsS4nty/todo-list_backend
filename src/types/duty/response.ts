import { _Response } from '@customTypes/response';

export type DutiesData = {
    id: number;
    name: string;
};

export type GetDutiesResponse = _Response<DutiesData[]>;

export type CreateDutyResponse = _Response<boolean>;

export type UpdateDutyRespone = _Response<boolean>;

export type DeleteDutyResponse = _Response<boolean>;
