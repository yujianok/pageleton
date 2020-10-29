import { PageComponent } from "../component";
import { PageDriver } from "../driver";
import { PageSpecFactory } from "../spec";
export declare class PageletonPage {
    private readonly pageDriver;
    private readonly pageSpecFactory;
    private currentPage?;
    constructor(pageDriver: PageDriver, pageSpecFactory: PageSpecFactory);
    getComponent(...routes: string[]): PageComponent;
    open(name: string): Promise<void>;
    getTitle(): Promise<string>;
    getPageName(): string | undefined;
    close(): Promise<void>;
    waitForNavigation(waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2", timeout?: number): Promise<void>;
    checkComponents(): Promise<boolean>;
    getScreenShot(path: string, fullPage?: boolean): Promise<void>;
}
