import { PageletonPage } from "./PageletonPage";
declare class PageletonPageLoader {
    private parseIncludeComponent;
    private parsePageComponent;
    loadPageSpec(specPath: string, specEncoding: string): Promise<PageletonPage>;
}
export declare const pageletonPageLoader: PageletonPageLoader;
export {};
