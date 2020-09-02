import { BrowserDriverType } from "./driver";

export type PageletonConfig = {
    specPaths: string[];
    driverType?: BrowserDriverType;
    driverConfig?: object;
    specEncoding?: string;
    executablePath: string;
    headless?: boolean;
    args?: string[];
    timeout?: number;
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
