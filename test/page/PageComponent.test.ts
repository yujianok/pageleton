import { assert, expect } from "chai";
import { ElementAdapter, PageAdapter, PageComponent } from "../../src";
import { AbstractComponent } from "../../src/component/AbstractComponent";

describe('Test PageCompoent', () => {
    const timeout = 5500;

    const mockedElementAdapter: ElementAdapter = {
        getSubElement: (selector?: string, xpath?: string) => Promise.resolve(undefined),
        getInnerText: () => Promise.resolve(''),
        getInputValue: () => Promise.resolve(''),
        setInputValue: (value: string) => Promise.resolve(),
        click: () => Promise.resolve(),
        mouseOver: () => Promise.resolve(),
        getPosition: () => Promise.resolve([1, 1]),
        getSize: () => Promise.resolve([1, 1]),
    };

    const mockedPageAdapter: PageAdapter = {
        goto: (url: string) => Promise.resolve(),
        close: () => Promise.resolve(),
        getTitle: () => Promise.resolve(''),
        getElement: (routes) => Promise.resolve(mockedElementAdapter),
    };

    class TestComponent extends AbstractComponent { };
    const component: PageComponent = new TestComponent({
        name: 'testComponent',
        index: 1,
        children: [],
    });

    it('test waitUntil', async () => {
        const begin = Date.now();

        try {
            await component.waitUntil(() => Promise.resolve(false), timeout, mockedPageAdapter)
        } catch (e) {
            expect(e + '').equal('Error: Waiting for component to fit condition is timeout: ' + timeout)
        } finally {
            const elapse = Date.now() - begin;
            const deviation = Math.abs(elapse - timeout);
            expect(deviation).lte(100);
        }

        const begin2 = Date.now();
        try {
            let conditionCheckCount = 0;
            await component.waitUntil(() => Promise.resolve(conditionCheckCount++ === 1), timeout, mockedPageAdapter)
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin2;
            expect(elapse).lte(timeout);
        }
    })

    it('test waitUntilPresent', async () => {
        const begin = Date.now();
        try {
            await component.waitUntilPresent(timeout, {
                ...mockedPageAdapter,
                getElement: () => Promise.resolve(undefined)
            });
        } catch (e) {
            expect(e + '').equal('Error: Waiting for component to fit condition is timeout: ' + timeout);
        } finally {
            const elapse = Date.now() - begin;
            const deviation = Math.abs(elapse - timeout);
            expect(deviation).lte(100);
        }

        const begin2 = Date.now();
        try {
            let count = 0;
            await component.waitUntilPresent(timeout, {
                ...mockedPageAdapter,
                getElement: () => Promise.resolve(count++ >= 1 ? mockedElementAdapter : undefined)
            });
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin2;
            expect(elapse).lte(timeout);
        }

        const begin3 = Date.now();
        try {
            await component.waitUntilPresent(timeout, {
                ...mockedPageAdapter,
                getElement: () => Promise.resolve({
                    ...mockedElementAdapter,
                    getSize: () => Promise.resolve([0, 0])
                }),
            });
        } catch (e) {
            expect(e + '').equal('Error: Waiting for component to fit condition is timeout: ' + timeout)
        } finally {
            const elapse = Date.now() - begin3;
            const deviation = Math.abs(elapse - timeout);
            expect(deviation).lte(100);
        }

        const begin4 = Date.now();
        try {
            let count = 0;
            await component.waitUntilPresent(timeout, {
                ...mockedPageAdapter,
                getElement: () => Promise.resolve({
                    ...mockedElementAdapter,
                    getSize: () => Promise.resolve(count++ > 0 ? [count % 2, count % 4] : [0, 0])
                }),
            });
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin4;
            expect(elapse).lte(timeout);
        }
    })
})