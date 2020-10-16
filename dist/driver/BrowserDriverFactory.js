"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserDriverFactory = void 0;
var PuppeteerBrowserDriver_1 = require("./PuppeteerBrowserDriver");
var BrowserDriverFactory = (function () {
    function BrowserDriverFactory() {
        this.browserMap = {
            'puppeteer': PuppeteerBrowserDriver_1.PuppeteerBrowserDriver,
        };
    }
    BrowserDriverFactory.prototype.getBrowserDriver = function (driverType) {
        if (driverType) {
            return new (this.browserMap[driverType])();
        }
        else if (this.customBrowserDriver) {
            return new this.customBrowserDriver();
        }
        else {
            return new PuppeteerBrowserDriver_1.PuppeteerBrowserDriver();
        }
    };
    BrowserDriverFactory.prototype.setCustomBrowserDriver = function (browserDriverType) {
        this.customBrowserDriver = browserDriverType;
    };
    return BrowserDriverFactory;
}());
exports.browserDriverFactory = new BrowserDriverFactory();
//# sourceMappingURL=BrowserDriverFactory.js.map