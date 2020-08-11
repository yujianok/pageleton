
export interface PageElement {
    setValue(value: string): Promise<string>;
    getValue(): Promise<string>;
    click(): Promise<void>;
    getText(): Promise<string>;
}