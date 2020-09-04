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
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
        }).launchBrowser();

        try {
            const testPage = await browser.openPage('Pageleton');
            assert.exists(testPage);

            const title = await testPage.getTitle();
            expect(title).equal('example page for pageleton unit testing');

            const listTitle = await testPage.getComponentText(['Header', 'My To Do List']);
            expect(listTitle).equal('My To Do List');

            const tableData = await testPage.getComponentValue(['Todo List']);
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

            const secondItemTitle = await testPage.getComponentText(['Todo List', 'Item-2', 'Item Title']);
            expect(secondItemTitle).equal('Pay bills');

            const secondItemClass = await testPage.getComponentAttribute('class', ['Todo List', 'Item-2'])
            expect(secondItemClass).equal('checked');

            await testPage.clickComponent(['Todo List', 'Item-2', 'Delete']);
            const secondItemPresent = await testPage.isComponentPresent(['Todo List', 'Item-2']);
            expect(secondItemPresent).equal(false);

            await testPage.clickComponent(['Header', 'Add']);
            const alertPresent = await testPage.isComponentPresent(['Alert Message']);
            expect(alertPresent).equal(true);
            const alertMessage = await testPage.getComponentText(['Alert Message', 'Message Content']);
            expect(alertMessage).equal('You must write something!');

            await testPage.clickComponent(['Alert Message', 'Message Content']);
            const alertPresent2 = await testPage.isComponentPresent(['Alert Message']);
            expect(alertPresent2).equal(false);

            await testPage.setComponentValue('Test Person', ['Header', 'My Input']);
            const inputValue = await testPage.getComponentValue(['Header', 'My Input']);
            expect(inputValue).equal('Test Person');
            await testPage.clickComponent(['Header', 'Add']);
            const lastItemIndex = await testPage.getComponentText(['Todo List', 'Item-7', 'Item Index']);
            expect(lastItemIndex).equal('7');
            const lastItemTitle = await testPage.getComponentText(['Todo List', 'Item-7', 'Item Title']);
            expect(lastItemTitle).equal('Test Person');

            await testPage.close();
        } finally {
            await browser.shutdown()
        }
    })

})