import { PageComponent } from "../component";
import { BrowserDriver, PageAdapter } from "../driver";

export class PageletonPage {
    readonly name: string;
    readonly url: string;
    readonly rootComponents: PageComponent[];

    private pageAdapter?: PageAdapter;

    constructor(name: string, url: string, rootComponents: PageComponent[]) {
        this.name = name;
        this.url = url;
        this.rootComponents = rootComponents;
    }

    async getTitle() {
        return await this.pageAdapter?.getTitle();
    }

    getComponent(routes: string[]): PageComponent {
        let current: PageComponent | undefined
        let children: readonly PageComponent[] = this.rootComponents;

        for (const route of routes) {
            current = children.find(c => c.name === route);
            if (!current) {
                throw new Error('Component can not be found, path:' + routes.join('>'));
            }
            children = current.children;
        }

        return current!;
    }

    async getComponentValue(routes: string[]) {
        if (!this.pageAdapter) {
            throw new Error("Page has not bean opened:" + this.name);
        }

        const component = this.getComponent(routes);
        return await component?.getValue(this.pageAdapter);
    }

    async setComponentValue(value: string, routes: string[]) {
        if (!this.pageAdapter) {
            throw new Error("Page has not bean opened:" + this.name);
        }

        const component = this.getComponent(routes);
        return await component?.setValue(value, this.pageAdapter);
    }

    async open(browserDriver: BrowserDriver) {
        this.pageAdapter = await browserDriver.newPage();
        await this.pageAdapter.goto(this.url);
    }

    async close() {
        await this.pageAdapter!.close();
    }

}