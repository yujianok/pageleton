
export interface PageComponent {
    readonly name: string;
    readonly selector: string;
    readonly parent?: PageComponent;
    readonly children: readonly PageComponent[];
    readonly index: number;

    setValue(value: string): Promise<void>;
    getValue(): Promise<any>;
}