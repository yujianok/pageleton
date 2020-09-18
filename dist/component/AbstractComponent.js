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
var ComponentSpecService_1 = require("../service/ComponentSpecService");
var AbstractComponent = (function () {
    function AbstractComponent() {
    }
    AbstractComponent.prototype.setValue = function (value, element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(this.constructor.name + " not supports setting value");
            });
        });
    };
    AbstractComponent.prototype.getValue = function (element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(this.constructor.name + " not supports getting value");
            });
        });
    };
    AbstractComponent.prototype.getText = function (element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, element.getInnerText()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.getAttribute = function (name, element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, element.getAttribute(name)];
            });
        });
    };
    AbstractComponent.prototype.click = function (element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, element.click()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AbstractComponent.prototype.mouseOver = function (element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, element.mouseOver()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AbstractComponent.prototype.waitUntil = function (condition, timeout, element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            var interval, forever, vestige, _loop_1, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        interval = 1000;
                        forever = timeout <= 0;
                        vestige = forever ? interval : timeout;
                        _loop_1 = function () {
                            var _a, nextInterval_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = element;
                                        if (!_a) return [3, 2];
                                        return [4, condition(element, page, component)];
                                    case 1:
                                        _a = (_b.sent());
                                        _b.label = 2;
                                    case 2:
                                        if (!_a) return [3, 3];
                                        return [2, { value: void 0 }];
                                    case 3:
                                        if (!(vestige > 0)) return [3, 5];
                                        nextInterval_1 = vestige >= interval ? interval : vestige;
                                        return [4, new Promise(function (res) { return setTimeout(res, nextInterval_1); })];
                                    case 4:
                                        _b.sent();
                                        vestige = forever ? interval : vestige - interval;
                                        _b.label = 5;
                                    case 5: return [2];
                                }
                            });
                        };
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
    AbstractComponent.prototype.isPresent = function (element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, width, height;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, element.getSize()];
                    case 1:
                        _a = _b.sent(), width = _a[0], height = _a[1];
                        return [2, width > 0 && height > 0];
                }
            });
        });
    };
    AbstractComponent.prototype.waitUntilPresent = function (timeout, element, page, component) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.waitUntil(function (e, p, c) { return _this.isPresent(e, p, c); }, timeout, element, page, component)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AbstractComponent.prototype.getSubComponentValue = function (component, type, page) {
        return __awaiter(this, void 0, void 0, function () {
            var subComponentSpecs, headerValues;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subComponentSpecs = component.children.filter(function (c) { return c.type === type.name; });
                        return [4, Promise.all(subComponentSpecs.map(function (subComponentSpec) { return __awaiter(_this, void 0, void 0, function () {
                                var subComponent, subElement, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            subComponent = PageComponentTypeRegistry_1.default.getComponentByType(subComponentSpec.type);
                                            return [4, page.getElement(ComponentSpecService_1.getElementRoutes(subComponentSpec))];
                                        case 1:
                                            subElement = _b.sent();
                                            _a = subElement;
                                            if (!_a) return [3, 3];
                                            return [4, subComponent.getValue(subElement, page, subComponentSpec)];
                                        case 2:
                                            _a = (_b.sent());
                                            _b.label = 3;
                                        case 3: return [2, _a];
                                    }
                                });
                            }); }))];
                    case 1:
                        headerValues = _a.sent();
                        return [2, headerValues];
                }
            });
        });
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
