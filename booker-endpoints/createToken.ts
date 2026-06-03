import { APIRequestContext } from "@playwright/test";

export class Authentication {
    private readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async getToken(): Promise<string>{
        const response = await this.request.post('/auth', {
            data: {
                username: "admin", 
                password: "password123"
            }
        })
        const responseBody = await response.json()
        return responseBody.token
    };
}