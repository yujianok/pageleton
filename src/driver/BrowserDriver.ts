import { BrowserAdapter } from '../adapter';
import { LaunchOptions } from '../page';

export type BrowserDriverType = 'puppeteer' | 'webdriver' | 'selenium';

export interface BrowserDriver {
    launch(options?: LaunchOptions): Promise<BrowserAdapter>;
}