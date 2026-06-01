import {FrameLocator, Locator, Page} from '@playwright/test';

export class IframePage{
    private readonly page: Page
    private readonly alertButton: Locator
    private readonly frame: FrameLocator
    private readonly iframeBody: Locator

    constructor(page: Page){
        this.page = page
        this.alertButton = page.locator('.tox-notification__dismiss')
        this.frame = page.frameLocator('#mce_0_ifr')
        this.iframeBody = this.frame.locator('#tinymce')

    }

    async navigateToiFramePage(){
        await this.page.goto('https://the-internet.herokuapp.com/iframe')

    }

    async closeAlert(){
        await this.alertButton.click()
    }

    async getIframeBodyContent(): Promise<string> {
        return await this.iframeBody.innerText()
    }


}