import { BrowserDriver, PageAdapter } from "../driver";

export interface PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: readonly PageComponent[];
    readonly index: number;

    setValue(value: string, pageAdapter: PageAdapter): Promise<void>;
    getValue(pageAdapter: PageAdapter): Promise<any>;
}