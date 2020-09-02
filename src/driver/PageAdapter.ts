import { ElementAdapter } from ".";

export interface PageAdapter {
    goto(url: string): Promise<void>;
    close(): Promise<void>;
    getTitle(): Promise<string>;
    getElement(selector?: string, xpath?: string, context?: ElementAdapter): Promise<ElementAdapter | undefined>;
}