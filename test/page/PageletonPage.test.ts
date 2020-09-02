import { PageletonPageFactory, PageAdapter, PageletonPage } from "../../src";
import path from 'path';
import { assert, expect } from "chai";
import { browserDriverFactory } from "../../src";

describe('Test PageletonPage', () => {

    it('test PageletonPage functions', async () => {
        const pageletonPageFactory = new PageletonPageFactory([path.join(__dirname, '../resources/pages/*-page.xml')]);
        const browserDriver = browserDriverFactory.getBrowserDriver();
        try {
            await browserDriver.launch({
                headless: false,
                timeout: 0,
                executablePath: '/usr/bin/google-chrome-stable',
                args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
            });

            const testPage = await pageletonPageFactory.getPageByName('Pageleton') as PageletonPage;
            assert.exists(testPage);
            
            await testPage.open(browserDriver);
            const title = await testPage.getTitle();
            expect(title).equal('GitHub - yujianok/pageleton');

            const text = await testPage.getComponentValue(['toolbar', 'Branch switcher']) as string;
            expect(text.trim()).equal('master');

            await testPage.setComponentValue('abc', ['Header', 'Header Search']);
            const inputValue = await testPage.getComponentValue( ['Header', 'Header Search']);
            expect(inputValue).equal('abc');
        } finally {
            await browserDriver.shotdown();
        }
    })
})