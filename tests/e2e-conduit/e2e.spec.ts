import {test, expect} from '../../fixtures/conduitFixtures'
import {faker} from '@faker-js/faker';

test('Verify that user can create an article', async({mainPage, createArticlePage, articleDetailsPage}) => {
    await mainPage.openMainPage()

    const articleData = {
        title: `${faker.commerce.productName()}${faker.number.int(1000)}`,
        description: faker.commerce.productDescription(),
        content: faker.lorem.paragraphs(3),
        tags: faker.string.alphanumeric()
    }
    await mainPage.navigateToNewArticlePage()
    await createArticlePage.createArticle(articleData.title, articleData.description, articleData.content, articleData.tags)
    await expect(articleDetailsPage.articleTitle).toContainText(articleData.title)
    await expect(articleDetailsPage.articleContent).toContainText(articleData.content)
    

    await mainPage.navigateToHome()
    const createdArticle = mainPage.getArticle(articleData.title)
    await expect(createdArticle).toBeVisible()
    await expect(createdArticle.locator('p')).toContainText(articleData.description)
})