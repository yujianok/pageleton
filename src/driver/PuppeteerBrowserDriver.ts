import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer-core';
import { BrowserDriver, LaunchOptions } from "./BrowserDriver";
import { ElementNode, ElementRoute, NavigationListener, PageDriver } from './PageDriver';
import { ElementDriver } from './ElementDriver';

class PuppeteerElementDriver implements ElementDriver {
    private readonly elementHandler: ElementHandle;

    constructor(elementHandler: ElementHandle) {
        this.elementHandler = elementHandler;
    }

    async mouseOver(): Promise<void> {
        await this.elementHandler.hover();
    }

    async click(): Promise<void> {
        await this.elementHandler.evaluate(el => (el as HTMLElement).click())
    }

    async getPosition(): Promise<[number, number]> {
        const boundingBox = await this.elementHandler.boundingBox();

        return boundingBox ? [boundingBox.x, boundingBox.y] : [0, 0];
    }

    async getSize(): Promise<[number, number]> {
        const boundingBox = await this.elementHandler.boundingBox();

        return boundingBox ? [boundingBox.width, boundingBox.height] : [0, 0];
    }

    async getValue(): Promise<string> {
        return await this.elementHandler.evaluate((el) => {
            if (el instanceof HTMLInputElement) {
                return el.value;
            } else {
                throw new Error('Element is not a input, can not invoke getInputValue on it');
            }
        });
    }

    async setValue(value: string): Promise<void> {
        return await this.elementHandler.evaluate((el, v) => {
            if (el instanceof HTMLInputElement) {
                el.value = v;
            } else {
                throw new Error('Element is not a input, can not invoke setValue on it');
            }
        }, value);
    }

    async getInnerText(): Promise<string> {
        return await this.elementHandler.evaluate((el) => (el as HTMLElement).innerText);
    }

    getAttribute(name: string): Promise<string | undefined> {
        return this.elementHandler.evaluate((el, attr) => el.getAttribute(attr) || undefined, name);
    }
}

class PuppeteerPageDriver implements PageDriver {

    private readonly page: Page;
    private readonly baseUrl?: string;

    constructor(page: Page, baseUrl?: string) {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async goto(url: string): Promise<void> {
        let resovledUrl = url;
        if (!this.page.url() || this.page.url() === 'about:blank' || !/^([a-z][a-z0-9+\-.]*):/.test(url)) {
            resovledUrl = (this.baseUrl || '') + url;
        }

        await this.page.goto(resovledUrl);
    }

    async close(): Promise<void> {
        await this.page.close();
    }

    async waitForNavigation(timeout?: number): Promise<void> {
        await this.page.waitForNavigation({ timeout: timeout || 0 })
    }

    async getElement(routes: ElementRoute[]): Promise<ElementDriver | undefined> {

        const jsHandle = await this.page.evaluateHandle((routesJson) => {
            const rs = JSON.parse(routesJson) as ElementRoute[];

            let element: Element | null = null;
            for (const route of rs) {
                const { name, selector, xpath } = route;

                if (selector) {
                    element = (element || document).querySelector(selector);
                }

                if (xpath) {
                    element = document.evaluate(xpath, element || document).iterateNext() as Element;
                }

                if (!selector && !xpath) {
                    element = document.evaluate(`(.//*[normalize-space()='${name}'])[last()]`, element || document).iterateNext() as Element;
                }

                if (!element) {
                    // throw new Error('Can not find element by routes:' + routesJson + 'on index of ' + rs.indexOf(route));
                    break;
                }
            }

            return element;
        }, JSON.stringify(routes));

        const elementHandle = jsHandle.asElement() || undefined;

        return elementHandle && new PuppeteerElementDriver(elementHandle);
    }

    async identifyComponents(rootNodes: ElementNode[]): Promise<void> {
        await this.page.evaluateHandle((rootNodesJson) => {
            const rootNodes = JSON.parse(rootNodesJson) as ElementNode[];

            const tempQueue: { parent?: Element, node: ElementNode, zIndex: number }[] = [];
            tempQueue.push(...rootNodes.map(node => ({ node, zIndex: 100 })));
            let current = tempQueue.pop();
            while (current) {
                const currentNode = current.node;
                const { name, selector, xpath, children } = currentNode;
                let element: Element | null = current.parent || null;
                if (selector) {
                    element = (element || document).querySelector(selector);
                }

                if (xpath) {
                    element = document.evaluate(xpath, element || document).iterateNext() as Element;
                }

                if (!selector && !xpath) {
                    element = document.evaluate(`(.//*[normalize-space()='${name}'])[last()]`, element || document).iterateNext() as Element;
                }

                if (element) {
                    const ancestor = document.createElement('span');
                    ancestor.setAttribute('style', `position: relative;height: 0px;width: 0px;z-index: ${current.zIndex};`);
                    element.parentElement?.append(ancestor);

                    const elRect = element.getBoundingClientRect();
                    const actRect = ancestor.getBoundingClientRect()

                    const cover = document.createElement('div');
                    cover.textContent = name;
                    const coverStyle = `position: absolute;
                                        opacity: 0;
                                        top: 0px;
                                        top: ${elRect.top - actRect.top}px;
                                        left: ${elRect.left - actRect.left}px;
                                        height: ${elRect.height}px;
                                        width: ${elRect.width}px;
                                        z-index: ${current.zIndex};
                                        border: solid 1px red;
                                        color: red;
                                        overflow: visible;
                                        background-color: white;`;
                    cover.setAttribute('style', coverStyle);
                    cover.addEventListener('mouseover', () => {
                        cover.setAttribute('style', coverStyle + 'opacity: 0.8;');
                    });
                    cover.addEventListener('mouseleave', () => {
                        cover.setAttribute('style', coverStyle);
                    });

                    ancestor.append(cover);
                    tempQueue.push(...children.map(node => ({ node, parent: element || undefined, zIndex: current!.zIndex + 100 })))
                }

                current = tempQueue.pop();
            }

        }, JSON.stringify(rootNodes));
    }

    onNavigated(listener: NavigationListener): void {
        this.page.on('framenavigated', (frame) => {
            const url = frame.url();
            listener(url);
        })
    }

}

export class PuppeteerBrowserDriver implements BrowserDriver {
    private browser?: Browser;
    private options?: LaunchOptions;

    async launch(options?: LaunchOptions): Promise<void> {
        this.options = options;
        this.browser = await puppeteer.launch({ defaultViewport: options?.viewport, ...options });
    }

    async shotdown(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = undefined;
        }
    }

    async newPage(): Promise<PageDriver> {
        if (!this.browser) {
            throw new Error('Browser has not been launched.');
        }

        const page = await this.browser.newPage();

        if (this.options?.timeout !== undefined) {
            page.setDefaultTimeout(this.options.timeout);
        }

        return new PuppeteerPageDriver(page, this.options?.baseUrl);
    }
}

