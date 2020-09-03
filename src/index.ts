import { BrowserDriverType, browserDriverFactory } from './driver';
import { PageletonPageFactory, PageletonPage } from './page';
import { PageCompnentType, pageComponentTypeRegistry } from './component';

export * from './component';
export * from './page';
export * from './driver';

const DEFAULT_PAGE_SPEC_PATHS = ['./pages/*.xml'];

export type PageletonConfig = {
    specPaths?: string[];
    specEncoding?: string;
    driverType?: 'puppeteer';
    driverConfig?: object;
    executablePath?: string;
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
    },
    customComponentTypes?: PageCompnentType[],
    customBrowserDriver?: BrowserDriverType,
}

export type PageletonBrowser = {
    openPage: (name: string) => Promise<PageletonPage>;
    shutdown: () => Promise<void>;
}

export const pageleton = (config: PageletonConfig) => {
    const pageletonPageFactory = new PageletonPageFactory(config.specPaths || DEFAULT_PAGE_SPEC_PATHS, config.specEncoding);
    if (config.customComponentTypes) {
        config.customComponentTypes.forEach(cst => pageComponentTypeRegistry.registerComponentType(cst));
    }

    return {
        launchBrowser: async () => {
            const browserDriver = browserDriverFactory.getBrowserDriver(config.driverType);
            await browserDriver.launch(config);

            return {
                openPage: async (name: string) => {
                    const pageletonPage = await pageletonPageFactory.getPageByName(name);

                    if (!pageletonPage) {
                        throw new Error('Page not exists: ' + name);
                    }

                    await pageletonPage.open(browserDriver);

                    return pageletonPage;
                },

                shutdown: async () => {
                    await browserDriver.shotdown();
                },

            } as PageletonBrowser;
        }
    }
}