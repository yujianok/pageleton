export interface ElementDriver {
    getInnerText(): Promise<string>;
    getValue(): Promise<string>;
    setValue(value: string): Promise<void>;
    getAttribute(name: string): Promise<string | undefined>;
    click(): Promise<void>;
    mouseOver(): Promise<void>;
    getPosition(): Promise<[number, number]>;
    getSize(): Promise<[number, number]>;
}
