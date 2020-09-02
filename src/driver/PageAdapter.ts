import { ElementAdapter } from ".";

export type ElementRoute = {
    selector?: string;
    xpath?: string;
}

export interface PageAdapter {
    goto(url: string): Promise<void>;
    close(): Promise<void>;
    getTitle(): Promise<string>;
    getElement(routes: ElementRoute[]): Promise<ElementAdapter | undefined>;
}