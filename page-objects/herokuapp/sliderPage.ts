import { Locator, Page } from '@playwright/test';

export class SliderPage {
    readonly page: Page;
    readonly slider: Locator;
    readonly sliderValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slider = page.locator('input[type="range"]');
        this.sliderValue = page.locator('#range');
    }

    async navigateToSliderpage() {
        await this.page.goto('/horizontal_slider');
    }

    async setSliderToTargetValue(targetValue: number): Promise<void>{
        if(targetValue < 0 || targetValue > 5){
            throw new Error(`Invalid target value: ${targetValue}. Target value must be within [0, 5] range.`)
        }

        await this.slider.focus();

        for (let i = 0; i < 20; i++) {
            const currentValue = Number(await this.sliderValue.innerText())
            if(targetValue === currentValue){
                break;
            } else if(targetValue > currentValue){
                await this.slider.press('ArrowRight');
            } else {
                await this.slider.press('ArrowLeft');
            }            
        }
    }
}
