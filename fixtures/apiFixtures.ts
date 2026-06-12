import { test as base } from '@playwright/test';
import { Booking } from '../booker-endpoints/booking';
import { Authentication } from '../booker-endpoints/createToken';

type ApiFixtures = {
    booking: Booking;
    authentication: Authentication;
};

export const test = base.extend<ApiFixtures>({
    booking: async ({ request }, use) => {
        const booking = new Booking(request);
        await use(booking);
    },

    authentication: async ({ request }, use) => {
        const authentication = new Authentication(request);
        await use(authentication);
    },
});

export { expect } from '@playwright/test';
