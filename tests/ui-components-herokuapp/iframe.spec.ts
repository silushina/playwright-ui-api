import { test, expect } from '../../fixtures/uiFixtures';

test.beforeEach(async({iframePage}) => {
    await iframePage.navigateToiFramePage()
})

test('Verify iframe', async ({ iframePage }) => {
    await iframePage.navigateToiFramePage();
    await iframePage.closeAlert();

    const iframeText = await iframePage.getIframeBodyContent();
    expect(iframeText).toBe('Your content goes here.');
});
