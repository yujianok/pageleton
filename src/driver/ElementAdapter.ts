
export interface ElementAdapter {
    getSubElement(selector?: string, xpath?: string): Promise<ElementAdapter | undefined>;
    getInnerText(): Promise<string>;
    getInputValue(): Promise<string>;
    setInputValue(value: string): Promise<void>;
}