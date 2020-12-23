import { AbstractComponent } from "./AbstractComponent";
declare class Input extends AbstractComponent {
    getValue(): Promise<string>;
    setValue(value: string): Promise<void>;
}
declare class Table extends AbstractComponent {
    getValue(): Promise<{
        headers: string | never[];
        rows: string[][];
    }>;
}
declare class TableHeader extends AbstractComponent {
    getValue(): Promise<string[]>;
}
declare class TableRow extends AbstractComponent {
    getValue(): Promise<string[][]>;
}
declare class TableField extends AbstractComponent {
    getValue(): Promise<string | undefined>;
}
declare class Form extends AbstractComponent {
    getValue(): Promise<{
        [x: string]: any;
    } | undefined>;
    setValue(value: {
        [fieldName: string]: string;
    }): Promise<void>;
}
declare class FormField extends AbstractComponent {
    getValue(): Promise<any>;
    getLabel(): Promise<string | undefined>;
    setValue(value: string): Promise<void>;
}
declare class FieldLabel extends AbstractComponent {
}
declare class FieldInput extends AbstractComponent {
    getValue(): Promise<string | undefined>;
    setValue(value: string): Promise<void>;
}
export declare const BuildInComponents: {
    Input: typeof Input;
    Table: typeof Table;
    TableRow: typeof TableRow;
    TableHeader: typeof TableHeader;
    TableField: typeof TableField;
    Form: typeof Form;
    FormField: typeof FormField;
    FieldLabel: typeof FieldLabel;
    FieldInput: typeof FieldInput;
};
export {};
