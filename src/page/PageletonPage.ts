import { PageComponent } from "../component";
import { PageDriver } from "../driver";
import { PageSpec, PageSpecFactory } from "../spec";
import pageComponentTypeRegistry from '../component/PageComponentTypeRegistry'
import componentSpecService from '../service/ComponentSpecService'

export class PageletonPage {
    private readonly pageDriver: PageDriver;
    private readonly pageSpecFactory: PageSpecFactory;
    private currentPage?: PageSpec;

    constructor(pageDriver: PageDriver, pageSpecFactory: PageSpecFactory) {
        this.pageDriver = pageDriver;
        this.pageSpecFactory = pageSpecFactory;
    }

    getComponent(...routes: string[]): PageComponent {
        if (!this.currentPage) {
            throw new Error('No page has bean opened yet.')
        }

        const componentSpec = this.currentPage.getComponent(...routes);
        const PageComponentType = pageComponentTypeRegistry.getComponentType(componentSpec.type)

        return new PageComponentType(this.pageDriver, componentSpec);
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

    async waitForNavigation(waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2", timeout?: number): Promise<void> {
        await this.pageDriver.waitForNavigation(waitUntil, timeout);
    }

    async checkComponents(): Promise<boolean> {
        if (this.currentPage) {
            const rootComponents = componentSpecService.getRootElementNodes(this.currentPage.rootComponents)
            return await this.pageDriver.checkComponents(rootComponents);
        } else {
            return false;
        }
    }

    async getScreenShot(path: string, fullPage?: boolean): Promise<void> {
        await this.pageDriver.getScreenShot(path, fullPage);
    }
}