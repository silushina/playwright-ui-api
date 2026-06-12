import { Page, Locator } from '@playwright/test';

export class UploadPage {
    readonly page: Page;
    readonly chooseFileButton: Locator;
    readonly uploadButton: Locator;
    readonly textPanel: Locator;
    readonly uploadedFilesPanel: Locator;
    readonly dragNdropInput: Locator;
    readonly previewDetails: Locator;
    readonly previewSuccessMark: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseFileButton = page.locator('#file-upload');
        this.uploadButton = page.locator('#file-submit');
        this.textPanel = page.locator('#content');
        this.uploadedFilesPanel = page.locator('#uploaded-files');
        this.dragNdropInput = page.locator('input.dz-hidden-input');
        this.previewDetails = page.locator('.dz-success .dz-filename');
        this.previewSuccessMark = page.locator('.dz-success .dz-success-mark');
    }

    async navigateToUploaderPage(): Promise<void> {
        await this.page.goto('/upload');
    }

    async uploadeFileViaChooseFile(filePath: string): Promise<void> {
        await this.chooseFileButton.setInputFiles(filePath);
        await this.uploadButton.click();
    }

    async uploadFileViaDragNDrop(filePath: string | string[]): Promise<void> {
        await this.dragNdropInput.setInputFiles(filePath);
    }
}
