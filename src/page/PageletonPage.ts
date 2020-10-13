import { PageDriver } from "../driver";
import { getRootElementNodes } from "../service/ComponentSpecService";
import { PageSpec } from "../spec";
import PageSpecFactory from "../spec/PageSpecFactory";
import { PageletonComponent } from './PageletonComponent';

export class PageletonPage {
    private readonly pageDriver: PageDriver;
    private readonly pageSpecFactory: PageSpecFactory;
    private currentPage?: PageSpec;

    constructor(pageDriver: PageDriver, pageSpecFactory: PageSpecFactory) {
        this.pageDriver = pageDriver;
        this.pageSpecFactory = pageSpecFactory;
    }

    getComponent(...routes: string[]): PageletonComponent {
        if (!this.currentPage) {
            throw new Error('No page has bean opened yet.')
        }

        const componentSpec = this.currentPage.getComponent(...routes);

        return new PageletonComponent(componentSpec, this.pageDriver);
    }

    async open(name: string): Promise<void> {
        const pageSpec = this.pageSpecFactory.getPageByName(name);

        if (!pageSpec) {
            throw new Error('Page can not be found: ' + name);
        }

        this.currentPage = pageSpec;
        await this.pageDriver.goto(pageSpec.url);

        this.pageDriver.onNavigated((url) => {
            this.currentPage = this.pageSpecFactory.getPageByUrl(url);
        })
    }

    async getTitle(): Promise<string> {
        return await this.pageDriver.getTitle();
    }

    getPageName(): string | undefined {
        return this.currentPage?.name;
    }

    async close(): Promise<void> {
        await this.pageDriver.close();
    }

    async waitForNavigation(timeout?: number): Promise<void> {
        await this.pageDriver.waitForNavigation(timeout);
    }

    async identifyComponents(): Promise<void> {
        if (this.currentPage) {
            const rootComponents = getRootElementNodes(this.currentPage.rootComponents)
            await this.pageDriver.identifyComponents(rootComponents);
        }
    }

    async getScreenShot(path: string, fullPage?: boolean): Promise<void> {
        await this.pageDriver.getScreenShot(path, fullPage);
    }
}