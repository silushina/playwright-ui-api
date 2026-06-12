import { test, expect } from '../../fixtures/uiFixtures';

test.beforeEach(async({downloadPage}) => {
    await downloadPage.navigateToDownloadPage()
})

test('Verify that file is downloaded', async ({ downloadPage }) => {
    const fileName = 'random_data.txt';

    await downloadPage.navigateToDownloadPage();

    const download = await downloadPage.downloadFile(fileName);
    expect(download.suggestedFilename()).toBe(fileName);

    const downloadFailure = await download.failure();
    expect(downloadFailure).toBeNull();

    const filePath = await download.path();
    expect(filePath).toBeTruthy();
});

test('Verify the content of the downloaded file', async ({ downloadPage }) => {
    const fileName = 'sample-upload.txt';
    const expectedText = 'This is a sample file for Cypress upload test.';

    await downloadPage.navigateToDownloadPage();

    const download = await downloadPage.downloadFile(fileName);
    const fileContent = await downloadPage.getFileContent(download);

    expect(fileContent).toContain(expectedText);
});
