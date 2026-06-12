import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    public readonly formAuthenticationLink: Locator;
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly flashMessage: Locator;
    public readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formAuthenticationLink = page.getByRole('link', {
            name: 'Form Authentication',
        });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: /login/i });
        this.flashMessage = page.locator('#flash');
        this.logoutButton = page.getByRole('link', { name: /logout/i });
    }

    async navigateToLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/');
        await this.formAuthenticationLink.click();
    }

    async login(userName: string, password: string) {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}
