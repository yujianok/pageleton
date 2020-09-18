import { PageCompnentType, PageComponent } from "./PageComponent";
declare class PageComponentTypeRegistry {
    private readonly componentTypeRegistry;
    constructor();
    getComponentByType(name: string): PageComponent;
    registerComponentType(pageCompnentType: PageCompnentType): void;
}
declare const _default: PageComponentTypeRegistry;
export default _default;
