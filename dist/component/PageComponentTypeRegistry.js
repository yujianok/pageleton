"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageComponentTypeRegistry = (function () {
    function PageComponentTypeRegistry() {
        this.componentTypeRegistry = {};
    }
    PageComponentTypeRegistry.prototype.getComponentByType = function (name) {
        var PageComponentType = this.componentTypeRegistry[name] || this.componentTypeRegistry['Component'];
        return new PageComponentType();
    };
    PageComponentTypeRegistry.prototype.registerComponentType = function (pageCompnentType) {
        this.componentTypeRegistry[pageCompnentType.name] = pageCompnentType;
    };
    return PageComponentTypeRegistry;
}());
exports.default = new PageComponentTypeRegistry();
//# sourceMappingURL=PageComponentTypeRegistry.js.map