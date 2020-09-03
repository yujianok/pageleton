import { PageAdapter, ElementAdapter } from "../driver";

export type WaitCondition = (element: ElementAdapter) => Promise<boolean>;
export interface PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: readonly PageComponent[];
    readonly index: number;

    setValue(value: string, pageAdapter: PageAdapter): Promise<void>;
    getValue(pageAdapter: PageAdapter): Promise<any>;
    click(pageAdapter: PageAdapter): Promise<void>;
    mouseOver(pageAdapter: PageAdapter): Promise<void>;
    isPresent(pageAdapter: PageAdapter): Promise<boolean>;
    waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void>;
    waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void>;
}

export type PageComponentConfig = {
    name: string;
    selector?: string;
    xpath?: string;
    index: number;
    parent?: PageComponent;
    children: PageComponent[];
}

export interface PageCompnentType {
    new(config: PageComponentConfig): PageComponent;
}