import { test, expect } from '../../fixtures/apiFixtures';
import { validateResponseSchema } from '../../helpers/schemaValidator';
import { generateBookingData } from '../../helpers/dataGenerator';
import {
    createdBookingSchema,
    updatedBookingSchema,
} from './schemas/booking.schema';

test.describe('Positive API tests', () => {
    test('Verify that booking is created', async ({ booking }) => {
        const bookingData = generateBookingData();

        const newBooking = await booking.createBooking(bookingData);
        expect(newBooking.status()).toBe(200);

        const newBookingBody = await newBooking.json();
        validateResponseSchema(createdBookingSchema, newBookingBody);
    });

    test('Verify that booking is partially updated', async ({
        booking,
        authentication,
    }) => {
        const token = await authentication.getToken();

        const bookingData = generateBookingData();
        const newBooking = await booking.createBooking(bookingData);
        expect(newBooking.status()).toBe(200);

        const newBookingBody = await newBooking.json();
        const newBookingID = newBookingBody.bookingid;

        const patchBookingData = { totalprice: 1000, additionalneeds: '' };
        const patchedBooking = await booking.partiallyUpdateBooking(
            newBookingID,
            patchBookingData,
            token,
        );
        expect(patchedBooking.status()).toBe(200);

        const patchedBookingBody = await patchedBooking.json();
        expect(patchedBookingBody).toMatchObject(patchBookingData);

        validateResponseSchema(updatedBookingSchema, patchedBookingBody);
    });

    test('Verify that booking is updated', async ({
        booking,
        authentication,
    }) => {
        const token = await authentication.getToken();

        const bookingData = generateBookingData();
        const newBooking = await booking.createBooking(bookingData);
        expect(newBooking.status()).toBe(200);

        const newBookingBody = await newBooking.json();
        const newBookingID = newBookingBody.bookingid;

        const updateBookingData = generateBookingData();
        const updateBooking = await booking.updateBooking(
            newBookingID,
            updateBookingData,
            token,
        );
        expect(updateBooking.status()).toBe(200);

        const updateBookingBody = await updateBooking.json();
        expect(updateBookingBody).toMatchObject(updateBookingData);

        validateResponseSchema(updatedBookingSchema, updateBookingBody);
    });

    test('Verify that booking is deleted', async ({
        booking,
        authentication,
    }) => {
        const token = await authentication.getToken();

        const bookingData = generateBookingData();
        const newBooking = await booking.createBooking(bookingData);
        expect(newBooking.status()).toBe(200);

        const newBookingBody = await newBooking.json();
        const newBookingID = newBookingBody.bookingid;

        const deleteBooking = await booking.deleteBooking(
            newBookingBody.bookingid,
            token,
        );
        expect(deleteBooking.status()).toBe(201);

        const checkBooking = await booking.getBookingID(newBookingID);
        expect(checkBooking.status()).toBe(404);
    });
});

test.describe('Negative API tests', () => {
    test('Verify that booking is not be updated without token', async ({
        booking,
    }) => {
        const bookingData = generateBookingData();
        const newBooking = await booking.createBooking(bookingData);
        expect(newBooking.status()).toBe(200);

        const newBookingBody = await newBooking.json();
        const newBookingID = newBookingBody.bookingid;

        const updateBookingData = generateBookingData();
        const updateBooking = await booking.updateBooking(
            newBookingID,
            updateBookingData,
            '',
        );
        expect(updateBooking.status()).toBe(403);
    });

    //server returns 200 instead of 400
    test.fail(
        'Verify that booking is not created with invalid data type for depositpaid',
        async ({ booking }) => {
            const invalidData = generateBookingData({ depositpaid: 500 });

            const newBooking = await booking.createBooking(invalidData);
            expect(newBooking.status()).toBe(400);
        },
    );

    //server returns 500 instead of 400
    test.fail(
        'Verify that booking is not created without required field - booking dates',
        async ({ booking }) => {
            const bookingWithoutDates = generateBookingData({
                bookingdates: {},
            });
            const newBooking = await booking.createBooking(bookingWithoutDates);

            expect(newBooking.status()).toBe(400);
        },
    );
});
