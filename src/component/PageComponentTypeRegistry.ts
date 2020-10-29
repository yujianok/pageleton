import { PageComponentType } from "./PageComponent";

class PageComponentTypeRegistry {

    private readonly componentTypeRegistry: { [key: string]: PageComponentType };

    constructor() {
        this.componentTypeRegistry = {};
    }

    getComponentType(name: string): PageComponentType {
        return this.componentTypeRegistry[name] || this.componentTypeRegistry['Component'];
    }

    registerComponentType(pageCompnentType: PageComponentType): void {
        this.componentTypeRegistry[pageCompnentType.name] = pageCompnentType;
    }
}

export default new PageComponentTypeRegistry();