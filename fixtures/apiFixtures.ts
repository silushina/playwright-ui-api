import {test as base} from '@playwright/test';
import { Booking } from '../page-objects/booker/apiBooking';

type ApiFixtures = {
    booking: Booking
}

export const test = base.extend<ApiFixtures>({
    booking: async({request}, use) => {
        const booking = new Booking(request)
        await use(booking)
    },
})

export {expect} from '@playwright/test'