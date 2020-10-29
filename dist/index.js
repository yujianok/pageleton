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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("driver/ElementDriver", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("driver/PageDriver", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("driver/BrowserDriver", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("driver/PuppeteerBrowserDriver", ["require", "exports", "puppeteer-core"], function (require, exports, puppeteer_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PuppeteerBrowserDriver = void 0;
    puppeteer_core_1 = __importDefault(puppeteer_core_1);
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
        PuppeteerPageDriver.prototype.waitForNavigation = function (waitUntil, timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.page.waitForNavigation({ timeout: timeout || 0, waitUntil: waitUntil })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        PuppeteerPageDriver.prototype.getScreenShot = function (path, fullPage) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.page.screenshot({ path: path, fullPage: fullPage })];
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
        PuppeteerPageDriver.prototype.checkComponents = function (rootNodes) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.page.evaluate(function (rootNodesJson) {
                                var rootNodes = JSON.parse(rootNodesJson);
                                var indicatorEls = [];
                                function identifyComponents() {
                                    var _a;
                                    var tempQueue = [];
                                    tempQueue.push.apply(tempQueue, rootNodes.map(function (node) { return ({ node: node, zIndex: 100 }); }));
                                    var current = tempQueue.pop();
                                    var _loop_1 = function () {
                                        var currentNode = current.node;
                                        var name_2 = currentNode.name, selector = currentNode.selector, xpath = currentNode.xpath, children = currentNode.children;
                                        var element = current.parent || null;
                                        if (selector) {
                                            element = (element || document).querySelector(selector);
                                        }
                                        if (xpath) {
                                            element = document.evaluate(xpath, element || document).iterateNext();
                                        }
                                        if (!selector && !xpath) {
                                            element = document.evaluate("(.//*[normalize-space()='" + name_2 + "'])[last()]", element || document).iterateNext();
                                        }
                                        if (element) {
                                            var ancestor = document.createElement('span');
                                            ancestor.setAttribute('style', "position: relative;height: 0px;width: 0px;z-index: " + current.zIndex + ";");
                                            (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.append(ancestor);
                                            var elRect = element.getBoundingClientRect();
                                            var actRect = ancestor.getBoundingClientRect();
                                            var cover_1 = document.createElement('div');
                                            cover_1.textContent = name_2;
                                            var coverStyle_1 = "position: absolute;\n                                        opacity: 0;\n                                        top: 0px;\n                                        top: " + (elRect.top - actRect.top) + "px;\n                                        left: " + (elRect.left - actRect.left) + "px;\n                                        height: " + elRect.height + "px;\n                                        width: " + elRect.width + "px;\n                                        z-index: " + current.zIndex + ";\n                                        border: solid 1px red;\n                                        color: red;\n                                        overflow: visible;\n                                        background-color: white;";
                                            cover_1.setAttribute('style', coverStyle_1);
                                            cover_1.addEventListener('mouseover', function () {
                                                cover_1.setAttribute('style', coverStyle_1 + 'opacity: 0.8;');
                                            });
                                            cover_1.addEventListener('mouseleave', function () {
                                                cover_1.setAttribute('style', coverStyle_1);
                                            });
                                            ancestor.append(cover_1);
                                            indicatorEls.push(ancestor);
                                            tempQueue.push.apply(tempQueue, children.map(function (node) { return ({ node: node, parent: element || undefined, zIndex: current.zIndex + 100 }); }));
                                        }
                                        current = tempQueue.pop();
                                    };
                                    while (current) {
                                        _loop_1();
                                    }
                                }
                                ;
                                identifyComponents();
                                return new Promise(function (resolve) {
                                    var checkPannel = document.createElement('div');
                                    checkPannel.setAttribute('style', 'position: fixed;bottom: 4px;left: 4px;z-index: 9999;border: solid 1px');
                                    var identifyButton = document.createElement('button');
                                    identifyButton.setAttribute('style', 'margin: 4px;height: 30px;width: 100px');
                                    identifyButton.innerHTML = 'Reidentify';
                                    identifyButton.addEventListener('click', function () {
                                        indicatorEls.forEach(function (el) { return el.remove(); });
                                        identifyComponents();
                                    });
                                    checkPannel.appendChild(identifyButton);
                                    var matchButton = document.createElement('button');
                                    matchButton.setAttribute('style', 'margin: 4px;height: 30px;width: 80px');
                                    matchButton.innerHTML = 'Match';
                                    matchButton.addEventListener('click', function () {
                                        indicatorEls.forEach(function (el) { return el.remove(); });
                                        resolve(true);
                                    });
                                    checkPannel.appendChild(matchButton);
                                    var notMatchButton = document.createElement('button');
                                    notMatchButton.setAttribute('style', 'margin: 4px;height: 30px;width: 120px;');
                                    notMatchButton.innerHTML = 'Miss Match';
                                    notMatchButton.addEventListener('click', function () {
                                        indicatorEls.forEach(function (el) { return el.remove(); });
                                        resolve(false);
                                    });
                                    checkPannel.appendChild(notMatchButton);
                                    document.body.append(checkPannel);
                                });
                            }, JSON.stringify(rootNodes))];
                        case 1:
                            result = _a.sent();
                            return [2, result];
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
                var page;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.browser) {
                                throw new Error('Browser has not been launched.');
                            }
                            return [4, this.browser.newPage()];
                        case 1:
                            page = _c.sent();
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
});
define("driver/BrowserDriverFactory", ["require", "exports", "driver/PuppeteerBrowserDriver"], function (require, exports, PuppeteerBrowserDriver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BrowserDriverFactory = (function () {
        function BrowserDriverFactory() {
            this.browserMap = {
                'puppeteer': PuppeteerBrowserDriver_1.PuppeteerBrowserDriver,
            };
        }
        BrowserDriverFactory.prototype.getBrowserDriver = function (driverType) {
            if (driverType) {
                return new (this.browserMap[driverType])();
            }
            else if (this.customBrowserDriver) {
                return new this.customBrowserDriver();
            }
            else {
                return new PuppeteerBrowserDriver_1.PuppeteerBrowserDriver();
            }
        };
        BrowserDriverFactory.prototype.setCustomBrowserDriver = function (browserDriverType) {
            this.customBrowserDriver = browserDriverType;
        };
        return BrowserDriverFactory;
    }());
    exports.default = new BrowserDriverFactory();
});
define("driver/index", ["require", "exports", "driver/BrowserDriver", "driver/BrowserDriverFactory", "driver/PageDriver", "driver/ElementDriver"], function (require, exports, BrowserDriver_1, BrowserDriverFactory_1, PageDriver_1, ElementDriver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(BrowserDriver_1, exports);
    __exportStar(BrowserDriverFactory_1, exports);
    __exportStar(PageDriver_1, exports);
    __exportStar(ElementDriver_1, exports);
});
define("service/FileService", ["require", "exports", "fs", "glob"], function (require, exports, fs_1, glob_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs_1 = __importDefault(fs_1);
    glob_1 = __importDefault(glob_1);
    function getAllFiles(filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        glob_1.default(filePath, function (err, files) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(files);
                            }
                        });
                    })];
            });
        });
    }
    function readFileAsString(filePath, encoding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        fs_1.default.readFile(filePath, encoding, function (err, content) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(content);
                            }
                        });
                    })];
            });
        });
    }
    exports.default = { getAllFiles: getAllFiles, readFileAsString: readFileAsString };
});
define("spec/PageSpecLoader", ["require", "exports", "path", "xml2js", "service/FileService"], function (require, exports, path_1, xml2js_1, FileService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pageSpecLoader = void 0;
    path_1 = __importDefault(path_1);
    xml2js_1 = __importDefault(xml2js_1);
    FileService_1 = __importDefault(FileService_1);
    var getComponent = function () {
        var routes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routes[_i] = arguments[_i];
        }
        var current;
        var children = this.rootComponents;
        var _loop_2 = function (route) {
            current = children.find(function (c) { return c.name === route; });
            if (!current) {
                throw new Error('Component can not be found, path:' + routes.join('>'));
            }
            children = current.children;
        };
        for (var _a = 0, routes_1 = routes; _a < routes_1.length; _a++) {
            var route = routes_1[_a];
            _loop_2(route);
        }
        return current;
    };
    function parseXmlToJson(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resovle, reject) {
                        var parser = new xml2js_1.default.Parser({ explicitArray: false, trim: false });
                        parser.parseString(data, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resovle(result);
                            }
                        });
                    })];
            });
        });
    }
    var PageSpecLoader = (function () {
        function PageSpecLoader() {
        }
        PageSpecLoader.prototype.parseIncludeComponent = function (inculdePath, specEncoding, parent) {
            return __awaiter(this, void 0, void 0, function () {
                var specContent, json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, FileService_1.default.readFileAsString(inculdePath, specEncoding)];
                        case 1:
                            specContent = _a.sent();
                            return [4, parseXmlToJson(specContent)];
                        case 2:
                            json = _a.sent();
                            return [4, this.parsePageComponent(inculdePath, specEncoding, json, parent)];
                        case 3: return [2, _a.sent()];
                    }
                });
            });
        };
        PageSpecLoader.prototype.parsePageComponent = function (specPath, specEncoding, json, parent) {
            return __awaiter(this, void 0, void 0, function () {
                var parsedComponents, _loop_3, _a, _b, _i, key;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            parsedComponents = [];
                            _loop_3 = function (key) {
                                var nodes;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!json.hasOwnProperty(key)) return [3, 2];
                                            nodes = Array.isArray(json[key]) ? json[key] : [json[key]];
                                            return [4, Promise.all(nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                                                    var include, inculdePath, components, $_1, others_1, multiple, components;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(key === "Include")) return [3, 2];
                                                                include = node;
                                                                inculdePath = path_1.default.join(specPath, '../', include.$.path);
                                                                return [4, this.parseIncludeComponent(inculdePath, specEncoding, parent)];
                                                            case 1:
                                                                components = _a.sent();
                                                                parsedComponents = __spreadArrays(parsedComponents, components);
                                                                return [3, 4];
                                                            case 2:
                                                                $_1 = node.$, others_1 = __rest(node, ["$"]);
                                                                multiple = parseInt($_1.multiple || '1');
                                                                return [4, Promise.all(new Array(multiple).fill(undefined).map(function (v, i) { return __awaiter(_this, void 0, void 0, function () {
                                                                        var index, component, _a;
                                                                        return __generator(this, function (_b) {
                                                                            switch (_b.label) {
                                                                                case 0:
                                                                                    index = i + 1;
                                                                                    component = {
                                                                                        name: $_1.name && $_1.name.replace(/{index}/g, index),
                                                                                        selector: $_1.selector && $_1.selector.replace(/{index}/g, index),
                                                                                        xpath: $_1.xpath && $_1.xpath.replace(/{index}/g, index),
                                                                                        parent: parent,
                                                                                        children: [],
                                                                                        type: key,
                                                                                    };
                                                                                    _a = component;
                                                                                    return [4, this.parsePageComponent(specPath, specEncoding, others_1, component)];
                                                                                case 1:
                                                                                    _a.children = _b.sent();
                                                                                    return [2, component];
                                                                            }
                                                                        });
                                                                    }); }))];
                                                            case 3:
                                                                components = _a.sent();
                                                                parsedComponents = __spreadArrays(parsedComponents, components);
                                                                _a.label = 4;
                                                            case 4: return [2];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2];
                                    }
                                });
                            };
                            _a = [];
                            for (_b in json)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            key = _a[_i];
                            return [5, _loop_3(key)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2, parsedComponents];
                    }
                });
            });
        };
        PageSpecLoader.prototype.loadPageSpec = function (specPath, specEncoding) {
            return __awaiter(this, void 0, void 0, function () {
                var specContent, json, _a, $, others, rootComponents;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, FileService_1.default.readFileAsString(specPath, specEncoding)];
                        case 1:
                            specContent = _b.sent();
                            return [4, parseXmlToJson(specContent)];
                        case 2:
                            json = _b.sent();
                            _a = json.Page, $ = _a.$, others = __rest(_a, ["$"]);
                            return [4, this.parsePageComponent(specPath, specEncoding, others)];
                        case 3:
                            rootComponents = _b.sent();
                            return [2, { name: $.name, url: $.url, rootComponents: rootComponents, getComponent: getComponent }];
                    }
                });
            });
        };
        return PageSpecLoader;
    }());
    exports.pageSpecLoader = new PageSpecLoader();
});
define("spec/PageSpecFactory", ["require", "exports", "service/FileService", "spec/PageSpecLoader"], function (require, exports, FileService_2, PageSpecLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageSpecFactory = void 0;
    FileService_2 = __importDefault(FileService_2);
    var PageSpecFactory = (function () {
        function PageSpecFactory(specPaths, specEncoding) {
            this.specPaths = specPaths;
            this.specEncoding = specEncoding || 'UTF-8';
            this.pages = [];
        }
        PageSpecFactory.init = function (specPaths, specEncoding) {
            return __awaiter(this, void 0, void 0, function () {
                var instance, _i, _a, specPath, files, pages;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            instance = new PageSpecFactory(specPaths, specEncoding);
                            _i = 0, _a = instance.specPaths;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 5];
                            specPath = _a[_i];
                            return [4, FileService_2.default.getAllFiles(specPath)];
                        case 2:
                            files = _c.sent();
                            return [4, Promise.all(files.map(function (file) { return PageSpecLoader_1.pageSpecLoader.loadPageSpec(file, instance.specEncoding); }))];
                        case 3:
                            pages = _c.sent();
                            (_b = instance.pages).push.apply(_b, pages);
                            _c.label = 4;
                        case 4:
                            _i++;
                            return [3, 1];
                        case 5: return [2, instance];
                    }
                });
            });
        };
        PageSpecFactory.prototype.getPageByName = function (name) {
            return this.pages.find(function (page) { return page.name === name; });
        };
        PageSpecFactory.prototype.getPageByUrl = function (url) {
            return this.pages.find(function (page) {
                var pageUrl = url.split('?')[0];
                var pageSpecPath = page.url.split('?')[0];
                return pageUrl.endsWith(pageSpecPath);
            });
        };
        return PageSpecFactory;
    }());
    exports.PageSpecFactory = PageSpecFactory;
});
define("spec/index", ["require", "exports", "spec/PageSpecFactory"], function (require, exports, PageSpecFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "PageSpecFactory", { enumerable: true, get: function () { return PageSpecFactory_1.PageSpecFactory; } });
});
define("component/PageComponent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("component/PageComponentTypeRegistry", ["require", "exports"], function (require, exports) {
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
});
define("service/ComponentSpecService", ["require", "exports"], function (require, exports) {
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
});
define("component/AbstractComponent", ["require", "exports", "component/PageComponentTypeRegistry", "service/ComponentSpecService"], function (require, exports, PageComponentTypeRegistry_1, ComponentSpecService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractComponent = void 0;
    PageComponentTypeRegistry_1 = __importDefault(PageComponentTypeRegistry_1);
    ComponentSpecService_1 = __importDefault(ComponentSpecService_1);
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
                var interval, forever, vestige, _loop_4, this_1, state_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            interval = 1000;
                            forever = timeout <= 0;
                            vestige = forever ? interval : timeout;
                            _loop_4 = function () {
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
                            return [5, _loop_4()];
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
});
define("component/DefaultPageComponents", ["require", "exports", "component/AbstractComponent", "component/PageComponentTypeRegistry"], function (require, exports, AbstractComponent_1, PageComponentTypeRegistry_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PageComponentTypeRegistry_2 = __importDefault(PageComponentTypeRegistry_2);
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Component;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(Component);
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Input.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var element;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getElementDriver()];
                        case 1:
                            element = _a.sent();
                            return [4, element.getValue()];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        Input.prototype.setValue = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var element;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getElementDriver()];
                        case 1:
                            element = _a.sent();
                            return [4, element.setValue(value)];
                        case 2:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        return Input;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(Input);
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Table.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var headerValues, rowValues;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Promise.all(this.getSubComponents(TableHeader).map(function (header) { return header.getValue(); }))];
                        case 1:
                            headerValues = _a.sent();
                            return [4, Promise.all(this.getSubComponents(TableRow).map(function (row) { return row.getValue(); }))];
                        case 2:
                            rowValues = _a.sent();
                            return [2, {
                                    headers: headerValues[0] || [],
                                    rows: rowValues.filter(function (r) { return r && r.length; }),
                                }];
                    }
                });
            });
        };
        return Table;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(Table);
    var TableHeader = (function (_super) {
        __extends(TableHeader, _super);
        function TableHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TableHeader.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cellValues;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Promise.all(this.getSubComponents(TableField).map(function (cell) { return cell.getValue(); }))];
                        case 1:
                            cellValues = _a.sent();
                            return [2, cellValues.filter(function (c) { return c !== undefined; })];
                    }
                });
            });
        };
        return TableHeader;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(TableHeader);
    var TableRow = (function (_super) {
        __extends(TableRow, _super);
        function TableRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TableRow.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cellValues;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Promise.all(this.getSubComponents(TableField).map(function (cell) { return cell.getValue(); }))];
                        case 1:
                            cellValues = _a.sent();
                            return [2, cellValues.filter(function (c) { return c !== undefined; })];
                    }
                });
            });
        };
        return TableRow;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(TableRow);
    var TableField = (function (_super) {
        __extends(TableField, _super);
        function TableField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TableField.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var element, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this.getElementDriver(true)];
                        case 1:
                            element = _b.sent();
                            _a = element;
                            if (!_a) return [3, 3];
                            return [4, element.getInnerText()];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3: return [2, _a];
                    }
                });
            });
        };
        return TableField;
    }(AbstractComponent_1.AbstractComponent));
    PageComponentTypeRegistry_2.default.registerComponentType(TableField);
});
define("component/index", ["require", "exports", "component/PageComponent", "component/AbstractComponent", "component/DefaultPageComponents"], function (require, exports, PageComponent_1, AbstractComponent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(PageComponent_1, exports);
    __exportStar(AbstractComponent_2, exports);
});
define("page/PageletonPage", ["require", "exports", "component/PageComponentTypeRegistry", "service/ComponentSpecService"], function (require, exports, PageComponentTypeRegistry_3, ComponentSpecService_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageletonPage = void 0;
    PageComponentTypeRegistry_3 = __importDefault(PageComponentTypeRegistry_3);
    ComponentSpecService_2 = __importDefault(ComponentSpecService_2);
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
            var PageComponentType = PageComponentTypeRegistry_3.default.getComponentType(componentSpec.type);
            return new PageComponentType(this.pageDriver, componentSpec);
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
        PageletonPage.prototype.waitForNavigation = function (waitUntil, timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.pageDriver.waitForNavigation(waitUntil, timeout)];
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
                            rootComponents = ComponentSpecService_2.default.getRootElementNodes(this.currentPage.rootComponents);
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
});
define("page/PageletonBrowser", ["require", "exports", "page/PageletonPage"], function (require, exports, PageletonPage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageletonBrowser = void 0;
    var PageletonBrowser = (function () {
        function PageletonBrowser(browserDriver, pageSpecFactory) {
            this.browserDriver = browserDriver;
            this.pageSpecFactory = pageSpecFactory;
        }
        PageletonBrowser.prototype.newPage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var page;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.browserDriver.newPage()];
                        case 1:
                            page = _a.sent();
                            return [2, new PageletonPage_1.PageletonPage(page, this.pageSpecFactory)];
                    }
                });
            });
        };
        PageletonBrowser.prototype.shutdown = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.browserDriver.shotdown()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        return PageletonBrowser;
    }());
    exports.PageletonBrowser = PageletonBrowser;
});
define("page/index", ["require", "exports", "page/PageletonBrowser", "page/PageletonPage"], function (require, exports, PageletonBrowser_1, PageletonPage_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(PageletonBrowser_1, exports);
    __exportStar(PageletonPage_2, exports);
});
define("index", ["require", "exports", "page/index", "spec/index", "component/PageComponentTypeRegistry", "driver/BrowserDriverFactory", "component/index", "page/index"], function (require, exports, page_1, spec_1, PageComponentTypeRegistry_4, BrowserDriverFactory_2, component_1, page_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pageleton = void 0;
    PageComponentTypeRegistry_4 = __importDefault(PageComponentTypeRegistry_4);
    BrowserDriverFactory_2 = __importDefault(BrowserDriverFactory_2);
    Object.defineProperty(exports, "AbstractComponent", { enumerable: true, get: function () { return component_1.AbstractComponent; } });
    Object.defineProperty(exports, "PageletonBrowser", { enumerable: true, get: function () { return page_2.PageletonBrowser; } });
    Object.defineProperty(exports, "PageletonPage", { enumerable: true, get: function () { return page_2.PageletonPage; } });
    var DEFAULT_PAGE_SPEC_PATHS = ['./pages/*.xml'];
    exports.Pageleton = function (config) {
        if (config.customComponentTypes) {
            config.customComponentTypes.forEach(function (cst) { return PageComponentTypeRegistry_4.default.registerComponentType(cst); });
        }
        return {
            launchBrowser: function () { return __awaiter(void 0, void 0, void 0, function () {
                var pageletonPageFactory, browserDriver;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, spec_1.PageSpecFactory.init(config.specPaths || DEFAULT_PAGE_SPEC_PATHS, config.specEncoding)];
                        case 1:
                            pageletonPageFactory = _a.sent();
                            browserDriver = BrowserDriverFactory_2.default.getBrowserDriver(config.driverType);
                            return [4, browserDriver.launch(config)];
                        case 2:
                            _a.sent();
                            return [2, new page_1.PageletonBrowser(browserDriver, pageletonPageFactory)];
                    }
                });
            }); }
        };
    };
});
//# sourceMappingURL=index.js.map