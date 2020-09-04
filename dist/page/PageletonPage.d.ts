import { PageComponent } from "../component";
import { BrowserDriver } from "../driver";
export declare class PageletonPage {
    readonly name: string;
    readonly url: string;
    readonly rootComponents: PageComponent[];
    private getPageAdapter;
    constructor(name: string, url: string, rootComponents: PageComponent[]);
    getComponent(routes: string[]): PageComponent;
    getTitle(): Promise<string>;
    getComponentValue(routes: string[]): Promise<any>;
    setComponentValue(value: string, routes: string[]): Promise<void>;
    clickComponent(routes: string[]): Promise<void>;
    isComponentPresent(routes: string[]): Promise<boolean>;
    open(browserDriver: BrowserDriver): Promise<void>;
    close(): Promise<void>;
    waitForNavigation(timeout: number): Promise<void>;
    getComponentAttribute(name: string, routes: string[]): Promise<string | undefined>;
    getComponentText(routes: string[]): Promise<string>;
}
