"use strict";
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
var AbstractComponent_1 = require("./AbstractComponent");
var PageComponentTypeRegistry_1 = require("./PageComponentTypeRegistry");
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Component;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(Component);
var Input = (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.getValue = function (pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getComponentElement(pageAdapter)];
                    case 1:
                        element = _a.sent();
                        return [4, (element === null || element === void 0 ? void 0 : element.getValue())];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Input.prototype.setValue = function (value, pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getComponentElement(pageAdapter)];
                    case 1:
                        element = _a.sent();
                        return [4, (element === null || element === void 0 ? void 0 : element.setValue(value))];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Input;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(Input);
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.getValue = function (pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var heads, rows, headerValues, rowValues;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        heads = this.getSubComponentOfType(TableHeader);
                        rows = this.getSubComponentOfType(TableRow);
                        return [4, Promise.all(heads.map(function (head) { return head.getValue(pageAdapter); }))];
                    case 1:
                        headerValues = _a.sent();
                        return [4, Promise.all(rows.map(function (row) { return row.getValue(pageAdapter); }))];
                    case 2:
                        rowValues = _a.sent();
                        return [2, {
                                headers: headerValues,
                                rows: rowValues.filter(function (r) { return r.length; }),
                            }];
                }
            });
        });
    };
    return Table;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(Table);
var TableHeader = (function (_super) {
    __extends(TableHeader, _super);
    function TableHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableHeader.prototype.getValue = function (pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var cells, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cells = this.getSubComponentOfType(TableField);
                        return [4, Promise.all(cells.map(function (cell) { return cell.getValue(pageAdapter); }))];
                    case 1:
                        headers = _a.sent();
                        return [2, headers.filter(function (h) { return h !== undefined; })];
                }
            });
        });
    };
    return TableHeader;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(TableHeader);
var TableRow = (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableRow.prototype.getValue = function (pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var cells, fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cells = this.getSubComponentOfType(TableField);
                        return [4, Promise.all(cells.map(function (cell) { return cell.getValue(pageAdapter); }))];
                    case 1:
                        fields = _a.sent();
                        return [2, fields.filter(function (f) { return f !== undefined; })];
                }
            });
        });
    };
    return TableRow;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(TableRow);
var TableField = (function (_super) {
    __extends(TableField, _super);
    function TableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableField.prototype.getValue = function (pageAdapter) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getComponentElement(pageAdapter)];
                    case 1:
                        element = _a.sent();
                        return [4, (element === null || element === void 0 ? void 0 : element.getInnerText())];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    return TableField;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.pageComponentTypeRegistry.registerComponentType(TableField);
