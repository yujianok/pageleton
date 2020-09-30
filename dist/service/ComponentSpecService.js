"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootElementNodes = exports.getElementRoutes = void 0;
function getElementRoutes(componentSpec) {
    var elementRoutes = [];
    var cursor = componentSpec;
    while (cursor) {
        elementRoutes.unshift({ name: cursor.name, selector: cursor.selector, xpath: cursor.xpath });
        cursor = cursor.parent;
    }
    return elementRoutes;
}
exports.getElementRoutes = getElementRoutes;
function getRootElementNodes(rootComponents) {
    function componentToNode(component) {
        return {
            name: component.name,
            selector: component.selector,
            xpath: component.xpath,
            children: component.children.map(componentToNode),
        };
    }
    return rootComponents.map(componentToNode);
}
exports.getRootElementNodes = getRootElementNodes;
