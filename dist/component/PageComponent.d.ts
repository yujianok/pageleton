import { PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
export declare type WaitCondition = (pageComponent: PageComponent) => Promise<boolean>;
export interface PageComponent {
    setValue(value: string): Promise<void>;
    getValue(): Promise<any>;
    getText(): Promise<string>;
    getAttribute(name: string): Promise<string | undefined>;
    click(): Promise<void>;
    mouseOver(): Promise<void>;
    isPresent(): Promise<boolean>;
    waitUntil(condition: WaitCondition, timeout: number): Promise<void>;
    waitUntilPresent(timeout: number): Promise<void>;
    waitUntilVanished(timeout: number): Promise<void>;
}
export interface PageComponentType {
    new (pageDriver: PageDriver, componentSpec: ComponentSpec): PageComponent;
}
