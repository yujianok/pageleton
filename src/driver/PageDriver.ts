import { ElementDriver } from "./ElementDriver";

export type ElementRoute = {
    name: string;
    selector?: string;
    xpath?: string;
}

export type ElementNode = {
    name: string;
    selector?: string;
    xpath?: string;
    children: ElementNode[];
}

export type NavigationListener = (url: string) => void;

export interface PageDriver {
    goto(url: string): Promise<void>;
    close(): Promise<void>;
    waitForNavigation(timeout?: number): Promise<void>;
    getTitle(): Promise<string>;
    getElement(routes: ElementRoute[]): Promise<ElementDriver | undefined>;
    onNavigated(listener: NavigationListener): void;
    identifyComponents(rootNodes: ElementNode[]): Promise<void>;
}