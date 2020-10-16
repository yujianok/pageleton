import { assert, expect } from "chai";
import { PageComponent, AbstractComponent } from "../../src/component";
import { ElementDriver, NavigationListener, PageDriver } from "../../src/driver";
import { ComponentSpec } from "../../src/spec";

describe('Test PageCompoent', () => {
    const timeout = 1500;

    const mockedElementAdapter: ElementDriver = {
        getInnerText: () => Promise.resolve(''),
        getValue: () => Promise.resolve(''),
        setValue: (value: string) => Promise.resolve(),
        click: () => Promise.resolve(),
        mouseOver: () => Promise.resolve(),
        getPosition: () => Promise.resolve([1, 1]),
        getSize: () => Promise.resolve([1, 1]),
        getAttribute: (name: string) => Promise.resolve(undefined),
    };

    const mockedPageAdapter: PageDriver = {
        goto: (url: string) => Promise.resolve(),
        close: () => Promise.resolve(),
        getTitle: () => Promise.resolve(''),
        getElement: (routes) => Promise.resolve(mockedElementAdapter),
        waitForNavigation: (timeout: number) => Promise.resolve(),
        onNavigated: (listener: NavigationListener) => { },
        checkComponents: (roots) => Promise.resolve(true),
        getScreenShot: () => Promise.resolve(),
    };

    class TestComponent extends AbstractComponent { };
    const component: PageComponent = new TestComponent();
    const mockedComponentSpec: ComponentSpec = {
        name: 'testComponent',
        children: [],
        type: 'TestComponent',
    }

    it('test waitUntil', async () => {
        const begin = Date.now();

        try {
            await component.waitUntil(() => Promise.resolve(false), timeout, mockedElementAdapter, mockedPageAdapter, mockedComponentSpec)
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
            await component.waitUntil(() => Promise.resolve(conditionCheckCount++ === 1), timeout, mockedElementAdapter, mockedPageAdapter, mockedComponentSpec)
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
            await component.waitUntilPresent(
                timeout,
                {
                    ...mockedElementAdapter,
                    getSize: () => Promise.resolve([0, 0])
                },
                mockedPageAdapter,
                mockedComponentSpec);
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
            await component.waitUntilPresent(
                timeout,
                {
                    ...mockedElementAdapter,
                    getSize: () => Promise.resolve(count++ > 0 ? [1, 2] : [0, 0])
                },
                mockedPageAdapter,
                mockedComponentSpec);
        } catch (e) {
            assert.notExists(e);
        } finally {
            const elapse = Date.now() - begin2;
            expect(elapse).lte(timeout);
        }
    })
})