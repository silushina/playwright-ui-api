import { test, expect } from '../../fixtures/uiFixtures';

test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.navigateToAlertsPage();
});

test('Verify text after accepting JS alert', async ({ alertsPage }) => {
    await alertsPage.triggerAndAcceptAlert();
    await expect(alertsPage.resultSection).toHaveText(
        `You successfully clicked an alert`,
    );
});

test('Verify text after accepting JS confirm', async ({ alertsPage }) => {
    await alertsPage.triggerAndAcceptConfirm();
    await expect(alertsPage.resultSection).toHaveText(`You clicked: Ok`);
});

test('Verify text after cancelling JS confirm', async ({ alertsPage }) => {
    await alertsPage.triggerAndDismissConfirm();
    await expect(alertsPage.resultSection).toHaveText(`You clicked: Cancel`);
});

test('Verify text after accepting JS prompt', async ({ alertsPage }) => {
    const promptText = 'enter some text';

    await alertsPage.triggerAndAcceptPrompt(promptText);
    await expect(alertsPage.resultSection).toHaveText(
        `You entered: ${promptText}`,
    );
});
