import { assert, expect } from "chai";
import path from 'path';
import { browserDriverFactory, PageletonPage, PageletonPageFactory } from "../../src";

describe('Test PageletonPage', () => {

    it('test PageletonPage functions', async () => {
        const pageletonPageFactory = new PageletonPageFactory([path.join(__dirname, '../resources/pages/*-page.xml')]);
        const browserDriver = browserDriverFactory.getBrowserDriver();
        try {
            await browserDriver.launch({
                headless: false,
                timeout: 0,
                viewport: {
                    width: 1440,
                    height: 900,
                },
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
            const inputValue = await testPage.getComponentValue(['Header', 'Header Search']);
            expect(inputValue).equal('abc');

            await testPage.clickComponent(['toolbar', 'Branch switcher']);

            await new Promise(res => setTimeout(res, 5000));
            await testPage.close();
        } finally {
            await browserDriver.shotdown();
        }
    })

})