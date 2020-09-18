"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.PuppeteerBrowserDriver = void 0;
var puppeteer_core_1 = __importDefault(require("puppeteer-core"));
var PuppeteerElementDriver = (function () {
    function PuppeteerElementDriver(elementHandler) {
        this.elementHandler = elementHandler;
    }
    PuppeteerElementDriver.prototype.mouseOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.hover()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.evaluate(function (el) { return el.click(); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.getPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boundingBox;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.boundingBox()];
                    case 1:
                        boundingBox = _a.sent();
                        return [2, boundingBox ? [boundingBox.x, boundingBox.y] : [0, 0]];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.getSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boundingBox;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.boundingBox()];
                    case 1:
                        boundingBox = _a.sent();
                        return [2, boundingBox ? [boundingBox.width, boundingBox.height] : [0, 0]];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.evaluate(function (el) {
                            if (el instanceof HTMLInputElement) {
                                return el.value;
                            }
                            else {
                                throw new Error('Element is not a input, can not invoke getInputValue on it');
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.evaluate(function (el, v) {
                            if (el instanceof HTMLInputElement) {
                                el.value = v;
                            }
                            else {
                                throw new Error('Element is not a input, can not invoke setValue on it');
                            }
                        }, value)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.getInnerText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.elementHandler.evaluate(function (el) { return el.innerText; })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PuppeteerElementDriver.prototype.getAttribute = function (name) {
        return this.elementHandler.evaluate(function (el, attr) { return el.getAttribute(attr) || undefined; }, name);
    };
    return PuppeteerElementDriver;
}());
var PuppeteerPageDriver = (function () {
    function PuppeteerPageDriver(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;
    }
    PuppeteerPageDriver.prototype.getTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.title()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PuppeteerPageDriver.prototype.goto = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resovledUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resovledUrl = url;
                        if (!this.page.url() || this.page.url() === 'about:blank' || !/^([a-z][a-z0-9+\-.]*):/.test(url)) {
                            resovledUrl = (this.baseUrl || '') + url;
                        }
                        return [4, this.page.goto(resovledUrl)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerPageDriver.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.close()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerPageDriver.prototype.waitForNavigation = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.waitForNavigation({ timeout: timeout })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerPageDriver.prototype.getElement = function (routes) {
        return __awaiter(this, void 0, void 0, function () {
            var jsHandle, elementHandle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluateHandle(function (routesJson) {
                            var rs = JSON.parse(routesJson);
                            var element = null;
                            for (var _i = 0, rs_1 = rs; _i < rs_1.length; _i++) {
                                var route = rs_1[_i];
                                var name_1 = route.name, selector = route.selector, xpath = route.xpath;
                                if (selector) {
                                    element = (element || document).querySelector(selector);
                                }
                                if (xpath) {
                                    element = document.evaluate(xpath, element || document).iterateNext();
                                }
                                if (!selector && !xpath) {
                                    element = document.evaluate("(.//*[normalize-space()='" + name_1 + "'])[last()]", element || document).iterateNext();
                                }
                                if (!element) {
                                    break;
                                }
                            }
                            return element;
                        }, JSON.stringify(routes))];
                    case 1:
                        jsHandle = _a.sent();
                        elementHandle = jsHandle.asElement() || undefined;
                        return [2, elementHandle && new PuppeteerElementDriver(elementHandle)];
                }
            });
        });
    };
    PuppeteerPageDriver.prototype.onNavigated = function (listener) {
        this.page.on('framenavigated', function (frame) {
            var url = frame.url();
            listener(url);
        });
    };
    return PuppeteerPageDriver;
}());
var PuppeteerBrowserDriver = (function () {
    function PuppeteerBrowserDriver() {
    }
    PuppeteerBrowserDriver.prototype.launch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.options = options;
                        _a = this;
                        return [4, puppeteer_core_1.default.launch(__assign({ defaultViewport: options === null || options === void 0 ? void 0 : options.viewport }, options))];
                    case 1:
                        _a.browser = _b.sent();
                        return [2];
                }
            });
        });
    };
    PuppeteerBrowserDriver.prototype.shotdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.browser) return [3, 2];
                        return [4, this.browser.close()];
                    case 1:
                        _a.sent();
                        this.browser = undefined;
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    PuppeteerBrowserDriver.prototype.newPage = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var pages, page, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.browser) {
                            throw new Error('Browser has not been launched.');
                        }
                        return [4, this.browser.pages()];
                    case 1:
                        pages = _d.sent();
                        _c = pages.find(function (p) { return !p.url() || p.url() === 'about:blank'; });
                        if (_c) return [3, 3];
                        return [4, this.browser.newPage()];
                    case 2:
                        _c = (_d.sent());
                        _d.label = 3;
                    case 3:
                        page = _c;
                        if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.timeout) !== undefined) {
                            page.setDefaultTimeout(this.options.timeout);
                        }
                        return [2, new PuppeteerPageDriver(page, (_b = this.options) === null || _b === void 0 ? void 0 : _b.baseUrl)];
                }
            });
        });
    };
    return PuppeteerBrowserDriver;
}());
exports.PuppeteerBrowserDriver = PuppeteerBrowserDriver;
