import { BrowserDriverType, browserDriverFactory } from './driver';
import { PageletonPageFactory } from './page';
import { PageCompnentType, pageComponentTypeRegistry } from './component';

export * from './component';
export * from './page';
export * from './driver';

export type PageletonConfig = {
    specPaths: string[];
    specEncoding?: string;
    driverType?: 'puppeteer';
    driverConfig?: object;
    executablePath: string;
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

export const pageleton = (config: PageletonConfig) => {
    const pageletonPageFactory = new PageletonPageFactory(config.specPaths, config.specEncoding);
    if (config.customComponentTypes) {
        config.customComponentTypes.forEach(cst => pageComponentTypeRegistry.registerComponentType(cst));
    }

    return {
        launchBrowser: () => {
            const browserDriver = browserDriverFactory.getBrowserDriver(config.driverType);
            const launchDefer = browserDriver.launch(config);

            return {
                openPage: async (name: string) => {
                    const pageletonPage = await pageletonPageFactory.getPageByName(name);

                    if (!pageletonPage) {
                        throw new Error('Page not exists: ' + name);
                    }

                    await launchDefer;
                    await pageletonPage.open(browserDriver);

                    return pageletonPage;
                },

                shutdown: async () => {
                    await launchDefer;
                    await browserDriver.shotdown();
                }
            }
        }
    }
}