import { PageComponentType } from './component';
import { PageletonBrowser } from './page';
export { AbstractComponent, PageComponent } from './component';
export { PageletonBrowser, PageletonPage } from './page';
export { PageSpec, ComponentSpec } from './spec';
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
    customComponentTypes?: PageComponentType[];
};
export declare type PageletonInstance = {
    launchBrowser: () => Promise<PageletonBrowser>;
};
export declare const Pageleton: (config: PageletonConfig) => PageletonInstance;
