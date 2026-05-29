import { APIRequestContext, APIResponse } from "@playwright/test";
import {BookingData} from '../tests/api/types/apiBooking.types'

export class Booking {
    readonly request: APIRequestContext
    private token: string | null = null

    constructor(request: APIRequestContext){
        this.request = request
    }

    async getToken(): Promise<string>{
        if(!this.token){
            const response = await this.request.post('/auth', {
                data: {
                    username: "admin", 
                    password: "password123"
                }
            })
            const responseBody = await response.json()
            this.token = responseBody.token
        }
        return this.token!
    };

        // const response = await booking.getToken("admin", "password123")
    // expect(response.status()).toEqual(200)
    // const responseBody = await response.json()
    // const token = responseBody.token

    async createBooking(bookingData: BookingData): Promise<APIResponse>{
        const response = await this.request.post('/booking', {
            data: bookingData
        })
                
        return response
    };

    async partiallyUpdateBooking(bookingID: number, bookingUpdate: Partial<BookingData>): Promise<APIResponse>{
        const activeToken = await this.getToken()

        const response = await this.request.patch(`/booking/${bookingID}`, {
            data: bookingUpdate, 
            headers: {
                Cookie: `token=${activeToken}`
            }
        })      
        return response
    };
}