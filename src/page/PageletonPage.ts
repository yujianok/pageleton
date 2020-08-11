import { PageComponent } from "../component";


export class PageletonPage {
    readonly name: string;
    readonly path: string;
    readonly rootComponents: PageComponent[];

    constructor(name: string, path: string, rootComponents: PageComponent[]) {
        this.name = name;
        this.path = path;
        this.rootComponents = rootComponents;
    }

    getRootComponent(name: string) {
        return this.rootComponents.find(c => c.name === name);
    }
}