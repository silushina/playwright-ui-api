import Ajv, { AnySchema } from 'ajv';
import addFormats from 'ajv-formats';
import { expect } from '@playwright/test';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateResponseSchema(schema: AnySchema, data: unknown) {
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    expect(isValid, `error: ${JSON.stringify(validate.errors)}`).toBe(true);
}
