import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {expect} from '@playwright/test'

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

export function validateResponseSchema(schema: any, data: any){
    const validate = ajv.compile(schema)
    const isValid = validate(data)
    expect(isValid, `error: ${JSON.stringify(validate.errors)}`).toBe(true)
}

