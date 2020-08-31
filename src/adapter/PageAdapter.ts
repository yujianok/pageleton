
export interface PageAdapter {
    goto(url: string): Promise<void>;
    close(): Promise<void>;
}