import { PageAdapter, ElementAdapter } from "../driver";
import { PageComponent } from "./PageComponent";
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

    protected async getComponentElement(pageAdapter: PageAdapter): Promise<ElementAdapter| undefined> {
        if (this.parent) {
            const parentEl = await (this.parent as AbstractComponent).getComponentElement(pageAdapter);
            return parentEl && await parentEl.getSubElement(this.selector, this.xpath);
        }

        return await pageAdapter.getElement(this.selector, this.xpath);
    }

    async setValue(value: string, pageAdapter: PageAdapter): Promise<void> {
        throw new Error(`${this.name} not supports setting value`);
    }

    async getValue(pageAdapter: PageAdapter): Promise<any> {
        throw new Error(`${this.name}not supports getting value`);
    }

    pushChildComponents(...children: PageComponent[]) {
        this.children.push(...children);
    }
}