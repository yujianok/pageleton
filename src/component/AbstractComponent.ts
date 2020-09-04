import { PageAdapter, ElementAdapter, ElementRoute } from "../driver";
import { PageComponent, WaitCondition, PageComponentConfig, PageCompnentType } from "./PageComponent";

export abstract class AbstractComponent implements PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];

    constructor(config: PageComponentConfig) {
        this.name = config.name;
        this.selector = config.selector;
        this.xpath = config.xpath;
        this.parent = config.parent;
        this.children = [...config.children];
    }

    protected getChildComponent(name: string): PageComponent | undefined {
        return this.children.find(child => child.name === name);
    }

    protected getSubComponentOfType(componentType: PageCompnentType): PageComponent[] {
        return this.children.filter(child => child instanceof componentType);
    }

    protected async getComponentElement(pageAdapter: PageAdapter): Promise<ElementAdapter | undefined> {
        const routes: ElementRoute[] = [];
        let cursor: PageComponent | undefined = this;
        while (cursor) {
            routes.unshift({ name: cursor.name, selector: cursor.selector, xpath: cursor.xpath });
            cursor = cursor.parent;
        }

        return await pageAdapter.getElement(routes);
    }

    protected async isElementPresent(element?: ElementAdapter): Promise<boolean> {
        if (!element) {
            return false;
        }

        const [width, height] = await element.getSize();
        return width > 0 && height > 0;
    }

    async setValue(value: string, pageAdapter: PageAdapter): Promise<void> {
        throw new Error(`${this.name} not supports setting value`);
    }

    async getValue(pageAdapter: PageAdapter): Promise<any> {
        throw new Error(`${this.name} not supports getting value`);
    }

    async getText(pageAdapter: PageAdapter): Promise<string> {
        const element = await this.getComponentElement(pageAdapter);

        if (!await this.isElementPresent(element)) {
            throw new Error('Component\'s element is not exist: ' + this.name);
        }

        return await element!.getInnerText();
    }

    async getAttribute(name: string, pageAdapter: PageAdapter): Promise<string | undefined> {
        const element = await this.getComponentElement(pageAdapter);

        if (!element) {
            throw new Error('Component\'s element is not exist: ' + this.name);
        }

        return element.getAttribute(name);
    }

    async click(pageAdapter: PageAdapter): Promise<void> {
        const element = await this.getComponentElement(pageAdapter);

        if (!await this.isElementPresent(element)) {
            throw new Error('Component\'s element has not presented: ' + this.name);
        }

        await element!.click();
    }

    async mouseOver(pageAdapter: PageAdapter): Promise<void> {
        const element = await this.getComponentElement(pageAdapter);

        if (!await this.isElementPresent(element)) {
            throw new Error('Component\'s element has not presented: ' + this.name);
        }

        await element!.mouseOver();
    }

    async waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void> {
        const interval = 1000;
        const forever = timeout <= 0;
        let vestige = forever ? interval : timeout;

        while (vestige > 0) {
            const element = await this.getComponentElement(pageAdapter);
            if (element && await condition(element)) {
                return;
            } else if (vestige > 0) {
                const nextInterval = vestige >= interval ? interval : vestige;
                await new Promise(res => setTimeout(res, nextInterval));
                vestige = forever ? interval : vestige - interval;
            }
        }

        throw new Error('Waiting for component to fit condition is timeout: ' + timeout);
    }

    async isPresent(pageAdapter: PageAdapter): Promise<boolean> {
        const element = await this.getComponentElement(pageAdapter);
        return await this.isElementPresent(element);
    }

    async waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void> {
        return await this.waitUntil(this.isElementPresent, timeout, pageAdapter);
    }

    pushChildComponents(...children: PageComponent[]) {
        this.children.push(...children);
    }
}