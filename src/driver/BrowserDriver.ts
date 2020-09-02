import { PageAdapter } from "./PageAdapter";


export type BrowserDriverType = 'puppeteer' | 'webdriver' | 'selenium';

export type LaunchOptions = {
    executablePath: string;
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
    }
}

export interface BrowserDriver {
    launch(options?: LaunchOptions): Promise<void>;
    shotdown(): Promise<void>;
    newPage(): Promise<PageAdapter>;
}