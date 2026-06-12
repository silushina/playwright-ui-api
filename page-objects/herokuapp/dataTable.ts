import { Page, Locator, expect } from "@playwright/test";

export class DataTablePage{
    readonly page: Page
    readonly firstTable: Locator
    readonly secondTable: Locator
    readonly columnHeaders: Locator
    
    constructor(page: Page){
        this.page = page
        this.firstTable = page.locator('#table1')
        this.secondTable = page.locator('#table2')
        this.columnHeaders = this.secondTable.locator('thead th')
    }

    async navigateToTablePage(){
        await this.page.goto('/tables');
    }

    async clickEditForUserByEmail(email: string): Promise<void>{
        const targetRow = this.firstTable.getByRole('row', { name: email });
        await targetRow.locator('[href="#edit"]').click();
    }

    async getColumnValues(columnClass: 'last-name' | 'first-name' | 'email'| 'dues'| 'web-site'): Promise<string[]>{
        return await this.secondTable.locator(`tbody tr td.${columnClass}`).allTextContents()
    }

    async clickColumnHeader(columnName: 'Last Name' | 'First Name' | 'Email'| 'Due'| 'Web Site'): Promise<void>{
        const sortedColumnHeader = this.columnHeaders.filter({hasText: columnName})
        await sortedColumnHeader.click()

        await expect(sortedColumnHeader).toHaveClass(/headerSort/)    
    } 
}
