import { PageAdapter } from "./PageAdapter";


export type BrowserDriverType = 'puppeteer' | 'webdriver' | 'selenium';

type LaunchOptions = {
    driverType?: BrowserDriverType;
    driverConfig?: object;
    executablePath: string;
    headless?: boolean;
    args?: string[];
    timeout?: number;
}

export interface BrowserDriver {
    launch(options?: LaunchOptions): Promise<void>;
    shotdown(): Promise<void>;
    newPage(): Promise<PageAdapter>;
}