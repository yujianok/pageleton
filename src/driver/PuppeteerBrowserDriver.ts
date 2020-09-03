import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer-core';
import { BrowserDriver, LaunchOptions } from "./BrowserDriver";
import { PageAdapter, ElementRoute } from './PageAdapter';
import { ElementAdapter } from './ElementAdapter';


class PuppeteerElementAdapter implements ElementAdapter {
    private readonly elementHandler: ElementHandle;

    constructor(elementHandler: ElementHandle) {
        this.elementHandler = elementHandler;
    }

    async mouseOver(): Promise<void> {
        await this.elementHandler.hover();
    }

    async click(): Promise<void> {
        await this.elementHandler.evaluate(el => (el as HTMLElement).click())
    }

    async getPosition(): Promise<[number, number]> {
        const boundingBox = await this.elementHandler.boundingBox();

        return boundingBox ? [boundingBox.x, boundingBox.y] : [0, 0];
    }

    async getSize(): Promise<[number, number]> {
        const boundingBox = await this.elementHandler.boundingBox();

        return boundingBox ? [boundingBox.width, boundingBox.height] : [0, 0];
    }

    async getInputValue(): Promise<string> {
        return await this.elementHandler.evaluate((el) => {
            if (el instanceof HTMLInputElement) {
                return el.value;
            } else {
                throw new Error('Element is not a input, can not invoke getInputValue on it');
            }
        });
    }

    async setInputValue(value: string): Promise<void> {
        return await this.elementHandler.evaluate((el, v) => {
            if (el instanceof HTMLInputElement) {
                el.value = v;
            } else {
                throw new Error('Element is not a input, can not invoke setInputValue on it');
            }
        }, value);
    }

    async getInnerText(): Promise<string> {
        return await this.elementHandler.evaluate((el) => (el as HTMLElement).innerText);
    }

    async getSubElement(selector?: string | undefined, xpath?: string | undefined): Promise<ElementAdapter | undefined> {
        let elementHandler: ElementHandle | undefined;
        if (!selector && !xpath) {
            throw new Error('Parameter Selector and xpath can not both been null at the same time');
        }

        if (selector) {
            elementHandler = await this.elementHandler.$(selector) || undefined;
        }

        if (xpath) {
            elementHandler = (elementHandler ? await elementHandler.$x(xpath) : await this.elementHandler.$x(xpath)).pop();
        }

        return elementHandler && new PuppeteerElementAdapter(elementHandler);
    }
}

class PuppeteerPageAdapter implements PageAdapter {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async close(): Promise<void> {
        await this.page.close();
    }

    async getElement(routes: ElementRoute[]): Promise<ElementAdapter | undefined> {

        const elementHandle = await this.page.evaluateHandle((routesJson) => {
            const rs = JSON.parse(routesJson) as ElementRoute[];

            let element: Element | undefined;
            for (const route of rs) {
                const { selector, xpath } = route;

                if (selector) {
                    element = (element || document).querySelector(selector) || undefined;
                }

                if (xpath && element) {
                    element = document.evaluate(xpath, element).iterateNext() as Element;
                }

                if (!element) {
                    break;
                }
            }

            return element;
        }, JSON.stringify(routes)) as ElementHandle;

        return elementHandle && new PuppeteerElementAdapter(elementHandle);
    }
}

export class PuppeteerBrowserDriver implements BrowserDriver {
    private browser?: Browser;
    private options?: LaunchOptions;

    async launch(options?: LaunchOptions): Promise<void> {
        this.options = options;
        this.browser = await puppeteer.launch({ defaultViewport: options?.viewport, ...options });
    }

    async shotdown(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = undefined;
        }
    }

    async newPage(): Promise<PageAdapter> {
        if (!this.browser) {
            throw new Error('Browser has not been launched.');
        }

        const pages = await this.browser.pages();
        const page = pages.find(p => !p.url() || p.url() === 'about:blank') || await this.browser.newPage();

        if (this.options?.timeout !== undefined) {
            page.setDefaultTimeout(this.options.timeout);
        }

        return new PuppeteerPageAdapter(page);
    }
}

