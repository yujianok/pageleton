import { FileUtils } from "../uitl";
import { PageletonPage } from "./PageletonPage";
import { pageletonPageLoader } from "./PageletonPageLoader";

export class PageletonPageFactory {
    private readonly specPaths: string[];
    private readonly specEncoding: string;
    private readonly pages: PageletonPage[];

    constructor(specPaths: string[], specEncoding?: string) {
        this.specPaths = specPaths;
        this.specEncoding = specEncoding || 'UTF-8';
        this.pages = [];
    }

    async getPageByName(name: string): Promise<PageletonPage | undefined> {
        if (!this.pages.length) {
            for (const specPath of this.specPaths) {
                const files = await FileUtils.getAllFiles(specPath);
                const pages = await Promise.all(files.map(file => pageletonPageLoader.loadPageSpec(file, this.specEncoding)));
                this.pages.push(...pages);
            }
        }

        return this.pages.find(page => page.name === name);
    }

}