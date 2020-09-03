import { PageAdapter, ElementAdapter } from "../driver";
import { PageComponent, WaitCondition, PageComponentConfig, PageCompnentType } from "./PageComponent";
export declare abstract class AbstractComponent implements PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];
    readonly index: number;
    constructor(config: PageComponentConfig);
    protected getChildComponent(name: string): PageComponent | undefined;
    protected getSubComponentOfType(componentType: PageCompnentType): PageComponent[];
    protected getComponentElement(pageAdapter: PageAdapter): Promise<ElementAdapter | undefined>;
    setValue(value: string, pageAdapter: PageAdapter): Promise<void>;
    getValue(pageAdapter: PageAdapter): Promise<any>;
    click(pageAdapter: PageAdapter): Promise<void>;
    mouseOver(pageAdapter: PageAdapter): Promise<void>;
    waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void>;
    isPresent(pageAdapter: PageAdapter): Promise<boolean>;
    waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void>;
    pushChildComponents(...children: PageComponent[]): void;
}
