import puppeteer, { Browser, LaunchOptions, Page, ElementHandle } from 'puppeteer-core';
import { BrowserDriver } from "./BrowserDriver";
import { PageAdapter } from './PageAdapter';
import { ElementAdapter } from '.';

class PuppeteerElementAdapter implements ElementAdapter {
    private readonly elementHandler: ElementHandle;

    constructor(elementHandler: ElementHandle) {
        this.elementHandler = elementHandler;
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

    async getElement(selector?: string, xpath?: string): Promise<ElementAdapter | undefined> {
        let element: ElementHandle | undefined;
        if (!selector && !xpath) {
            throw new Error('Parameter Selector and xpath can not both been null at the same time');
        }

        if (selector) {
            element = await this.page.$(selector) || undefined;
        }

        if (xpath) {
            element = (element ? await element.$x(xpath) : await this.page.$x(xpath)).pop();
        }

        return element && new PuppeteerElementAdapter(element);
    }
}

export class PuppeteerBrowserDriver implements BrowserDriver {
    private browser?: Browser;
    private options?: LaunchOptions;

    async launch(options?: LaunchOptions): Promise<void> {
        this.options = options;
        this.browser = await puppeteer.launch({ defaultViewport: null, ...options });
    }

    async shotdown(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
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

