import { ElementAdapter } from "./ElementAdapter";

export type ElementRoute = {
    name: string;
    selector?: string;
    xpath?: string;
}

export interface PageAdapter {
    goto(url: string): Promise<void>;
    close(): Promise<void>;
    waitForNavigation(timeout: number): Promise<void>;
    getTitle(): Promise<string>;
    getElement(routes: ElementRoute[]): Promise<ElementAdapter | undefined>;
}