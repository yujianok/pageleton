import { PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
export declare class PageletonComponent {
    private readonly componentSpec;
    private readonly pageDriver;
    constructor(componentSpec: ComponentSpec, pageDriver: PageDriver);
    getValue(): Promise<any>;
    setValue(value: string): Promise<void>;
    click(): Promise<void>;
    isPresent(): Promise<boolean>;
    getAttribute(name: string): Promise<string>;
    getText(): Promise<string>;
    private execute;
}
