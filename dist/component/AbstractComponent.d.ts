import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
import { PageComponent, PageComponentType, WaitCondition } from "./PageComponent";
export declare abstract class AbstractComponent implements PageComponent {
    protected readonly pageDriver: PageDriver;
    protected readonly componentSpec: ComponentSpec;
    constructor(pageDriver: PageDriver, componentSpec: ComponentSpec);
    setValue(value: string): Promise<void>;
    getValue(): Promise<any>;
    getText(): Promise<string>;
    getAttribute(name: string): Promise<string | undefined>;
    click(): Promise<void>;
    mouseOver(): Promise<void>;
    waitUntil(condition: WaitCondition, timeout?: number): Promise<void>;
    isPresent(): Promise<boolean>;
    waitUntilPresent(timeout?: number): Promise<void>;
    waitUntilVanished(timeout?: number): Promise<void>;
    protected getSubComponents(type: PageComponentType): PageComponent[];
    protected getElementDriver(canBeNull?: boolean): Promise<ElementDriver | undefined>;
}
