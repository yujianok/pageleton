import { PageAdapter, ElementAdapter } from "../driver";

export type WaitCondition = (element: ElementAdapter) => boolean;
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
    waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void>;
    waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void>;
}