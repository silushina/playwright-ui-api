export interface BookingDates {
    checkin: string;
    checkout: string;
}

export interface BookingData {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

export interface CreateBookingResponse {
    bookingid: number;
    booking: BookingData;
}
