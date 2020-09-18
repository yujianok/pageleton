import { getAllFiles } from "../service";
import pageSpecLoader, { PageSpec } from "./PageSpecLoader";

class PageSpecFactory {

    private readonly specPaths: string[];
    private readonly specEncoding: string;
    private readonly pages: PageSpec[];

    private constructor(specPaths: string[], specEncoding?: string) {
        this.specPaths = specPaths;
        this.specEncoding = specEncoding || 'UTF-8';
        this.pages = [];
    }

    static async init(specPaths: string[], specEncoding?: string) {
        const instance = new PageSpecFactory(specPaths, specEncoding);
        for (const specPath of instance.specPaths) {
            const files = await getAllFiles(specPath);
            const pages = await Promise.all(files.map(file => pageSpecLoader.loadPageSpec(file, instance.specEncoding)));
            instance.pages.push(...pages);
        }
        return instance;
    }

    getPageByName(name: string): PageSpec | undefined {
        return this.pages.find(page => page.name === name);
    }

    getPageByUrl(url: string): PageSpec | undefined {
        return this.pages.find(page => {
            let paramPath;
            try {
                paramPath = new URL(url).pathname;
            } catch (e) {
                paramPath = url.split('?')[0];
            }

            let pagePath;
            try {
                pagePath = new URL(page.url).pathname;
            } catch (e) {
                pagePath = page.url.split('?')[0];
            }

            return paramPath === pagePath;
        });
    }
}

export default PageSpecFactory;