import { PageComponentType, pageComponentTypeRegistry } from './component';
import { browserDriverFactory } from './driver';
import { PageletonBrowser } from './page';
import { PageSpecFactory } from './spec';

export { AbstractComponent, PageComponent } from './component';
export { PageletonBrowser, PageletonPage } from './page';
export { PageSpec, ComponentSpec } from './spec';

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
    baseUrl?: string;
    viewport?: {
        width?: number;
        height?: number;
        isMobile?: boolean;
        deviceScaleFactor?: number;
        hasTouch?: boolean;
        isLandscape?: boolean;
    },
    customComponentTypes?: PageComponentType[],
}

export type PageletonInstance = {
    launchBrowser: () => Promise<PageletonBrowser>;
}

export const Pageleton = (config: PageletonConfig) => {

    if (config.customComponentTypes) {
        config.customComponentTypes.forEach(cst => pageComponentTypeRegistry.registerComponentType(cst));
    }

    return {
        launchBrowser: async () => {
            const pageletonPageFactory = await PageSpecFactory.init(config.specPaths || DEFAULT_PAGE_SPEC_PATHS, config.specEncoding);
            const browserDriver = browserDriverFactory.getBrowserDriver(config.driverType);
            await browserDriver.launch(config);

            return new PageletonBrowser(browserDriver, pageletonPageFactory);
        }
    } as PageletonInstance;
}