import { APIRequestContext, APIResponse } from "@playwright/test";
import {BookingData} from '../tests/api/types/apiBooking.types'

export class Booking {
    private readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async createBooking(bookingData: BookingData): Promise<APIResponse>{
        const response = await this.request.post('/booking', {
            data: bookingData
        })
                
        return response
    };

    async updateBooking(bookingID: number, bookingUpdate: BookingData, token: string): Promise<APIResponse>{
        const response = await this.request.put(`/booking/${bookingID}`, {
            data: bookingUpdate,
            headers: {
                Cookie: `token=${token}`
            }
        })
        return response
    };

    async partiallyUpdateBooking(bookingID: number, bookingUpdate: Partial<BookingData>, token: string): Promise<APIResponse>{
        const response = await this.request.patch(`/booking/${bookingID}`, {
            data: bookingUpdate, 
            headers: {
                Cookie: `token=${token}`
            }
        })      
        return response
    };

    async deleteBooking(bookingID: number, token: string): Promise<APIResponse>{
        const response = await this.request.delete(`/booking/${bookingID}`, {
            headers: {
                Cookie: `token=${token}`
            }
        })
        return response
    };

    async getBookingID(bookingID: number): Promise<APIResponse>{
        const response = await this.request.get(`/booking/${bookingID}`)
        return response
    };

    async getBookingsIDs(): Promise<APIResponse>{
        const response = await this.request.get('/booking')
        return response
    }
}