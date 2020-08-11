import { PageComponent } from "./PageComponent";

export interface PageCompnentType {
    new(name: string, selector: string, dynamic: boolean, parent?: PageComponent): PageComponent;
}