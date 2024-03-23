import { log } from 'console';
import { QueryResult } from 'pg';
import { query } from '../database/connect';
import { DutyStatus } from '../enums/dutyStatus';
import { IDuty } from '../models/duty.interface';

/**
 * Retrieves duties from the database, filtering based on their deletion status.
 * This function allows for the selective retrieval of duties that have either been deleted or are active,
 * depending on the value of the `deletedDuties` parameter.
 *
 * @param {boolean} deletedDuties - Controls the filter condition for the query.
 *        If `true`, the function retrieves duties that are marked as deleted.
 *        If `false`, it retrieves duties that are not marked as deleted.
 * @returns {Promise<QueryResult<T> | null>} A promise that resolves to the retrieved duties matching the specified deletion status.
 *         The promise returns `null` if an error occurs during the database query execution.
 */
export const findDuties = async (deletedDuties: boolean): Promise<QueryResult<IDuty> | null> => {
    try {
        const operator = deletedDuties ? '=' : '!=';
        const data = await query<IDuty>(`SELECT * FROM duties WHERE status ${operator} $1`, [
            DutyStatus.DELETED,
        ]);
        return data;
    } catch (err) {
        log(err);
        return null;
    }
};

/**
 * Inserts a new duty into the database.
 *
 * @param {string} name - The name of the new duty to be inserted.
 * @returns {Promise<boolean>} True if the insertion was successful, false otherwise.
 */
export const insertDuty = async (name: string): Promise<boolean> => {
    const now = Date.now();
    try {
        await query('INSERT INTO duties VALUES (DEFAULT, $1, $2, $3, $4)', [
            name,
            DutyStatus.PENDING,
            now,
            now,
        ]);
        return true;
    } catch (err) {
        log(err);
        return false;
    }
};

/**
 * Updates an existing duty in the database. Can update the name and/or status of the duty.
 *
 * @param {number} id - The ID of the duty to update.
 * @param {string} [name] - The new name of the duty, if updating the name.
 * @param {DutyStatus} [status] - The new status of the duty, if updating the status.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateDuty = async (
    id: number,
    name?: string,
    status?: DutyStatus,
): Promise<boolean> => {
    let _query = 'UPDATE duties SET';
    const queryParams = [];
    let paramIndex = 1;

    if (name !== undefined) {
        _query += ` name = $${paramIndex++},`;
        queryParams.push(name);
    }
    if (status !== undefined) {
        _query += ` status = $${paramIndex++},`;
        queryParams.push(status);
    }

    _query = _query.replace(/,$/, '') + ` WHERE id = $${paramIndex}`;
    queryParams.push(id);

    if (queryParams.length === 1) {
        log('No updates specified.');
        return false;
    }

    try {
        await query(_query, queryParams);
        return true;
    } catch (err) {
        log(err);
        return false;
    }
};

/**
 * Marks a duty as deleted in the database without actually removing its record.
 *
 * @param {number} id - The ID of the duty to mark as deleted.
 * @returns {Promise<boolean>} True if the duty was successfully marked as deleted, false otherwise.
 */
export const deleteDuty = async (id: number): Promise<boolean> => {
    try {
        const _query = 'UPDATE duties SET status = $1 WHERE id = $2';
        const queryParams = [DutyStatus.DELETED, id];
        await query(_query, queryParams);
        return true;
    } catch (err) {
        log(err);
        return false;
    }
};

/**
 * Completely removes a duty's record from the database.
 *
 * @param {number} id - The ID of the duty to completely remove.
 * @returns {Promise<boolean>} True if the duty was successfully removed from the database, false otherwise.
 */
export const fullDeleteDuty = async (id: number): Promise<boolean> => {
    try {
        const _query = 'DELETE FROM duties WHERE id = $1';
        const queryParams = [id];
        await query(_query, queryParams);
        return true;
    } catch (err) {
        log(err);
        return false;
    }
};
