import { PageElement } from "../element";

export interface PageComponent {
    readonly name: string;
    readonly selector: string;
    readonly dynamic: boolean;
    readonly parent?: PageComponent;
    readonly children: PageComponent[];

    duplicate(): PageComponent;
    getChildComponent(name: string): PageComponent;
    getComponentEl(): Promise<PageElement>;
    pushChildComponent(...components: PageComponent[]): void;
    click(): Promise<void>;
    setValue(value: string): Promise<void>;
    getValue(): Promise<any>;
}