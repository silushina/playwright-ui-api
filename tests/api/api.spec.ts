import {test, expect} from '../../fixtures/apiFixtures';
import {faker} from '@faker-js/faker';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {bookingSchema} from './schemas/booking.schema';

const ajv = new Ajv({allErrors: true});
addFormats(ajv);
const validate = ajv.compile(bookingSchema)

test('Verify that booking is updated', async({booking})=> {
    const newBookingData = {
        "firstname" : faker.person.firstName(),
        "lastname" : faker.person.lastName(),
        "totalprice" : faker.number.int({min: 100, max: 1000}),
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2025-01-01",
            "checkout" : "2025-02-01"
        },
        "additionalneeds" : faker.food.dish()
    }
    const newBooking = await booking.createBooking(newBookingData)
    expect(newBooking.status()).toEqual(200)
    const newBookingBody = await newBooking.json()
    const newBookingID = newBookingBody.bookingid

    const updateData = {
        "totalprice" : faker.number.int({min: 100, max: 1000}),
        "depositpaid" : false,
        "additionalneeds" : faker.food.dish()
    }
    const updatedBooking = await booking.partiallyUpdateBooking(newBookingID, updateData)
    expect(updatedBooking.status()).toEqual(200)
    const updatedBookingBody = await updatedBooking.json()
    expect(updatedBookingBody).toMatchObject(updateData)
    
    //validate response schema
    const isValid = validate(updatedBookingBody)
    expect(isValid, `error: ${JSON.stringify(validate.errors)}`).toBe(true)
})