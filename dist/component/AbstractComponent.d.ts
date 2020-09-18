import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
import { PageCompnentType, PageComponent, WaitCondition } from "./PageComponent";
export declare abstract class AbstractComponent implements PageComponent {
    setValue(value: string, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void>;
    getValue(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<any>;
    getText(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<string>;
    getAttribute(name: string, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<string | undefined>;
    click(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void>;
    mouseOver(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void>;
    waitUntil(condition: WaitCondition, timeout: number, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void>;
    isPresent(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<boolean>;
    waitUntilPresent(timeout: number, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void>;
    protected getSubComponentValue(component: ComponentSpec, type: PageCompnentType, page: PageDriver): Promise<any[]>;
}
