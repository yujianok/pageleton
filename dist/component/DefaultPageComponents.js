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
exports.BuildInComponents = void 0;
var AbstractComponent_1 = require("./AbstractComponent");
var PageComponentTypeRegistry_1 = __importDefault(require("./PageComponentTypeRegistry"));
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Component;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.default.registerComponentType(Component);
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
PageComponentTypeRegistry_1.default.registerComponentType(Input);
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
PageComponentTypeRegistry_1.default.registerComponentType(Table);
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
PageComponentTypeRegistry_1.default.registerComponentType(TableHeader);
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
PageComponentTypeRegistry_1.default.registerComponentType(TableRow);
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
PageComponentTypeRegistry_1.default.registerComponentType(TableField);
var Form = (function (_super) {
    __extends(Form, _super);
    function Form() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Form.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fields;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(this.getSubComponents(FormField).map(function (field) { return __awaiter(_this, void 0, void 0, function () {
                            var label, value;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4, field.getLabel()];
                                    case 1:
                                        label = _b.sent();
                                        return [4, field.getValue()];
                                    case 2:
                                        value = _b.sent();
                                        return [2, label === undefined && value === undefined ? undefined : (_a = {}, _a[label || 'unknown'] = value, _a)];
                                }
                            });
                        }); }))];
                    case 1:
                        fields = _a.sent();
                        return [2, fields.filter(function (field) { return field !== undefined; }).reduce(function (rs, field) { return (__assign(__assign({}, rs), field)); }, {})];
                }
            });
        });
    };
    Form.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, fieldName, fieldValue, fields, _c, fields_1, field, fieldLabel;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = [];
                        for (_b in value)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 7];
                        fieldName = _a[_i];
                        fieldValue = value[fieldName];
                        fields = this.getSubComponents(FormField);
                        _c = 0, fields_1 = fields;
                        _d.label = 2;
                    case 2:
                        if (!(_c < fields_1.length)) return [3, 6];
                        field = fields_1[_c];
                        return [4, field.getLabel()];
                    case 3:
                        fieldLabel = _d.sent();
                        if (!(fieldLabel === fieldName)) return [3, 5];
                        return [4, field.setValue(fieldValue)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _c++;
                        return [3, 2];
                    case 6:
                        _i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    return Form;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.default.registerComponentType(Form);
var FormField = (function (_super) {
    __extends(FormField, _super);
    function FormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormField.prototype.getValue = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = this.getSubComponent(FieldInput)) === null || _a === void 0 ? void 0 : _a.getValue())];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    FormField.prototype.getLabel = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = this.getSubComponent(FieldLabel)) === null || _a === void 0 ? void 0 : _a.getText())];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    FormField.prototype.setValue = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = this.getSubComponent(FieldInput)) === null || _a === void 0 ? void 0 : _a.setValue(value))];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    return FormField;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.default.registerComponentType(FormField);
var FieldLabel = (function (_super) {
    __extends(FieldLabel, _super);
    function FieldLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldLabel;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.default.registerComponentType(FieldLabel);
var FieldInput = (function (_super) {
    __extends(FieldInput, _super);
    function FieldInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldInput.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getElementDriver(true)];
                    case 1:
                        element = _b.sent();
                        _a = element;
                        if (!_a) return [3, 3];
                        return [4, element.getValue()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3: return [2, _a];
                }
            });
        });
    };
    FieldInput.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var element, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getElementDriver(true)];
                    case 1:
                        element = _b.sent();
                        _a = element;
                        if (!_a) return [3, 3];
                        return [4, element.setValue(value)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _a;
                        return [2];
                }
            });
        });
    };
    return FieldInput;
}(AbstractComponent_1.AbstractComponent));
PageComponentTypeRegistry_1.default.registerComponentType(FieldInput);
exports.BuildInComponents = {
    Input: Input,
    Table: Table,
    TableRow: TableRow,
    TableHeader: TableHeader,
    TableField: TableField,
    Form: Form,
    FormField: FormField,
    FieldLabel: FieldLabel,
    FieldInput: FieldInput,
};
//# sourceMappingURL=DefaultPageComponents.js.map