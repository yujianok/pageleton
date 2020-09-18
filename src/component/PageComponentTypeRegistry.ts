import { PageCompnentType, PageComponent } from "./PageComponent";

class PageComponentTypeRegistry {

    private readonly componentTypeRegistry: { [key: string]: PageCompnentType };

    constructor() {
        this.componentTypeRegistry = {};
    }

    getComponentByType(name: string): PageComponent {
        const PageComponentType = this.componentTypeRegistry[name] || this.componentTypeRegistry['Component'];
        return new PageComponentType();
    }

    registerComponentType(pageCompnentType: PageCompnentType): void {
        this.componentTypeRegistry[pageCompnentType.name] = pageCompnentType;
    }
}

export default new PageComponentTypeRegistry();