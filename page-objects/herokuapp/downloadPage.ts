import { Page, Locator, Download } from '@playwright/test';
import fs from 'fs/promises';

export class DownloadPage {
    readonly page: Page;
    readonly fileLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileLink = page.locator('div.example a');
    }

    async navigateToDownloadPage(): Promise<void> {
        await this.page.goto('/download');
    }

    async downloadFile(file: string) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.fileLink.filter({ hasText: file }).click();
        return await downloadPromise;
    }

    async getFileContent(download: Download): Promise<string> {
        const filePath = await download.path();

        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
    }
}
