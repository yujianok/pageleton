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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageletonPage = void 0;
var PageletonPage = (function () {
    function PageletonPage(name, url, rootComponents) {
        this.name = name;
        this.url = url;
        this.rootComponents = rootComponents;
    }
    PageletonPage.prototype.getPageAdapter = function () {
        throw new Error("Page has not bean opened:" + this.name);
    };
    PageletonPage.prototype.getComponent = function (routes) {
        var current;
        var children = this.rootComponents;
        var _loop_1 = function (route) {
            current = children.find(function (c) { return c.name === route; });
            if (!current) {
                throw new Error('Component can not be found, path:' + routes.join('>'));
            }
            children = current.children;
        };
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            _loop_1(route);
        }
        return current;
    };
    PageletonPage.prototype.getTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageAdapter = this.getPageAdapter();
                        return [4, pageAdapter.getTitle()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.getComponentValue = function (routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.getValue(pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.setComponentValue = function (value, routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.setValue(value, pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.clickComponent = function (routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.click(pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.isComponentPresent = function (routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.isPresent(pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.open = function (browserDriver) {
        return __awaiter(this, void 0, void 0, function () {
            var pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, browserDriver.newPage()];
                    case 1:
                        pageAdapter = _a.sent();
                        return [4, pageAdapter.goto(this.url)];
                    case 2:
                        _a.sent();
                        this.getPageAdapter = function () { return pageAdapter; };
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageAdapter = this.getPageAdapter();
                        return [4, pageAdapter.close()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.waitForNavigation = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageAdapter = this.getPageAdapter();
                        return [4, pageAdapter.waitForNavigation(timeout)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.getComponentAttribute = function (name, routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.getAttribute(name, pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.getComponentText = function (routes) {
        return __awaiter(this, void 0, void 0, function () {
            var component, pageAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this.getComponent(routes);
                        pageAdapter = this.getPageAdapter();
                        return [4, component.getText(pageAdapter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return PageletonPage;
}());
exports.PageletonPage = PageletonPage;
