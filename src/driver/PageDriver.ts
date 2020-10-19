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
    waitForNavigation(waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2", timeout?: number): Promise<void>;
    getTitle(): Promise<string>;
    getElement(routes: ElementRoute[]): Promise<ElementDriver | undefined>;
    onNavigated(listener: NavigationListener): void;
    checkComponents(rootNodes: ElementNode[]): Promise<boolean>;
    getScreenShot(path: string, fullPage?: boolean): Promise<void>;
}