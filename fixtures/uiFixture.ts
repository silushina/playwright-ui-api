import {test as base} from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { IframePage } from '../page-objects/iframePage';

type UiFixtures = {
    loginPage: LoginPage
    iframePage: IframePage
}

export const test = base.extend<UiFixtures>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    iframePage: async({page}, use) => {
        const iframePage = new IframePage(page)
        await use(iframePage)
    }
})

export {expect} from '@playwright/test'