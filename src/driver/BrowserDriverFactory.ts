import { BrowserDriver, BrowserDriverType } from "./BrowserDriver";
import { PuppeteerBrowserDriver } from "./PuppeteerBrowserDriver";

class BrowserDriverFactory {

    private browserMap: { [key: string]: BrowserDriverType } = {
        'puppeteer': PuppeteerBrowserDriver,
    };

    private customBrowserDriver?: BrowserDriverType;

    getBrowserDriver(driverType?: 'puppeteer'): BrowserDriver {
        if (driverType) {
            return new (this.browserMap[driverType])();
        } else if (this.customBrowserDriver) {
            return new this.customBrowserDriver();
        } else {
            return new PuppeteerBrowserDriver();
        }
    }

    setCustomBrowserDriver(browserDriverType: BrowserDriverType) {
        this.customBrowserDriver = browserDriverType;
    }
}

export const browserDriverFactory = new BrowserDriverFactory();