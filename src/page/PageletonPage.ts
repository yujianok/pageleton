import { PageComponent } from "../component";
import { PageAdapter, BrowserAdapter } from "../adapter";


export class PageletonPage {
    readonly name: string;
    readonly path: string;
    readonly rootComponents: PageComponent[];

    private pageAdapter?: PageAdapter;

    constructor(name: string, path: string, rootComponents: PageComponent[]) {
        this.name = name;
        this.path = path;
        this.rootComponents = rootComponents;
    }

    getRootComponent(name: string) {
        return this.rootComponents.find(c => c.name === name);
    }

    async open(baseUrl: string, browserAdapter: BrowserAdapter) {
        this.pageAdapter = await browserAdapter.newPage();
        await this.pageAdapter.goto(baseUrl + "/" + this.path);
    }

    async close() {
        await this.pageAdapter!.close();
    }

}