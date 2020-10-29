import { BrowserDriver } from "../driver";
import { PageSpecFactory } from "../spec";
import { PageletonPage } from "./PageletonPage";

export class PageletonBrowser {
    private readonly browserDriver: BrowserDriver;
    private readonly pageSpecFactory: PageSpecFactory;

    constructor(browserDriver: BrowserDriver, pageSpecFactory: PageSpecFactory) {
        this.browserDriver = browserDriver;
        this.pageSpecFactory = pageSpecFactory
    }

    async newPage(): Promise<PageletonPage> {
        const page = await this.browserDriver.newPage();

        return new PageletonPage(page, this.pageSpecFactory)
    }

    async shutdown() {
        await this.browserDriver.shotdown();
    }
}