import puppeteer, { LaunchOptions, Browser, Page } from 'puppeteer-core';
import { BrowserDriver } from "./BrowserDriver";
import { BrowserAdapter, PageAdapter } from '../adapter';

class PuppeteerBrowserAdapter implements BrowserAdapter {

    private readonly browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async close(): Promise<void> {
        await this.browser.close();
    }

    async newPage(): Promise<PageAdapter> {
        const page = await this.browser.newPage();
        return new PuppeteerPageAdapter(page);
    }

}

class PuppeteerPageAdapter implements PageAdapter {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async close(): Promise<void> {
        await this.page.close();
    }

}

export class PuppeteerBrowserDriver implements BrowserDriver {
    async launch(options?: LaunchOptions): Promise<BrowserAdapter> {
        const browser = await puppeteer.launch({ defaultViewport: null, ...options });
        return new PuppeteerBrowserAdapter(browser);
    }
}

