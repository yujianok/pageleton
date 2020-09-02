import { pageletonPageLoader, PageAdapter, ElementAdapter } from "../../src";
import path from 'path';
import { expect, assert } from "chai";

describe('Test PageCompoent', () => {
    const timeout = 5500;
    const elementAdapter: any = { v: 0 };
    const pageAdapter: PageAdapter = {
        goto: (url: string) => Promise.resolve(),
        close: () => Promise.resolve(),
        getTitle: () => Promise.resolve(''),
        getElement: (routes) => Promise.resolve(undefined),
    }

    it('test waitUntil', async () => {
        const page = await pageletonPageLoader.loadPageSpec(path.join(__dirname, '../resources/pages/pageleton-page.xml'), 'UTF-8');
        const component = page.getComponent(['Header']);

        const elementAdapter: any = { v: 0 };
        pageAdapter.getElement = (routes) => {
            elementAdapter.v = elementAdapter.v + 1;
            return Promise.resolve(elementAdapter)
        }

        const begin = Date.now();
        try {
            await component.waitUntil((el) => false, timeout, pageAdapter)
        } catch (e) {
            expect(e + '').equal('Error: Waiting for component to fit condition is timeout: ' + timeout)
        } finally {
            const elapse = Date.now() - begin;
            const deviation = Math.abs(elapse - timeout);
            expect(deviation).lte(100);
        }

        elementAdapter.v = 0;
        const begin2 = Date.now();
        try {
            //@ts-ignore
            await component.waitUntil((el) => el.v === 2, timeout, pageAdapter)
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin2;
            expect(elapse).lte(timeout);
        }
    })

    it('test waitUntilPresent', async () => {
        const page = await pageletonPageLoader.loadPageSpec(path.join(__dirname, '../resources/pages/pageleton-page.xml'), 'UTF-8');
        const component = page.getComponent(['Header']);

        pageAdapter.getElement = (routes) => Promise.resolve(undefined);
        const begin = Date.now();
        try {
            await component.waitUntilPresent(timeout, pageAdapter)
        } catch (e) {
            expect(e + '').equal('Error: Waiting for component to fit condition is timeout: ' + timeout)
        } finally {
            const elapse = Date.now() - begin;
            const deviation = Math.abs(elapse - timeout);
            expect(deviation).lte(100);
        }

        let count = 0;
        pageAdapter.getElement = (routes) => count++ ? Promise.resolve(elementAdapter) : Promise.resolve(undefined);
        const begin2 = Date.now();
        try {
            await component.waitUntilPresent(timeout, pageAdapter)
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin2;
            expect(elapse).lte(timeout);
        }
    })
})