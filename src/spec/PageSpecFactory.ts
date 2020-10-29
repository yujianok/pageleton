import { getAllFiles } from "../service/FileService";
import { PageSpec, pageSpecLoader } from "./PageSpecLoader";

export class PageSpecFactory {

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
            const pageUrl = url.split('?')[0];
            const pageSpecPath = page.url.split('?')[0];

            return pageUrl.endsWith(pageSpecPath);
        });
    }
}
