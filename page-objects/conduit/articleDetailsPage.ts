import { Locator, Page } from '@playwright/test';

export class ArticleDetailsPage {
    private readonly page: Page;
    public readonly articleTitle: Locator;
    public readonly articleContent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitle = page.locator('app-article-page h1');
        this.articleContent = page.locator('app-article-page p');
    }
}
