import { PageComponentType } from "./PageComponent";
declare class PageComponentTypeRegistry {
    private readonly componentTypeRegistry;
    constructor();
    getComponentType(name: string): PageComponentType;
    registerComponentType(pageCompnentType: PageComponentType): void;
}
declare const _default: PageComponentTypeRegistry;
export default _default;
