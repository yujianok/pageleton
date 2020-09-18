export declare type PageSpec = {
    readonly name: string;
    readonly url: string;
    readonly rootComponents: ComponentSpec[];
    readonly getComponent: (routes: string[]) => ComponentSpec;
};
export declare type ComponentSpec = {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: ComponentSpec;
    readonly children: readonly ComponentSpec[];
    readonly type: string;
};
declare class PageSpecLoader {
    private parseIncludeComponent;
    private parsePageComponent;
    loadPageSpec(specPath: string, specEncoding: string): Promise<PageSpec>;
}
declare const _default: PageSpecLoader;
export default _default;
