import { PageComponent } from "./PageComponent";
import { PageElement } from "../element";
import { PageCompnentType } from "./PageComponentType";

export abstract class AbstractComponent implements PageComponent {
    readonly name: string;
    readonly selector: string;
    readonly dynamic: boolean;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];

    constructor(name: string, selector: string, dynamic: boolean, parent?: PageComponent) {
        this.name = name
        this.selector = selector;
        this.dynamic = dynamic;
        this.parent = parent;
        this.children = [];
    }

    pushChildComponent(...components: PageComponent[]): void {
        this.children.push(...components);
    }

    setChilComponts(components: PageComponent[]): void {
        this.children.push(...components);
    }

    duplicate(): PageComponent {
        throw new Error("Method not implemented.");
    }

    getChildComponent(name: string): PageComponent {
        throw new Error("Method not implemented.");
    }

    getComponentEl(): Promise<PageElement> {
        throw new Error("Method not implemented.");
    }

    getSubComponentOfType(componentType: PageCompnentType): Promise<PageComponent[]> {
        throw new Error("Method not implemented.");
    }

    async click(): Promise<void> {
        const componentEl = await this.getComponentEl();
        await componentEl.click();
    }

    async setValue(value: string): Promise<void> {
        throw new Error(`${this.name}不支持设值`);
    };

    async getValue(): Promise<any> {
        throw new Error(`${this.name}不支持取值`);
    };
}