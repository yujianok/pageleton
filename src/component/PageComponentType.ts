import { PageComponent } from "./PageComponent";
import { BrowserDriver } from "../driver";

export type PageComponentConfig = {
    driver: BrowserDriver;
    name: string;
    selector: string;
    index: number;
    parent?: PageComponent;
    children: PageComponent[];
}

export interface PageCompnentType {
    new(config: PageComponentConfig): PageComponent;
}