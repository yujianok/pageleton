import { assert, expect } from "chai";
import { Pageleton } from "../../src";
import fs from 'fs';


describe('Test PageletonPage', () => {
    const pageleton = Pageleton({
        specPaths: ['./test/resources/pages/*-page.xml'],
        headless: true,
        baseUrl: 'file://' + process.cwd(),
        timeout: 0,
        viewport: {
            width: 1440,
            height: 900,
        },
        executablePath: 'google-chrome',
        // args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader']
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    it('test PageletonPage functions', async () => {
        const browser = await pageleton.launchBrowser();
        try {
            const testPage = await browser.newPage();
            await testPage.open('Pageleton');
            assert.exists(testPage);

            const title = await testPage.getTitle();
            expect(title).equal('example page for pageleton unit testing');

            const listTitle = await testPage.getComponent('Header', 'My To Do List').getText();
            expect(listTitle).equal('My To Do List');

            const tableData = await testPage.getComponent('Todo List').getValue();
            const expectData = {
                headers: [],
                rows: [
                    ['1', 'Hit the gym', 'Hit the gym desc...'],
                    ['2', 'Pay bills', 'Pay bills desc...'],
                    ['3', 'Meet George', 'Meet George desc...'],
                    ['4', 'Buy eggs', 'Buy eggs desc...'],
                    ['5', 'Read a book', 'Read a book desc...'],
                    ['6', 'Organize office', 'Organize office desc...']
                ]
            };
            expect(tableData).to.deep.equal(expectData);

            const secondItemTitle = await testPage.getComponent('Todo List', 'Item-2', 'Item Title').getText();
            expect(secondItemTitle).equal('Pay bills');

            const secondItemClass = await testPage.getComponent('Todo List', 'Item-2').getAttribute('class');
            expect(secondItemClass).equal('checked');

            await testPage.getComponent('Todo List', 'Item-2', 'Delete').click();
            const secondItemPresent = await testPage.getComponent('Todo List', 'Item-2').isPresent();
            expect(secondItemPresent).equal(false);

            await testPage.getComponent('Header', 'Add').click();
            const alertPresent = await testPage.getComponent('Alert Message').isPresent();
            expect(alertPresent).equal(true);
            const alertMessage = await testPage.getComponent('Alert Message', 'Message Content').getText();
            expect(alertMessage).equal('You must write something!');

            await testPage.getComponent('Alert Message', 'Message Content').click();
            const alertPresent2 = await testPage.getComponent('Alert Message').isPresent();
            expect(alertPresent2).equal(false);

            await testPage.getComponent('Header', 'Title Field', 'Title Input').setValue('Test Pageleton');
            const inputValue = await testPage.getComponent('Header', 'Title Field', 'Title Input').getValue();
            expect(inputValue).equal('Test Pageleton');
            await testPage.getComponent('Header', 'Add').click();
            const lastItemIndex = await testPage.getComponent('Todo List', 'Item-7', 'Item Index').getText();
            expect(lastItemIndex).equal('7');
            const lastItemTitle = await testPage.getComponent('Todo List', 'Item-7', 'Item Title').getText();
            expect(lastItemTitle).equal('Test Pageleton');
            
            await testPage.getComponent('Header').setValue({ 'Title:': 'Test form', 'Description:': 'Test form desc...' });
            const formData = await testPage.getComponent('Header').getValue();
            expect({ 'Title:': 'Test form', 'Description:': 'Test form desc...' }).to.deep.equal(formData);
            await testPage.getComponent('Header', 'Add').click(); 
            const itemIndex = await testPage.getComponent('Todo List', 'Item-8', 'Item Index').getText();
            expect(itemIndex).equal('8');
            const itemTitle = await testPage.getComponent('Todo List', 'Item-8', 'Item Title').getText();
            expect(itemTitle).equal('Test form');
            const itemDesc = await testPage.getComponent('Todo List', 'Item-8', 'Item Desc').getText();
            expect(itemDesc).equal('Test form desc...');
           
            await testPage.getComponent('Header', 'Leave').click();
            await testPage.waitForNavigation();
            const pageName = testPage.getPageName();
            expect(pageName).equal('Empty');

            await testPage.close();
        } finally {
            await browser.shutdown();
        }
    })

    // it('test checkComponents', async () => {
    //     const browser = await pageleton.launchBrowser();
    //     try {
    //         const testPage = await browser.newPage();
    //         await testPage.open('Pageleton');
    //         const match = await testPage.checkComponents();
    //         expect(match).equal(true);
    //     } finally {
    //         await browser.shutdown();
    //     }
    // })

    it('test getScreenShot', async () => {
        const browser = await pageleton.launchBrowser();
        try {
            const testPage = await browser.newPage();
            await testPage.open('Pageleton');
            const filePath = './test/tmp/test-screenshot.png';
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            await testPage.getScreenShot('./test/tmp/test-screenshot.png');
            const exist = fs.existsSync(filePath);
            expect(exist).equal(true);

            await testPage.close();
        } finally {
            await browser.shutdown();
        }
    })

})