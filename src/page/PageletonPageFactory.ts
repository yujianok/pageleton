import { BrowserDriver } from "../driver";
import { PageletonPage } from "./PageletonPage";
import { FileUtils } from "../uitl";
import { pageletonPageLoader } from "./PageletonPageLoader";

type PageletonConfig = {
    specPaths: string[];
    driver: BrowserDriver;
    specEncoding?: string;
}

export class PageletonPageFactory {
    private readonly specPaths: string[];
    private readonly driver: BrowserDriver;
    private readonly pages: PageletonPage[];

    constructor(config: PageletonConfig) {
        this.specPaths = config.specPaths;
        this.driver = config.driver;
        this.pages = [];
    }

    async getPageByName(name: string): Promise<PageletonPage | undefined> {
        if (!this.pages.length) {
            for (const specPath of this.specPaths) {
                const files = await FileUtils.getAllFiles(specPath);
                const pages = await Promise.all(files.map(file => pageletonPageLoader.loadPageSpec(file)));
                this.pages.push(...pages);
            }
        }

        return this.pages.find(page => page.name === name);
    }
}