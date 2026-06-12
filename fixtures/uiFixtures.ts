import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/herokuapp/loginPage';
import { IframePage } from '../page-objects/herokuapp/iframePage';
import { UploadPage } from '../page-objects/herokuapp/uploadPage';
import { DownloadPage } from '../page-objects/herokuapp/downloadPage';
import { AlertsPage } from '../page-objects/herokuapp/alertsPage';
import { SliderPage } from '../page-objects/herokuapp/sliderPage';
import { DataTablePage } from '../page-objects/herokuapp/dataTable'

type UiFixtures = {
    loginPage: LoginPage;
    iframePage: IframePage;
    uploadPage: UploadPage;
    downloadPage: DownloadPage;
    alertsPage: AlertsPage;
    sliderPage: SliderPage;
    dataTablePage: DataTablePage
};

export const test = base.extend<UiFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    iframePage: async ({ page }, use) => {
        const iframePage = new IframePage(page);
        await use(iframePage);
    },

    uploadPage: async ({ page }, use) => {
        const uploadPage = new UploadPage(page);
        await use(uploadPage);
    },

    downloadPage: async ({ page }, use) => {
        const downloadPage = new DownloadPage(page);
        await use(downloadPage);
    },

    alertsPage: async ({ page }, use) => {
        const alertsPage = new AlertsPage(page);
        await use(alertsPage);
    },

    sliderPage: async ({ page }, use) => {
        const sliderPage = new SliderPage(page);
        await use(sliderPage);
    },

    dataTablePage: async({page}, use) => {
        const dataTablePage = new DataTablePage(page)
        await use(dataTablePage)
    }
});

export { expect } from '@playwright/test';
