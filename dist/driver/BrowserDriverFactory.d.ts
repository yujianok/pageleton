import { BrowserDriver, BrowserDriverType } from "./BrowserDriver";
declare class BrowserDriverFactory {
    private browserMap;
    private customBrowserDriver?;
    getBrowserDriver(driverType?: 'puppeteer'): BrowserDriver;
    setCustomBrowserDriver(browserDriverType: BrowserDriverType): void;
}
export declare const browserDriverFactory: BrowserDriverFactory;
export {};
