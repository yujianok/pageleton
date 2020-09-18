import { BrowserDriver } from "../driver";
import { PageSpecFactory } from "../spec";
import { PageletonPage } from "./PageletonPage";
export default class PageletonBrowser {
    private readonly browserDriver;
    private readonly pageSpecFactory;
    constructor(browserDriver: BrowserDriver, pageSpecFactory: PageSpecFactory);
    newPage(): Promise<PageletonPage>;
    shutdown(): Promise<void>;
}
