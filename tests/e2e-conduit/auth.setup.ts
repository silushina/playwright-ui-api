import {test as setup} from '@playwright/test';
import fs from 'fs';

const authState = '.auth/user.json'

setup('authentication', async({request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data: {
            'user': {
                'email': process.env.CONDUIT_USER_EMAIL!, 
                'password': process.env.CONDUIT_USER_PASSWORD!
            }
        }
    })
    
    const responseBody = await response.json()
    const token = responseBody.user.token
   
    const storageState = {
        "cookies": [],
        "origins": [
            {
            "origin": "https://conduit.bondaracademy.com",
            "localStorage": [
                {
                "name": "jwtToken",
                "value": token
                }
            ]
            }
        ]
    }

    if(!fs.existsSync('.auth')){
        fs.mkdirSync('.auth');
    }

    fs.writeFileSync(authState, JSON.stringify(storageState))
})