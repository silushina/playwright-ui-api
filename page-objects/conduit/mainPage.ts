import { Locator, Page } from '@playwright/test';

export class MainPage {
    public readonly page: Page;
    public readonly homeLink: Locator;
    public readonly signInLink: Locator;
    public readonly newArticleLink: Locator;
    public readonly articleTitle: Locator;
    public readonly articleDescription: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.signInLink = page.getByRole('link', { name: ' Sign in ' });
        this.newArticleLink = page.getByRole('link', { name: ' New Article ' });
        this.articleTitle = page.locator('app-article-preview h1');
        this.articleDescription = page.locator('app-article-preview p');
    }

    async openMainPage() {
        await this.page.goto('/');
    }

    async navigateToHome() {
        await this.homeLink.click();
    }

    async navigateToNewArticlePage() {
        await this.newArticleLink.click();
    }

    async navigateToLoginPage() {
        await this.signInLink.click();
    }

    getArticle(title: string) {
        const article = this.page
            .locator('.article-preview')
            .filter({ hasText: title });
        return {
            card: article,
            description: article.locator('p'),
        };
    }
}
