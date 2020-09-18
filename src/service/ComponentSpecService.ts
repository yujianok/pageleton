import { ComponentSpec } from "../spec";

export function getElementRoutes(componentSpec: ComponentSpec) {
    const elementRoutes = [];

    let cursor: ComponentSpec | undefined = componentSpec;
    while (cursor) {
        elementRoutes.unshift({ name: cursor.name, selector: cursor.selector, xpath: cursor.xpath });
        cursor = cursor.parent;
    }

    return elementRoutes;
}