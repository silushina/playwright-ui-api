import { test, expect } from '../../fixtures/uiFixtures';

test.beforeEach(async ({ dataTablePage }) => {
    await dataTablePage.navigateToTablePage()
});

test('Verify edit action in a row', async ({ dataTablePage, page }) => {
    const targetEmail = 'fbach@yahoo.com';
    await dataTablePage.clickEditForUserByEmail(targetEmail)
    await expect(page).toHaveURL(/#edit$/);
});

const stringColumns = [
    {name: 'Last Name', class: 'last-name'},
    {name: 'First Name', class: 'first-name'},
    {name: 'Email', class: 'email'},
    {name: 'Web Site', class: 'web-site'},    
] as const

stringColumns.forEach((column) => {
    test(`Verify ${column.name} column with strings is sortable in ASC and DESC orders`, async ({ dataTablePage }) => {
        //sorting ascending 
        await dataTablePage.clickColumnHeader(column.name, 'asc');
        const ascSortedValues = await dataTablePage.getColumnValues(column.class)
        const ascExpectedValues = [...ascSortedValues].sort((a, b) => a.localeCompare(b))
        expect(ascSortedValues).toEqual(ascExpectedValues)

        //sorting descending 
        await dataTablePage.clickColumnHeader(column.name, 'desc');
        const descSortedValues = await dataTablePage.getColumnValues(column.class)
        const descExpectedValues = [...descSortedValues].sort((a, b) => b.localeCompare(a))
        expect(descSortedValues).toEqual(descExpectedValues)
    });
});

const numericColumns = [
    {name: 'Due', class: 'dues'}
] as const

numericColumns.forEach((column) => {
    test(`Verify ${column.name} column with numbers is sortable in ASC and DESC orders`, async ({ dataTablePage }) => {
        const convertToNum = (val: string) => Number(val.replace('$', ''))

        //sorting ascending 
        await dataTablePage.clickColumnHeader(column.name, 'asc');
        const ascSortedValues = await dataTablePage.getColumnValues(column.class)
        const ascExpectedValues = [...ascSortedValues].sort((a, b) => {
            return convertToNum(a) - convertToNum(b)
        })

        expect(ascSortedValues).toEqual(ascExpectedValues)

        //sorting descending 
        await dataTablePage.clickColumnHeader(column.name, 'desc');
        const descSortedValues = await dataTablePage.getColumnValues(column.class)
        const descExpectedValues = [...descSortedValues].sort((a, b) => {
            return convertToNum(b) - convertToNum(a)
        })
        expect(descSortedValues).toEqual(descExpectedValues)
    });
})
