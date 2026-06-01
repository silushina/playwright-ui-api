import {test as setup} from '@playwright/test';
import {LoginPage} from '../../page-objects/conduit/conduitLoginPage'

const authState = '.auth/user.json'

setup('authentication', async({page}) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(process.env.CONDUIT_USER_EMAIL!, process.env.CONDUIT_USER_PASSWORD!)

    await page.waitForResponse('**/api/tags')
    await page.context().storageState({path: authState})
})