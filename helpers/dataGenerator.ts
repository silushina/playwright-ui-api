import {faker} from '@faker-js/faker'

export const generateBookingData = (customUpdates = {}) => {
    const checkinDate = faker.date.soon()
    const formattedCheckinDate = checkinDate.toISOString().split('T')[0]

    const checkoutDate = faker.date.soon({days: 30, refDate: checkinDate})
    const formattedCheckoutDate = checkoutDate.toISOString().split('T')[0]

    const bookingData = {
        "firstname" : faker.person.firstName(),
        "lastname" : faker.person.lastName(),
        "totalprice" : faker.number.int({min: 100, max: 1000}),
        "depositpaid" : faker.datatype.boolean(),
        "bookingdates" : {
            "checkin" : formattedCheckinDate,
            "checkout" : formattedCheckoutDate
        },
        "additionalneeds" : faker.food.dish(),
        ...customUpdates
    }
    return bookingData
}