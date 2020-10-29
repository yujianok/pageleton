import { AbstractComponent } from "./AbstractComponent";
import pageComponentTypeRegistry from "./PageComponentTypeRegistry";

class Component extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Component);

class Input extends AbstractComponent {
    public async getValue() {
        const element = await this.getElementDriver();
        return await element!.getValue()
    }

    public async setValue(value: string) {
        const element = await this.getElementDriver();
        await element!.setValue(value);
    }
}
pageComponentTypeRegistry.registerComponentType(Input);

type TableData = {
    headers: string[];
    rows: any[][];
}

class Table extends AbstractComponent {
    public async getValue(): Promise<TableData> {
        const headerValues = await Promise.all(this.getSubComponents(TableHeader).map(header => header.getValue()));
        const rowValues = await Promise.all(this.getSubComponents(TableRow).map(row => row.getValue()));

        return {
            headers: headerValues[0] || [],
            rows: rowValues.filter(r => r && r.length),
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue() {
        const cellValues = await Promise.all(this.getSubComponents(TableField).map(cell => cell.getValue()));
        return cellValues.filter(c => c !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue() {
        const cellValues = await Promise.all(this.getSubComponents(TableField).map(cell => cell.getValue()));
        return cellValues.filter(c => c !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {
    public async getValue() {
        const element = await this.getElementDriver(true);
        return element && await element.getInnerText();
    }
}
pageComponentTypeRegistry.registerComponentType(TableField);







