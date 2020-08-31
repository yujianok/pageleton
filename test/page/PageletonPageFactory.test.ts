import { PageletonPageFactory } from "../../src"
import path from 'path';
import { assert, expect } from "chai";

describe('Test PageletonPageFactory', () => {

    it('test getPageByName', async () => {
        const pageletonPageFactory = new PageletonPageFactory({
            specPaths: [path.join(__dirname, '../resources/pages/*-page.xml')],
            baseUrl: 'http://localhost:8080'
        });

        const testPage = await pageletonPageFactory.getPageByName('test page');
        assert.exists(testPage);
        expect(testPage?.name).equal('test page');
        expect(testPage?.path).equal('/test.html');

        const notExistPage = await pageletonPageFactory.getPageByName('not exist page');
        assert.notExists(notExistPage);
    })

    it('test openPageByName', async () => {
        const pageletonPageFactory = new PageletonPageFactory({
            specPaths: [path.join(__dirname, '../resources/pages/*-page.xml')],
            baseUrl: 'https://github.com'
        });
        await pageletonPageFactory.launchBrowser({
            headless: false,
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        try {
            const testPage = await pageletonPageFactory.openPageByName('test page');
            assert.exists(testPage);
            expect(testPage?.name).equal('test page');
            expect(testPage?.path).equal('/test.html');
        } finally {
            await pageletonPageFactory.closeBrowser();
        }
    })
})