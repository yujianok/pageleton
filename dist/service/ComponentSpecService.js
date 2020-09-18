"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementRoutes = void 0;
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
