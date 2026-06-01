import {test as base} from '@playwright/test';
import {LoginPage} from '../page-objects/conduit/conduitLoginPage';
import {CreateArticlePage} from '../page-objects/conduit/createArticlePage';
import {MainPage} from '../page-objects/conduit/mainPage';
import {ArticleDetailsPage} from '../page-objects/conduit/articleDetailsPage';

type ConduitFixtures = {
    loginPage: LoginPage
    createArticlePage: CreateArticlePage
    mainPage: MainPage
    articleDetailsPage: ArticleDetailsPage
}

export const test = base.extend<ConduitFixtures>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    createArticlePage: async({page}, use) => {
        const createArticlePage = new CreateArticlePage(page)
        await use(createArticlePage)
    },

    mainPage: async({page}, use) => {
        const mainPage = new MainPage(page)
        await use(mainPage)
    },

    articleDetailsPage: async({page}, use) => {
        const articleDetailsPage = new ArticleDetailsPage(page)
        await use(articleDetailsPage)
    }
})

export {expect} from '@playwright/test'