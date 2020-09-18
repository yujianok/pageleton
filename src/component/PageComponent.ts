import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";

export type WaitCondition = (element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec) => Promise<boolean>;
export interface PageComponent {
    setValue(value: string, element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<void>;
    getValue(element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<any>;
    getText(element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<string>;
    getAttribute(name: string, element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<string | undefined>;
    click(element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<void>;
    mouseOver(element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<void>;
    isPresent(element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<boolean>;
    waitUntil(condition: WaitCondition, timeout: number, element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<void>;
    waitUntilPresent(timeout: number, element: ElementDriver, page: PageDriver, componentSpec: ComponentSpec): Promise<void>;
}

export interface PageCompnentType {
    new(): PageComponent;
}