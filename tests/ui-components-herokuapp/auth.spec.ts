import { test, expect } from '../../fixtures/uiFixtures';
import { faker } from '@faker-js/faker';

test.describe('Authentication', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
    });

    test('Verify login with valid credentials', async ({ loginPage }) => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(loginPage.flashMessage).toContainText(
            'You logged into a secure area!',
        );
    });

    test('Verify that logout is successfull', async ({ loginPage }) => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        await loginPage.logout();
        await expect(loginPage.flashMessage).toContainText(
            'You logged out of the secure area!',
        );
    });

    test('Verify login with invalid username', async ({ loginPage }) => {
        const randomUsername = faker.internet.username();

        await loginPage.login(randomUsername, 'SuperSecretPassword!');
        await expect(loginPage.flashMessage).toContainText(
            'Your username is invalid!',
        );
    });

    test('Verify login with invalid password', async ({ loginPage }) => {
        const randomPassword = faker.internet.password();

        await loginPage.login('tomsmith', randomPassword);
        await expect(loginPage.flashMessage).toContainText(
            'Your password is invalid!',
        );
    });

    test('Verify login with empty fields', async ({ loginPage }) => {
        await loginPage.login('', '');
        await expect(loginPage.flashMessage).toContainText(
            'Your username is invalid!',
        );
    });
});
