import { BrowserDriverType } from "./driver";

export type PageletonConfig = {
    specPaths: string[];
    driverType?: BrowserDriverType;
    driverConfig?: object;
    executablePath: string;
    headless?: boolean;
    args?: string[];
    timeout?: number;
    viewport: {
        width: number;
        height: number;
        isMobile: boolean;
        deviceScaleFactor: number;
        hasTouch: boolean;
        isLandscape: boolean;
    }
}

// async launchBrowser(options?: LaunchOptions) {
//     if (!this.browserAdapter) {
//         this.browserAdapter = await this.browserDriver.launch(options);
//     }
// }

// async closeBrowser() {
//     if (this.browserAdapter) {
//         await this.browserAdapter.close();
//     }
// }
