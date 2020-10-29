"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractComponent = void 0;
var PageComponentTypeRegistry_1 = __importDefault(require("./PageComponentTypeRegistry"));
var ComponentSpecService_1 = __importDefault(require("../service/ComponentSpecService"));
var AbstractComponent = (function () {
    function AbstractComponent(pageDriver, componentSpec) {
        this.pageDriver = pageDriver;
        this.componentSpec = componentSpec;
    }
    AbstractComponent.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(this.constructor.name + " not supports setting value");
            });
        });
    };
    AbstractComponent.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(this.constructor.name + " not supports getting value");
            });
        });
    };
    AbstractComponent.prototype.getText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getElementDriver()];
                    case 1:
                        element = _a.sent();
                        return [4, element.getInnerText()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.getAttribute = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getElementDriver()];
                    case 1:
                        element = _a.sent();
                        return [4, element.getAttribute(name)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getElementDriver()];
                    case 1:
                        element = _a.sent();
                        return [4, element.click()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AbstractComponent.prototype.mouseOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getElementDriver()];
                    case 1:
                        element = _a.sent();
                        return [4, element.mouseOver()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AbstractComponent.prototype.waitUntil = function (condition, timeout) {
        if (timeout === void 0) { timeout = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var interval, forever, vestige, _loop_1, this_1, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        interval = 1000;
                        forever = timeout <= 0;
                        vestige = forever ? interval : timeout;
                        _loop_1 = function () {
                            var nextInterval_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, condition(this_1)];
                                    case 1:
                                        if (!_a.sent()) return [3, 2];
                                        return [2, { value: void 0 }];
                                    case 2:
                                        if (!(vestige > 0)) return [3, 4];
                                        nextInterval_1 = vestige >= interval ? interval : vestige;
                                        return [4, new Promise(function (res) { return setTimeout(res, nextInterval_1); })];
                                    case 3:
                                        _a.sent();
                                        vestige = forever ? interval : vestige - interval;
                                        _a.label = 4;
                                    case 4: return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(vestige > 0)) return [3, 3];
                        return [5, _loop_1()];
                    case 2:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        return [3, 1];
                    case 3: throw new Error('Waiting for component to fit condition is timeout: ' + timeout);
                }
            });
        });
    };
    AbstractComponent.prototype.isPresent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element, _a, width, height;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getElementDriver(true)];
                    case 1:
                        element = _b.sent();
                        if (!element) {
                            return [2, false];
                        }
                        return [4, element.getSize()];
                    case 2:
                        _a = _b.sent(), width = _a[0], height = _a[1];
                        return [2, width > 0 && height > 0];
                }
            });
        });
    };
    AbstractComponent.prototype.waitUntilPresent = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.waitUntil(function (component) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, component.isPresent()];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); }, timeout)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.waitUntilVanished = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.waitUntil(function (component) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, component.isPresent()];
                                case 1: return [2, !(_a.sent())];
                            }
                        }); }); }, timeout)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.getSubComponents = function (type) {
        var _this = this;
        var subComponentSpecs = this.componentSpec.children.filter(function (c) { return c.type === type.name; });
        var subComponents = subComponentSpecs.map(function (subComponentSpec) {
            var SubComponentType = PageComponentTypeRegistry_1.default.getComponentType(subComponentSpec.type);
            return new SubComponentType(_this.pageDriver, subComponentSpec);
        });
        return subComponents;
    };
    AbstractComponent.prototype.getElementDriver = function (canBeNull) {
        return __awaiter(this, void 0, void 0, function () {
            var elementRoutes, elementDriver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementRoutes = ComponentSpecService_1.default.getElementRoutes(this.componentSpec);
                        return [4, this.pageDriver.getElement(elementRoutes)];
                    case 1:
                        elementDriver = _a.sent();
                        if (!elementDriver && !canBeNull) {
                            throw new Error('Can not locate element by component:' + elementRoutes.map(function (er) { return er.name; }).join('>'));
                        }
                        return [2, elementDriver];
                }
            });
        });
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=AbstractComponent.js.map