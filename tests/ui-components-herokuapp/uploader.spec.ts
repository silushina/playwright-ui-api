import { test, expect } from '../../fixtures/uiFixtures';
import path from 'path';

test.beforeEach(async({uploadPage}) => {
    await uploadPage.navigateToUploaderPage()
})

test('Verify that file can be uploaded via Choose file button', async ({
    uploadPage,
}) => {
    await uploadPage.navigateToUploaderPage();

    const testFile = '1MB.jpg';
    const filePath = path.join(__dirname, `../../test-data/${testFile}`);
    await uploadPage.uploadeFileViaChooseFile(filePath);

    await expect(uploadPage.textPanel).toContainText('File Uploaded!');
    await expect(uploadPage.uploadedFilesPanel).toContainText(testFile);
});

test('Verify that file can be uploaded via Drag&Drop', async ({
    uploadPage,
}) => {
    await uploadPage.navigateToUploaderPage();

    const testFile = '1MB.jpg';
    const filePath = path.join(__dirname, `../../test-data/${testFile}`);
    await uploadPage.uploadFileViaDragNDrop(filePath);

    await expect(uploadPage.previewDetails).toContainText(testFile);
    await expect(uploadPage.previewSuccessMark).toBeVisible();
});

test('Verify that multiple files can be uploaded via Drag&Drop', async ({
    uploadPage,
}) => {
    await uploadPage.navigateToUploaderPage();

    const testFiles = ['1MB.jpg', '6MB.pdf'];
    const filesPathsArray = testFiles.map((file) =>
        path.join(__dirname, `../../test-data/${file}`),
    );
    await uploadPage.uploadFileViaDragNDrop(filesPathsArray);

    await expect(uploadPage.previewDetails).toContainText(testFiles);
    await expect(uploadPage.previewSuccessMark).toHaveCount(testFiles.length);
});
