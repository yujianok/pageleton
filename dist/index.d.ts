declare module "driver/ElementDriver" {
    export interface ElementDriver {
        getInnerText(): Promise<string>;
        getValue(): Promise<string>;
        setValue(value: string): Promise<void>;
        getAttribute(name: string): Promise<string | undefined>;
        click(): Promise<void>;
        mouseOver(): Promise<void>;
        getPosition(): Promise<[number, number]>;
        getSize(): Promise<[number, number]>;
    }
}
declare module "driver/PageDriver" {
    import { ElementDriver } from "driver/ElementDriver";
    export type ElementRoute = {
        name: string;
        selector?: string;
        xpath?: string;
    };
    export type ElementNode = {
        name: string;
        selector?: string;
        xpath?: string;
        children: ElementNode[];
    };
    export type NavigationListener = (url: string) => void;
    export interface PageDriver {
        goto(url: string): Promise<void>;
        close(): Promise<void>;
        waitForNavigation(waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2", timeout?: number): Promise<void>;
        getTitle(): Promise<string>;
        getElement(routes: ElementRoute[]): Promise<ElementDriver | undefined>;
        onNavigated(listener: NavigationListener): void;
        checkComponents(rootNodes: ElementNode[]): Promise<boolean>;
        getScreenShot(path: string, fullPage?: boolean): Promise<void>;
    }
}
declare module "driver/BrowserDriver" {
    import { PageDriver } from "driver/PageDriver";
    export type LaunchOptions = {
        executablePath?: string;
        baseUrl?: string;
        headless?: boolean;
        args?: string[];
        timeout?: number;
        viewport?: {
            width?: number;
            height?: number;
            isMobile?: boolean;
            deviceScaleFactor?: number;
            hasTouch?: boolean;
            isLandscape?: boolean;
        };
    };
    export interface BrowserDriver {
        launch(options?: LaunchOptions): Promise<void>;
        shotdown(): Promise<void>;
        newPage(): Promise<PageDriver>;
    }
    export interface BrowserDriverType {
        new (config?: any): BrowserDriver;
    }
}
declare module "driver/PuppeteerBrowserDriver" {
    import { BrowserDriver, LaunchOptions } from "driver/BrowserDriver";
    import { PageDriver } from "driver/PageDriver";
    export class PuppeteerBrowserDriver implements BrowserDriver {
        private browser?;
        private options?;
        launch(options?: LaunchOptions): Promise<void>;
        shotdown(): Promise<void>;
        newPage(): Promise<PageDriver>;
    }
}
declare module "driver/BrowserDriverFactory" {
    import { BrowserDriver, BrowserDriverType } from "driver/BrowserDriver";
    class BrowserDriverFactory {
        private browserMap;
        private customBrowserDriver?;
        getBrowserDriver(driverType?: 'puppeteer'): BrowserDriver;
        setCustomBrowserDriver(browserDriverType: BrowserDriverType): void;
    }
    const _default: BrowserDriverFactory;
    export default _default;
}
declare module "driver/index" {
    export * from "driver/BrowserDriver";
    export * from "driver/BrowserDriverFactory";
    export * from "driver/PageDriver";
    export * from "driver/ElementDriver";
}
declare module "service/FileService" {
    function getAllFiles(filePath: string): Promise<string[]>;
    function readFileAsString(filePath: string, encoding: string): Promise<string>;
    const _default_1: {
        getAllFiles: typeof getAllFiles;
        readFileAsString: typeof readFileAsString;
    };
    export default _default_1;
}
declare module "spec/PageSpecLoader" {
    export type PageSpec = {
        readonly name: string;
        readonly url: string;
        readonly rootComponents: ComponentSpec[];
        readonly getComponent: (...routes: string[]) => ComponentSpec;
    };
    export type ComponentSpec = {
        readonly name: string;
        readonly selector?: string;
        readonly xpath?: string;
        readonly parent?: ComponentSpec;
        readonly children: readonly ComponentSpec[];
        readonly type: string;
    };
    class PageSpecLoader {
        private parseIncludeComponent;
        private parsePageComponent;
        loadPageSpec(specPath: string, specEncoding: string): Promise<PageSpec>;
    }
    export const pageSpecLoader: PageSpecLoader;
}
declare module "spec/PageSpecFactory" {
    import { PageSpec } from "spec/PageSpecLoader";
    export class PageSpecFactory {
        private readonly specPaths;
        private readonly specEncoding;
        private readonly pages;
        private constructor();
        static init(specPaths: string[], specEncoding?: string): Promise<PageSpecFactory>;
        getPageByName(name: string): PageSpec | undefined;
        getPageByUrl(url: string): PageSpec | undefined;
    }
}
declare module "spec/index" {
    export { PageSpec, ComponentSpec } from "spec/PageSpecLoader";
    export { PageSpecFactory } from "spec/PageSpecFactory";
}
declare module "component/PageComponent" {
    import { PageDriver } from "driver/index";
    import { ComponentSpec } from "spec/index";
    export type WaitCondition = (pageComponent: PageComponent) => Promise<boolean>;
    export interface PageComponent {
        setValue(value: string): Promise<void>;
        getValue(): Promise<any>;
        getText(): Promise<string>;
        getAttribute(name: string): Promise<string | undefined>;
        click(): Promise<void>;
        mouseOver(): Promise<void>;
        isPresent(): Promise<boolean>;
        waitUntil(condition: WaitCondition, timeout: number): Promise<void>;
        waitUntilPresent(timeout?: number): Promise<void>;
        waitUntilVanished(timeout?: number): Promise<void>;
    }
    export interface PageComponentType {
        new (pageDriver: PageDriver, componentSpec: ComponentSpec): PageComponent;
    }
}
declare module "component/PageComponentTypeRegistry" {
    import { PageComponentType } from "component/PageComponent";
    class PageComponentTypeRegistry {
        private readonly componentTypeRegistry;
        constructor();
        getComponentType(name: string): PageComponentType;
        registerComponentType(pageCompnentType: PageComponentType): void;
    }
    const _default_2: PageComponentTypeRegistry;
    export default _default_2;
}
declare module "service/ComponentSpecService" {
    import { ElementNode, ElementRoute } from "driver/index";
    import { ComponentSpec } from "spec/index";
    function getElementRoutes(componentSpec: ComponentSpec): ElementRoute[];
    function getRootElementNodes(rootComponents: ComponentSpec[]): ElementNode[];
    const _default_3: {
        getElementRoutes: typeof getElementRoutes;
        getRootElementNodes: typeof getRootElementNodes;
    };
    export default _default_3;
}
declare module "component/AbstractComponent" {
    import { ElementDriver, PageDriver } from "driver/index";
    import { ComponentSpec } from "spec/index";
    import { PageComponent, PageComponentType, WaitCondition } from "component/PageComponent";
    export abstract class AbstractComponent implements PageComponent {
        protected readonly pageDriver: PageDriver;
        protected readonly componentSpec: ComponentSpec;
        constructor(pageDriver: PageDriver, componentSpec: ComponentSpec);
        setValue(value: string): Promise<void>;
        getValue(): Promise<any>;
        getText(): Promise<string>;
        getAttribute(name: string): Promise<string | undefined>;
        click(): Promise<void>;
        mouseOver(): Promise<void>;
        waitUntil(condition: WaitCondition, timeout?: number): Promise<void>;
        isPresent(): Promise<boolean>;
        waitUntilPresent(timeout?: number): Promise<void>;
        waitUntilVanished(timeout?: number): Promise<void>;
        protected getSubComponents(type: PageComponentType): PageComponent[];
        protected getElementDriver(canBeNull?: boolean): Promise<ElementDriver | undefined>;
    }
}
declare module "component/DefaultPageComponents" { }
declare module "component/index" {
    import "component/DefaultPageComponents";
    export * from "component/PageComponent";
    export * from "component/AbstractComponent";
}
declare module "page/PageletonPage" {
    import { PageComponent } from "component/index";
    import { PageDriver } from "driver/index";
    import { PageSpecFactory } from "spec/index";
    export class PageletonPage {
        private readonly pageDriver;
        private readonly pageSpecFactory;
        private currentPage?;
        constructor(pageDriver: PageDriver, pageSpecFactory: PageSpecFactory);
        getComponent(...routes: string[]): PageComponent;
        open(name: string): Promise<void>;
        getTitle(): Promise<string>;
        getPageName(): string | undefined;
        close(): Promise<void>;
        waitForNavigation(waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2", timeout?: number): Promise<void>;
        checkComponents(): Promise<boolean>;
        getScreenShot(path: string, fullPage?: boolean): Promise<void>;
    }
}
declare module "page/PageletonBrowser" {
    import { BrowserDriver } from "driver/index";
    import { PageSpecFactory } from "spec/index";
    import { PageletonPage } from "page/PageletonPage";
    export class PageletonBrowser {
        private readonly browserDriver;
        private readonly pageSpecFactory;
        constructor(browserDriver: BrowserDriver, pageSpecFactory: PageSpecFactory);
        newPage(): Promise<PageletonPage>;
        shutdown(): Promise<void>;
    }
}
declare module "page/index" {
    export * from "page/PageletonBrowser";
    export * from "page/PageletonPage";
}
declare module "index" {
    import { PageComponentType } from "component/index";
    import { PageletonBrowser } from "page/index";
    export { AbstractComponent, PageComponent } from "component/index";
    export { PageletonBrowser, PageletonPage } from "page/index";
    export { PageSpec, ComponentSpec } from "spec/index";
    export type PageletonConfig = {
        specPaths?: string[];
        specEncoding?: string;
        driverType?: 'puppeteer';
        driverConfig?: object;
        executablePath?: string;
        headless?: boolean;
        args?: string[];
        timeout?: number;
        baseUrl?: string;
        viewport?: {
            width?: number;
            height?: number;
            isMobile?: boolean;
            deviceScaleFactor?: number;
            hasTouch?: boolean;
            isLandscape?: boolean;
        };
        customComponentTypes?: PageComponentType[];
    };
    export type PageletonInstance = {
        launchBrowser: () => Promise<PageletonBrowser>;
    };
    export const Pageleton: (config: PageletonConfig) => PageletonInstance;
}
