import { PageComponent } from "./PageComponent";
import { BrowserDriver } from "../driver";

export type PageComponentConfig = {
    name: string;
    selector?: string;
    xpath?: string;
    index: number;
    parent?: PageComponent;
    children: PageComponent[];
}

export interface PageCompnentType {
    new(config: PageComponentConfig): PageComponent;
}