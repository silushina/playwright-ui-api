import { test, expect } from '../../fixtures/uiFixtures';
import path from 'path';

test.beforeEach(async({downloadPage}) => {
    await downloadPage.navigateToDownloadPage()
})

test('Verify that file is downloaded', async ({ downloadPage }) => {
    const firstFile = downloadPage.fileLink.first()
    await expect(firstFile).toBeVisible()
    const firstFileName = await firstFile.innerText()

    const download = await downloadPage.downloadFile(firstFileName);
    expect(download.suggestedFilename()).toBe(firstFileName);

    const downloadFailure = await download.failure();
    expect(downloadFailure).toBeNull();

    const filePath = await download.path();
    expect(filePath).toBeTruthy();
});

test('Verify the content of the downloaded file', async ({ downloadPage, uploadPage }) => {
    //uploading a custom file to avoid herokuapp constant content updates
    const fileName = 'downloadMe.txt';
    const expectedText = 'This is a sample file for Playwright download test.';

    await uploadPage.navigateToUploaderPage()
    const filePath = path.join(__dirname, `../../test-data/${fileName}`);
    await uploadPage.uploadeFileViaChooseFile(filePath);

    await downloadPage.navigateToDownloadPage()
    const download = await downloadPage.downloadFile(fileName);
    const fileContent = await downloadPage.getFileContent(download);

    expect(fileContent).toContain(expectedText);
});
