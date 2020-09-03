import { BrowserDriverType } from './driver';
import { PageCompnentType } from './component';
export * from './component';
export * from './page';
export * from './driver';
export declare type PageletonConfig = {
    specPaths: string[];
    specEncoding?: string;
    driverType?: 'puppeteer';
    driverConfig?: object;
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
    };
    customComponentTypes?: PageCompnentType[];
    customBrowserDriver?: BrowserDriverType;
};
export declare const pageleton: (config: PageletonConfig) => {
    launchBrowser: () => {
        openPage: (name: string) => Promise<import("./page").PageletonPage>;
        shutdown: () => Promise<void>;
    };
};
