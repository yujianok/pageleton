import { PageAdapter } from "./PageAdapter";

export interface BrowserAdapter {
    newPage(): Promise<PageAdapter>;
    close(): Promise<void>;
}