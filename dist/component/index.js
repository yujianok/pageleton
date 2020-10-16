"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./DefaultPageComponents");
var PageComponentTypeRegistry_1 = require("./PageComponentTypeRegistry");
Object.defineProperty(exports, "pageComponentTypeRegistry", { enumerable: true, get: function () { return PageComponentTypeRegistry_1.default; } });
__exportStar(require("./PageComponent"), exports);
__exportStar(require("./AbstractComponent"), exports);
//# sourceMappingURL=index.js.map