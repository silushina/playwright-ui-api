import { test, expect } from '../../fixtures/uiFixtures';

test.beforeEach(async ({ sliderPage }) => {
    await sliderPage.navigateToSliderpage();
});

test('Verify that slider is set for a specific target value', async ({ sliderPage }) => {
    const targetValue = 3.5

    await sliderPage.setSliderToTargetValue(targetValue)

    await expect(sliderPage.sliderValue).toHaveText(`${targetValue}`);
});
