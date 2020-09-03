import { assert, expect } from "chai";
import { Pageleton } from "../../src";

describe('Test PageletonPage', () => {

    it('test PageletonPage functions', async () => {
        
        const browser = await Pageleton({
            specPaths: ['./test/resources/pages/*-page.xml'],
            headless: false,
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
            expect(title).equal('GitHub - yujianok/pageleton');

            const text = await testPage.getComponentValue(['toolbar', 'Branch switcher']) as string;
            expect(text.trim()).equal('master');

            await testPage.setComponentValue('abc', ['Header', 'Header Search']);
            const inputValue = await testPage.getComponentValue(['Header', 'Header Search']);
            expect(inputValue).equal('abc');

            await testPage.clickComponent(['toolbar', 'Branch switcher']);
            const detailMenuPresent = await testPage.isComponentPresent(['toolbar', 'Branch detail menu']);
            expect(detailMenuPresent).equal(true);

            await testPage.close();
        } finally {
            await browser.shutdown()
        }
    })

})