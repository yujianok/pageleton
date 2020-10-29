import { BrowserDriver, LaunchOptions } from "./BrowserDriver";
import { PageDriver } from './PageDriver';
export declare class PuppeteerBrowserDriver implements BrowserDriver {
    private browser?;
    private options?;
    launch(options?: LaunchOptions): Promise<void>;
    shotdown(): Promise<void>;
    newPage(): Promise<PageDriver>;
}
