import { BrowserDriverType } from './driver';
import { PageCompnentType } from './component';
import { PageletonBrowser } from './page';
export * from './component';
export * from './page';
export * from './driver';
export * from './spec';
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
export declare type PageletonInstance = {
    launchBrowser: () => Promise<PageletonBrowser>;
};
export declare const Pageleton: (config: PageletonConfig) => PageletonInstance;
