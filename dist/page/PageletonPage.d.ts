import { PageDriver } from "../driver";
import PageSpecFactory from "../spec/PageSpecFactory";
import { PageletonComponent } from './PageletonComponent';
export declare class PageletonPage {
    private readonly pageDriver;
    private readonly pageSpecFactory;
    private currentPage?;
    constructor(pageDriver: PageDriver, pageSpecFactory: PageSpecFactory);
    getComponent(...routes: string[]): PageletonComponent;
    open(name: string): Promise<void>;
    getTitle(): Promise<string>;
    getPageName(): string | undefined;
    close(): Promise<void>;
    waitForNavigation(timeout?: number): Promise<void>;
    identifyComponents(): Promise<void>;
}
