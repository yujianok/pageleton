import { PageAdapter } from "./PageAdapter";
export declare type LaunchOptions = {
    executablePath?: string;
    headless?: boolean;
    args?: string[];
    timeout?: number;
    viewport?: {
        width?: number;
        height?: number;
        isMobile?: boolean;
        deviceScaleFactor?: number;
        hasTouch?: boolean;
        isLandscape?: boolean;
    };
};
export interface BrowserDriver {
    launch(options?: LaunchOptions): Promise<void>;
    shotdown(): Promise<void>;
    newPage(): Promise<PageAdapter>;
}
export interface BrowserDriverType {
    new (config?: any): BrowserDriver;
}
