import { PageComponent } from "./PageComponent";
import { PageCompnentType, PageComponentConfig } from "./PageComponentType";
import { BrowserDriver } from "../driver";


export abstract class AbstractComponent implements PageComponent {
    readonly name: string;
    readonly selector: string;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];
    readonly index: number;

    private readonly driver: BrowserDriver;

    constructor(config: PageComponentConfig) {
        this.name = config.name;
        this.selector = config.selector;
        this.parent = config.parent;
        this.driver = config.driver;
        this.index = config.index;
        this.children = [...config.children];
    }

    getChildComponent(name: string): PageComponent | undefined {
        return this.children.find(child => child.name === name);
    }

    getSubComponentOfType(componentType: PageCompnentType): PageComponent[] {
        return this.children.filter(child => child instanceof componentType) as PageComponent[];
    }

    async setValue(value: string): Promise<void> {
        throw new Error(`${this.name} not supports setting value`);
    };

    async getValue(): Promise<any> {
        throw new Error(`${this.name}not supports getting value`);
    };

    pushChildComponents(...children: PageComponent[]) {
        this.children.push(...children);
    }
}