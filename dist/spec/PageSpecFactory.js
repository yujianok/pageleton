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
var FileService_1 = require("../service/FileService");
var PageSpecLoader_1 = __importDefault(require("./PageSpecLoader"));
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
                        return [4, FileService_1.getAllFiles(specPath)];
                    case 2:
                        files = _c.sent();
                        return [4, Promise.all(files.map(function (file) { return PageSpecLoader_1.default.loadPageSpec(file, instance.specEncoding); }))];
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
exports.default = PageSpecFactory;
//# sourceMappingURL=PageSpecFactory.js.map