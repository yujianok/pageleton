import { PageAdapter, ElementAdapter } from "../driver";
export declare type WaitCondition = (element: ElementAdapter) => Promise<boolean>;
export interface PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: readonly PageComponent[];
    setValue(value: string, pageAdapter: PageAdapter): Promise<void>;
    getValue(pageAdapter: PageAdapter): Promise<any>;
    getText(pageAdapter: PageAdapter): Promise<string>;
    getAttribute(name: string, pageAdapter: PageAdapter): Promise<string | undefined>;
    click(pageAdapter: PageAdapter): Promise<void>;
    mouseOver(pageAdapter: PageAdapter): Promise<void>;
    isPresent(pageAdapter: PageAdapter): Promise<boolean>;
    waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void>;
    waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void>;
}
export declare type PageComponentConfig = {
    name: string;
    selector?: string;
    xpath?: string;
    parent?: PageComponent;
    children: PageComponent[];
};
export interface PageCompnentType {
    new (config: PageComponentConfig): PageComponent;
}
