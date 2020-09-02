import { PageComponent } from "../component";
import { BrowserDriver, PageAdapter } from "../driver";

export class PageletonPage {
    readonly name: string;
    readonly url: string;
    readonly rootComponents: PageComponent[];
    private getPageAdapter(): PageAdapter {
        throw new Error("Page has not bean opened:" + this.name);
    }

    constructor(name: string, url: string, rootComponents: PageComponent[]) {
        this.name = name;
        this.url = url;
        this.rootComponents = rootComponents;
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

    async getTitle() {
        const pageAdapter = this.getPageAdapter();

        return await pageAdapter.getTitle();
    }

    async getComponentValue(routes: string[]) {
        const component = this.getComponent(routes);
        const pageAdapter = this.getPageAdapter();

        return await component.getValue(pageAdapter);
    }

    async setComponentValue(value: string, routes: string[]) {
        const component = this.getComponent(routes);
        const pageAdapter = this.getPageAdapter();

        return await component.setValue(value, pageAdapter);
    }

    async clickComponent(routes: string[]) {
        const component = this.getComponent(routes);
        const pageAdapter = this.getPageAdapter();

        return await component.click(pageAdapter)
    }

    async open(browserDriver: BrowserDriver) {
        const pageAdapter = await browserDriver.newPage();
        await pageAdapter.goto(this.url);

        this.getPageAdapter = () => pageAdapter;
    }

    async close() {
        const pageAdapter = this.getPageAdapter();

        await pageAdapter.close();
    }

}