import { Locator, Page, expect } from '@playwright/test';

export class AlertsPage {
    readonly page: Page;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly resultSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertButton = page.getByRole('button', {
            name: `Click for JS Alert`,
        });
        this.confirmButton = page.getByRole('button', {
            name: 'Click for JS Confirm',
        });
        this.promptButton = page.getByRole('button', {
            name: 'Click for JS Prompt',
        });
        this.resultSection = page.locator('#result');
    }

    async navigateToAlertsPage() {
        await this.page.goto('/javascript_alerts');
    }

    private dialogHelper(
        dialogMessage: string,
        action: 'accept' | 'dismiss',
        inputText?: string,
    ) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toEqual(dialogMessage);
            if (action === 'accept') {
                await dialog.accept(inputText);
            } else {
                await dialog.dismiss();
            }
        });
    }

    async triggerAndAcceptAlert(): Promise<void> {
        this.dialogHelper('I am a JS Alert', 'accept');
        await this.alertButton.click();
    }

    async triggerAndAcceptConfirm(): Promise<void> {
        this.dialogHelper('I am a JS Confirm', 'accept');
        await this.confirmButton.click();
    }

    async triggerAndDismissConfirm(): Promise<void> {
        this.dialogHelper('I am a JS Confirm', 'dismiss');
        await this.confirmButton.click();
    }

    async triggerAndAcceptPrompt(inputText: string): Promise<void> {
        this.dialogHelper('I am a JS prompt', 'accept', inputText);
        await this.promptButton.click();
    }
}
