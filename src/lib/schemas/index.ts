import { ZodIssue } from 'zod';
import { findDutiesSchema } from './models/findDutiesSchema';
import { createDutySchema } from './models/createDutySchema';
import { updateDutySchema } from './models/updateDutySchema';
import { deleteDutySchema } from './models/deleteDutySchema';

const schemaCatalog = {
    FindDuties: findDutiesSchema,
    CreateDuty: createDutySchema,
    UpdateDuty: updateDutySchema,
    DeleteDuty: deleteDutySchema,
};

type SchemaCatalog = typeof schemaCatalog;

type ZodSchema = keyof SchemaCatalog;

export class SchemaValidationError extends Error {
    public readonly schema: ZodSchema;
    public readonly issues: ZodIssue[];

    constructor(schema: ZodSchema, message: string, issues: ZodIssue[]) {
        super(message);
        this.schema = schema;
        this.issues = issues;
    }
}

export const validateSchemaSafe = <T>(schemaId: ZodSchema, data: unknown): T | null => {
    try {
        return validateSchema(schemaId, data) as T;
    } catch (err) {
        if (err instanceof SchemaValidationError) {
            // log
        }
    }
    return null;
};

export const validateSchemaStrict = (schemaId: ZodSchema, data: unknown) => {
    try {
        return validateSchema(schemaId, data);
    } catch (err) {
        if (err instanceof SchemaValidationError) {
            // log
        }
        throw err;
    }
};

type SchemaOutput<T extends ZodSchema> = SchemaCatalog[T]['_output'];

const validateSchema = <T extends ZodSchema>(
    schemaId: ZodSchema,
    data: unknown,
): SchemaOutput<T> => {
    const result = schemaCatalog[schemaId].safeParse(data);

    if (!result.success)
        throw new SchemaValidationError(schemaId, result.error.message, result.error.issues);

    return result.data;
};
