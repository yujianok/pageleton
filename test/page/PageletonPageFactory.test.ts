import { assert, expect } from "chai";
import { PageletonPageFactory } from "../../src";

describe('Test PageletonPageFactory', () => {

    it('test getPageByName', async () => {
        const pageletonPageFactory = new PageletonPageFactory(['./test/resources/pages/*-page.xml']);

        const testPage = await pageletonPageFactory.getPageByName('Pageleton');
        assert.exists(testPage);
        expect(testPage?.name).equal('Pageleton');
        expect(testPage?.url).equal('/test/resources/html/example-page.html');

        const notExistPage = await pageletonPageFactory.getPageByName('not exist page');
        assert.notExists(notExistPage);
    })
})