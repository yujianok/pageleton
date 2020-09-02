import { PageAdapter, ElementAdapter, ElementRoute } from "../driver";
import { PageComponent, WaitCondition } from "./PageComponent";
import { PageCompnentType, PageComponentConfig } from "./PageComponentType";

export abstract class AbstractComponent implements PageComponent {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];
    readonly index: number;

    constructor(config: PageComponentConfig) {
        this.name = config.name;
        this.selector = config.selector;
        this.xpath = config.xpath;
        this.parent = config.parent;
        this.index = config.index;
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
            routes.unshift({ selector: cursor.selector, xpath: cursor.xpath });
            cursor = cursor.parent;
        }

        return await pageAdapter.getElement(routes);
    }

    async setValue(value: string, pageAdapter: PageAdapter): Promise<void> {
        throw new Error(`${this.name} not supports setting value`);
    }

    async getValue(pageAdapter: PageAdapter): Promise<any> {
        throw new Error(`${this.name} not supports getting value`);
    }

    async click(pageAdapter: PageAdapter): Promise<void> {
        const element = await this.getComponentElement(pageAdapter);

        if (!element) {
            throw new Error('Component\'s element has not presented: ' + this.name);
        }

        await element.click();
    }

    async mouseOver(pageAdapter: PageAdapter): Promise<void> {
        const element = await this.getComponentElement(pageAdapter);

        if (!element) {
            throw new Error('Component\'s element has not presented: ' + this.name);
        }

        await element.mouseOver();
    }

    async waitUntil(condition: WaitCondition, timeout: number, pageAdapter: PageAdapter): Promise<void> {
        const interval = 1000;
        const forever = timeout <= 0;
        let vestige = forever ? interval : timeout;

        while (vestige > 0) {
            const element = await this.getComponentElement(pageAdapter);
            if (element && condition(element)) {
                return;
            } else if (vestige > 0) {
                const nextInterval = vestige >= interval ? interval : vestige;
                await new Promise(res => setTimeout(res, nextInterval));
                vestige = forever ? interval : vestige - interval;
            }
        }

        throw new Error('Waiting for component to fit condition is timeout: ' + timeout);
    }

    async waitUntilPresent(timeout: number, pageAdapter: PageAdapter): Promise<void> {
        return await this.waitUntil((element) => !!element, timeout, pageAdapter);
    }

    pushChildComponents(...children: PageComponent[]) {
        this.children.push(...children);
    }
}