import { Locator, Page } from '@playwright/test';

export class CreateArticlePage {
    private readonly page: Page;
    private readonly articleTitleInput: Locator;
    private readonly articleDescriptionInput: Locator;
    private readonly articleContentInput: Locator;
    private readonly articleTagInput: Locator;
    private readonly publishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitleInput = page.getByRole('textbox', {
            name: 'Article Title',
        });
        this.articleDescriptionInput = page.getByRole('textbox', {
            name: "What's this article about?",
        });
        this.articleContentInput = page.getByRole('textbox', {
            name: 'Write your article (in markdown)',
        });
        this.articleTagInput = page.getByRole('textbox', {
            name: 'Enter tags',
        });
        this.publishButton = page.getByRole('button', {
            name: ' Publish Article ',
        });
    }

    async createArticle(
        title: string,
        description: string,
        content: string,
        tags: string,
    ) {
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.fill(description);
        await this.articleContentInput.fill(content);
        await this.articleTagInput.fill(tags);
        await this.publishButton.click();
    }
}
