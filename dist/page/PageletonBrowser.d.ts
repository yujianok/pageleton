import { BrowserDriver } from "../driver";
import PageSpecFactory from "../spec/PageSpecFactory";
import { PageletonPage } from "./PageletonPage";
export declare class PageletonBrowser {
    private readonly browserDriver;
    private readonly pageSpecFactory;
    constructor(browserDriver: BrowserDriver, pageSpecFactory: PageSpecFactory);
    newPage(): Promise<PageletonPage>;
    shutdown(): Promise<void>;
}
