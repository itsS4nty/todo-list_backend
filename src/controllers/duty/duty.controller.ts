import { HttpStatus } from '../../enums/httpStatus';
import { generateResult } from '../../lib/generateResult';
import { findDuties, insertDuty, updateDuty, fullDeleteDuty, deleteDuty } from '../../services/duty.service';
import { FindDuties, CreateDuty, UpdateDuty, DeleteDuty } from '../../types/duty/request';
import { GetDutiesResponse, DutiesData, CreateDutyResponse, UpdateDutyRespone, DeleteDutyResponse } from '../../types/duty/response';

export const getDuties = async (data: FindDuties | null) => {
    const result: GetDutiesResponse = generateResult<DutiesData[]>([]);
    if(!data) {
        result.error_message = 'Some properties are missing or does not have the correct type.';
        result.status_code = HttpStatus.BAD_REQUEST;
        return result;
    }
    try {
        const _data = await findDuties(data.status);
        if(!_data) {
            result.error_message = 'Error when getting duties.';
            result.status_code = HttpStatus.BAD_REQUEST;
            return result;
        }

        result.data = _data.rows
            .sort((a, b) => b.modified_at - a.modified_at)
            .map(r => ({
                id: r.id,
                name: r.name,
            }));
    } catch (err) {
        result.error_message = JSON.stringify(err);
        result.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        return result;
    }

    result.status_code = HttpStatus.OK;
    result.error_message = null;
    result.error = false;

    return result;
};

export const addDuty = async (data: CreateDuty | null) => {
    const result: CreateDutyResponse = generateResult<boolean>(false);
    if(!data) {
        result.error_message = 'Some properties are missing or does not have the correct type.';
        result.status_code = HttpStatus.BAD_REQUEST;
        return result;
    }
    try {
        const _data = await insertDuty(data.name);
        if(!_data) {
            result.error_message = 'Error when creating duty.';
            result.status_code = HttpStatus.BAD_REQUEST;
            return result;
        }

        result.data = true;
    } catch (err) {
        result.error_message = JSON.stringify(err);
        result.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        return result;
    }

    result.status_code = HttpStatus.OK;
    result.error_message = null;
    result.error = false;

    return result;
};

export const updDuty = async (data: UpdateDuty | null) => {
    const result: UpdateDutyRespone = generateResult<boolean>(false);
    if(!data) {
        result.error_message = 'Some properties are missing or does not have the correct type.';
        result.status_code = HttpStatus.BAD_REQUEST;
        return result;
    }
    try {
        const _data = await updateDuty(data.id, data.name, data.status);
        if(!_data) {
            result.error_message = 'Error when updating duty.';
            result.status_code = HttpStatus.BAD_REQUEST;
            return result;
        }

        result.data = true;
    } catch (err) {
        result.error_message = JSON.stringify(err);
        result.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        return result;
    }

    result.status_code = HttpStatus.OK;
    result.error_message = null;
    result.error = false;

    return result;
};

export const delDuty = async (data: DeleteDuty | null) => {
    const result: DeleteDutyResponse = generateResult<boolean>(false);
    if(!data) {
        result.error_message = 'Some properties are missing or does not have the correct type.';
        result.status_code = HttpStatus.BAD_REQUEST;
        return result;
    }
    try {
        const _data = data.fullDelete ? await fullDeleteDuty(data.id) : await deleteDuty(data.id);
        if(!_data) {
            result.error_message = 'Error when deleting duty.';
            result.status_code = HttpStatus.BAD_REQUEST;
            return result;
        }

        result.data = true;
    } catch (err) {
        result.error_message = JSON.stringify(err);
        result.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        return result;
    }

    result.status_code = HttpStatus.OK;
    result.error_message = null;
    result.error = false;

    return result;
};
