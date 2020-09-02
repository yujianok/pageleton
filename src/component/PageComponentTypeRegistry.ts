import { PageCompnentType } from "./PageComponentType";

class PageComponentTypeRegistry {

    private readonly componentTypeRegistry: { [key: string]: PageCompnentType };

    constructor() {
        this.componentTypeRegistry = {};
    }

    getComponentType(name: string): PageCompnentType {
        return this.componentTypeRegistry[name] || this.componentTypeRegistry['Component'];
    }

    registerComponentType(pageCompnentType: PageCompnentType): void {
        this.componentTypeRegistry[pageCompnentType.name] = pageCompnentType;
    }
}

export const pageComponentTypeRegistry = new PageComponentTypeRegistry();