import {test, expect} from '../../fixtures/uiFixture';

test('Test with iframe', async({iframePage}) => {
    await iframePage.navigateToiFramePage()
    await iframePage.closeAlert()

    const iframeText = await iframePage.getIframeBodyContent()
    expect(iframeText).toBe('Your content goes here.')
})

