import { ElementNode, ElementRoute } from "../driver";
import { ComponentSpec, PageSpec } from "../spec";

export function getElementRoutes(componentSpec: ComponentSpec) {
    const elementRoutes: ElementRoute[] = [];

    let cursor: ComponentSpec | undefined = componentSpec;
    while (cursor) {
        elementRoutes.unshift({ name: cursor.name, selector: cursor.selector, xpath: cursor.xpath });
        cursor = cursor.parent;
    }

    return elementRoutes;
}

export function getRootElementNodes(rootComponents: ComponentSpec[]) {
    function componentToNode(component: ComponentSpec): ElementNode {
        return {
            name: component.name,
            selector: component.selector,
            xpath: component.xpath,
            children: component.children.map(componentToNode),
        }
    }

    return rootComponents.map(componentToNode);
}