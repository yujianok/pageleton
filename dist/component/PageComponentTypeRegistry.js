"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageComponentTypeRegistry = (function () {
    function PageComponentTypeRegistry() {
        this.componentTypeRegistry = {};
    }
    PageComponentTypeRegistry.prototype.getComponentType = function (name) {
        return this.componentTypeRegistry[name] || this.componentTypeRegistry['Component'];
    };
    PageComponentTypeRegistry.prototype.registerComponentType = function (pageCompnentType) {
        this.componentTypeRegistry[pageCompnentType.name] = pageCompnentType;
    };
    return PageComponentTypeRegistry;
}());
exports.default = new PageComponentTypeRegistry();
//# sourceMappingURL=PageComponentTypeRegistry.js.map