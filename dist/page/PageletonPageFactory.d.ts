import { PageletonPage } from "./PageletonPage";
export declare class PageletonPageFactory {
    private readonly specPaths;
    private readonly specEncoding;
    private readonly pages;
    constructor(specPaths: string[], specEncoding?: string);
    getPageByName(name: string): Promise<PageletonPage | undefined>;
}
