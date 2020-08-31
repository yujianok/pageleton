import { BrowserDriverType, BrowserDriver } from "../driver";
import { FileUtils } from "../uitl";
import { PageletonPage } from "./PageletonPage";
import { PageletonPageLoader } from "./PageletonPageLoader";
import { browserDriverFactory } from "../driver/BrowserDriverFactory";
import { BrowserAdapter } from "../adapter";

type PageletonConfig = {
    specPaths: string[];
    driverType?: BrowserDriverType;
    driverConfig?: object;
    specEncoding?: string;
    baseUrl: string;
}

export type LaunchOptions = {
    executablePath: string;
    headless?: boolean;
    args?: string[];
};

export class PageletonPageFactory {
    private readonly specPaths: string[];
    private readonly pages: PageletonPage[];
    private readonly pageletonPageLoader: PageletonPageLoader;
    private readonly browserDriver: BrowserDriver;
    private readonly baseUrl: string;

    private browserAdapter?: BrowserAdapter;

    constructor(config: PageletonConfig) {
        this.specPaths = config.specPaths;
        this.pages = [];
        this.pageletonPageLoader = new PageletonPageLoader(config.driverType, config.specEncoding);
        this.browserDriver = browserDriverFactory.getBrowserDriver();
        this.baseUrl = config.baseUrl;
    }

    async launchBrowser(options?: LaunchOptions) {
        if (!this.browserAdapter) {
            this.browserAdapter = await this.browserDriver.launch(options);
        }
    }

    async closeBrowser() {
        if (this.browserAdapter) {
            await this.browserAdapter.close();
        }
    }

    async getPageByName(name: string): Promise<PageletonPage | undefined> {
        if (!this.pages.length) {
            for (const specPath of this.specPaths) {
                const files = await FileUtils.getAllFiles(specPath);
                const pages = await Promise.all(files.map(file => this.pageletonPageLoader.loadPageSpec(file)));
                this.pages.push(...pages);
            }
        }

        return this.pages.find(page => page.name === name);
    }

    async openPageByName(name: string): Promise<PageletonPage | undefined> {
        const page = await this.getPageByName(name);

        if (!this.browserAdapter) {
            throw new Error('Browser not has bean launched.');
        }

        if (page) {
            await page.open(this.baseUrl, this.browserAdapter);
        }

        return page;
    }
}