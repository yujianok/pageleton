import { BrowserDriver, BrowserDriverType } from "./BrowserDriver";
import { PuppeteerBrowserDriver } from "./PuppeteerBrowserDriver";

class BrowserDriverFactory {
    getBrowserDriver(driverType?: BrowserDriverType): BrowserDriver {
        return new PuppeteerBrowserDriver();
    }
}

export const browserDriverFactory = new BrowserDriverFactory();