import { PageletonPageFactory } from "../../src"
import path from 'path';
import { assert, expect } from "chai";

describe('Test PageletonPageFactory', () => {

    it('test getPageByName', async () => {
        const pageletonPageFactory = new PageletonPageFactory([path.join(__dirname, '../resources/pages/pageleton-page.xml')]);

        const testPage = await pageletonPageFactory.getPageByName('Pageleton');
        assert.exists(testPage);
        expect(testPage?.name).equal('Pageleton');
        expect(testPage?.url).equal('https://github.com/yujianok/pageleton');

        const notExistPage = await pageletonPageFactory.getPageByName('not exist page');
        assert.notExists(notExistPage);
    })
})