import { PageSpec } from "./PageSpecLoader";
export declare class PageSpecFactory {
    private readonly specPaths;
    private readonly specEncoding;
    private readonly pages;
    private constructor();
    static init(specPaths: string[], specEncoding?: string): Promise<PageSpecFactory>;
    getPageByName(name: string): PageSpec | undefined;
    getPageByUrl(url: string): PageSpec | undefined;
}
