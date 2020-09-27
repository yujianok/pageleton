import { assert, expect } from "chai";
import { Pageleton } from "../../src";

describe('Test PageletonPage', () => {

    it('test PageletonPage functions', async () => {

        const browser = await Pageleton({
            specPaths: ['./test/resources/pages/*-page.xml'],
            headless: false,
            baseUrl: 'file://' + process.cwd(),
            timeout: 0,
            viewport: {
                width: 1440,
                height: 900,
            },
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }).launchBrowser();

        try {
            const testPage = await browser.newPage();
            await testPage.open('Pageleton');
            assert.exists(testPage);

            const title = await testPage.getTitle();
            expect(title).equal('example page for pageleton unit testing');

            const listTitle = await testPage.getComponent(['Header', 'My To Do List']).getText();
            expect(listTitle).equal('My To Do List');

            const tableData = await testPage.getComponent(['Todo List']).getValue();
            const expectData = {
                headers: [],
                rows: [
                    ['1', 'Hit the gym'],
                    ['2', 'Pay bills'],
                    ['3', 'Meet George'],
                    ['4', 'Buy eggs'],
                    ['5', 'Read a book'],
                    ['6', 'Organize office']
                ]
            };
            expect(tableData).to.deep.equal(expectData);

            const secondItemTitle = await testPage.getComponent(['Todo List', 'Item-2', 'Item Title']).getText();
            expect(secondItemTitle).equal('Pay bills');

            const secondItemClass = await testPage.getComponent(['Todo List', 'Item-2']).getAttribute('class');
            expect(secondItemClass).equal('checked');

            await testPage.getComponent(['Todo List', 'Item-2', 'Delete']).click();
            const secondItemPresent = await testPage.getComponent(['Todo List', 'Item-2']).isPresent();
            expect(secondItemPresent).equal(false);

            await testPage.getComponent(['Header', 'Add']).click();
            const alertPresent = await testPage.getComponent(['Alert Message']).isPresent();
            expect(alertPresent).equal(true);
            const alertMessage = await testPage.getComponent(['Alert Message', 'Message Content']).getText();
            expect(alertMessage).equal('You must write something!');

            await testPage.getComponent(['Alert Message', 'Message Content']).click();
            const alertPresent2 = await testPage.getComponent(['Alert Message']).isPresent();
            expect(alertPresent2).equal(false);

            await testPage.getComponent(['Header', 'My Input']).setValue('Test Pageleton');
            const inputValue = await testPage.getComponent(['Header', 'My Input']).getValue();
            expect(inputValue).equal('Test Pageleton');
            await testPage.getComponent(['Header', 'Add']).click();
            const lastItemIndex = await testPage.getComponent(['Todo List', 'Item-7', 'Item Index']).getText();
            expect(lastItemIndex).equal('7');
            const lastItemTitle = await testPage.getComponent(['Todo List', 'Item-7', 'Item Title']).getText();
            expect(lastItemTitle).equal('Test Pageleton');

            await testPage.getComponent(['Header', 'Leave']).click();
            await testPage.waitForNavigation();
            const pageName = testPage.getPageName();
            expect(pageName).equal('Empty');

            await testPage.close();
        } finally {
            await browser.shutdown()
        }
    })

})