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
var ComponentSpecService_1 = require("../service/ComponentSpecService");
var PageletonComponent_1 = require("./PageletonComponent");
var PageletonPage = (function () {
    function PageletonPage(pageDriver, pageSpecFactory) {
        this.pageDriver = pageDriver;
        this.pageSpecFactory = pageSpecFactory;
    }
    PageletonPage.prototype.getComponent = function () {
        var _a;
        var routes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routes[_i] = arguments[_i];
        }
        if (!this.currentPage) {
            throw new Error('No page has bean opened yet.');
        }
        var componentSpec = (_a = this.currentPage).getComponent.apply(_a, routes);
        return new PageletonComponent_1.PageletonComponent(componentSpec, this.pageDriver);
    };
    PageletonPage.prototype.open = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSpec;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSpec = this.pageSpecFactory.getPageByName(name);
                        if (!pageSpec) {
                            throw new Error('Page can not be found: ' + name);
                        }
                        this.currentPage = pageSpec;
                        return [4, this.pageDriver.goto(pageSpec.url)];
                    case 1:
                        _a.sent();
                        this.pageDriver.onNavigated(function (url) {
                            _this.currentPage = _this.pageSpecFactory.getPageByUrl(url);
                        });
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.getTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pageDriver.getTitle()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PageletonPage.prototype.getPageName = function () {
        var _a;
        return (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.name;
    };
    PageletonPage.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pageDriver.close()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.waitForNavigation = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pageDriver.waitForNavigation(timeout)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PageletonPage.prototype.checkComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rootComponents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentPage) return [3, 2];
                        rootComponents = ComponentSpecService_1.getRootElementNodes(this.currentPage.rootComponents);
                        return [4, this.pageDriver.checkComponents(rootComponents)];
                    case 1: return [2, _a.sent()];
                    case 2: return [2, false];
                }
            });
        });
    };
    PageletonPage.prototype.getScreenShot = function (path, fullPage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pageDriver.getScreenShot(path, fullPage)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return PageletonPage;
}());
exports.PageletonPage = PageletonPage;
