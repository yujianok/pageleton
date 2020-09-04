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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageletonPageLoader = void 0;
var path_1 = __importDefault(require("path"));
var xml2js_1 = __importDefault(require("xml2js"));
var component_1 = require("../component");
var uitl_1 = require("../uitl");
var PageletonPage_1 = require("./PageletonPage");
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
var PageletonPageLoader = (function () {
    function PageletonPageLoader() {
    }
    PageletonPageLoader.prototype.parseIncludeComponent = function (inculdePath, specEncoding, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var specContent, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, uitl_1.FileUtils.readFileAsString(inculdePath, specEncoding)];
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
    PageletonPageLoader.prototype.parsePageComponent = function (specPath, specEncoding, json, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedComponents, _loop_1, _a, _b, _i, key;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parsedComponents = [];
                        _loop_1 = function (key) {
                            var nodes;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!json.hasOwnProperty(key)) return [3, 2];
                                        nodes = Array.isArray(json[key]) ? json[key] : [json[key]];
                                        return [4, Promise.all(nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                                                var include, inculdePath, components, ComponentType_1, $_1, others_1, multiple, components;
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
                                                            ComponentType_1 = component_1.pageComponentTypeRegistry.getComponentType(key);
                                                            $_1 = node.$, others_1 = __rest(node, ["$"]);
                                                            multiple = parseInt($_1.multiple || '1');
                                                            return [4, Promise.all(new Array(multiple).fill(undefined).map(function (v, i) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var index, component, children;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                index = i + 1;
                                                                                component = new ComponentType_1({
                                                                                    name: $_1.name && $_1.name.replace(/{index}/g, index),
                                                                                    selector: $_1.selector && $_1.selector.replace(/{index}/g, index),
                                                                                    xpath: $_1.xpath && $_1.xpath.replace(/{index}/g, index),
                                                                                    index: index,
                                                                                    parent: parent,
                                                                                    children: [],
                                                                                });
                                                                                return [4, this.parsePageComponent(specPath, specEncoding, others_1, component)];
                                                                            case 1:
                                                                                children = _a.sent();
                                                                                component.pushChildComponents.apply(component, children);
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
                        return [5, _loop_1(key)];
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
    PageletonPageLoader.prototype.loadPageSpec = function (specPath, specEncoding) {
        return __awaiter(this, void 0, void 0, function () {
            var specContent, json, _a, $, others, rootComponents;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, uitl_1.FileUtils.readFileAsString(specPath, specEncoding)];
                    case 1:
                        specContent = _b.sent();
                        return [4, parseXmlToJson(specContent)];
                    case 2:
                        json = _b.sent();
                        _a = json.Page, $ = _a.$, others = __rest(_a, ["$"]);
                        return [4, this.parsePageComponent(specPath, specEncoding, others)];
                    case 3:
                        rootComponents = _b.sent();
                        return [2, new PageletonPage_1.PageletonPage($.name, $.url, rootComponents)];
                }
            });
        });
    };
    return PageletonPageLoader;
}());
exports.pageletonPageLoader = new PageletonPageLoader();
