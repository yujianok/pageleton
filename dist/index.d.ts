import { BrowserDriverType } from './driver';
import { PageletonPage } from './page';
import { PageCompnentType } from './component';
export * from './component';
export * from './page';
export * from './driver';
export declare type PageletonConfig = {
    specPaths?: string[];
    specEncoding?: string;
    driverType?: 'puppeteer';
    driverConfig?: object;
    executablePath?: string;
    headless?: boolean;
    args?: string[];
    timeout?: number;
    baseUrl?: string;
    viewport?: {
        width?: number;
        height?: number;
        isMobile?: boolean;
        deviceScaleFactor?: number;
        hasTouch?: boolean;
        isLandscape?: boolean;
    };
    customComponentTypes?: PageCompnentType[];
    customBrowserDriver?: BrowserDriverType;
};
export declare type PageletonBrowser = {
    openPage: (name: string) => Promise<PageletonPage>;
    shutdown: () => Promise<void>;
};
export declare type PageletonInstance = {
    launchBrowser: () => Promise<PageletonBrowser>;
    getPageSpec: (name: string) => Promise<PageletonPage | undefined>;
};
export declare const Pageleton: (config: PageletonConfig) => PageletonInstance;
