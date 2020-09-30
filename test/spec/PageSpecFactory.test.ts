import { assert, expect } from "chai";
import PageSpecFactory from "../../src/spec/PageSpecFactory";

describe('Test PageSpecFactory', () => {

    it('test getPageByName', async () => {
        const pageletonPageFactory = await PageSpecFactory.init(['./test/resources/pages/*-page.xml']);

        const testPage = pageletonPageFactory.getPageByName('Pageleton');
        assert.exists(testPage);
        expect(testPage?.name).equal('Pageleton');
        expect(testPage?.url).equal('/test/resources/html/example-page.html');

        const notExistPage = pageletonPageFactory.getPageByName('not exist page');
        assert.notExists(notExistPage);
    })

    it('test getPageByUrl', async () => {
        const pageletonPageFactory = await PageSpecFactory.init(['./test/resources/pages/*-page.xml']);
        const testPage = pageletonPageFactory.getPageByUrl('/test/resources/html/example-page.html');
        assert.exists(testPage);
        expect(testPage?.name).equal('Pageleton');
        expect(testPage?.url).equal('/test/resources/html/example-page.html');

        const testPage2 = pageletonPageFactory.getPageByUrl('/test/resources/html/example-page.html?test=true');
        assert.exists(testPage2);
        expect(testPage2?.name).equal('Pageleton');
        expect(testPage2?.url).equal('/test/resources/html/example-page.html');

        const testPage3 = pageletonPageFactory.getPageByUrl('https://localhost:8080/test/resources/html/example-page.html');
        assert.exists(testPage3);
        expect(testPage3?.name).equal('Pageleton');
        expect(testPage3?.url).equal('/test/resources/html/example-page.html');

        const notExistPage = pageletonPageFactory.getPageByName('/test/resources/html/example-page');
        assert.notExists(notExistPage);
    })
})