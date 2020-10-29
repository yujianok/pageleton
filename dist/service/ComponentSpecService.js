"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementRoutes(componentSpec) {
    var elementRoutes = [];
    var cursor = componentSpec;
    while (cursor) {
        elementRoutes.unshift({ name: cursor.name, selector: cursor.selector, xpath: cursor.xpath });
        cursor = cursor.parent;
    }
    return elementRoutes;
}
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
exports.default = { getElementRoutes: getElementRoutes, getRootElementNodes: getRootElementNodes };
//# sourceMappingURL=ComponentSpecService.js.map