import { PageComponentType } from "./PageComponent";
declare class PageComponentTypeRegistry {
    private readonly componentTypeRegistry;
    constructor();
    getComponentType(name: string): PageComponentType;
    registerComponentType(pageCompnentType: PageComponentType): void;
}
export declare const pageComponentTypeRegistry: PageComponentTypeRegistry;
export {};
