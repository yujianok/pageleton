import { PageCompnentType } from "./PageComponent";
declare class PageComponentTypeRegistry {
    private readonly componentTypeRegistry;
    constructor();
    getComponentType(name: string): PageCompnentType;
    registerComponentType(pageCompnentType: PageCompnentType): void;
}
export declare const pageComponentTypeRegistry: PageComponentTypeRegistry;
export {};
