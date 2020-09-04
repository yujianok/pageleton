import { AbstractComponent } from "./AbstractComponent";
import { pageComponentTypeRegistry } from "./PageComponentTypeRegistry";
import { PageAdapter } from "../driver";

class Component extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Component);

class Input extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        return await element?.getValue();
    }

    public async setValue(value: string, pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        await element?.setValue(value);
    }
}
pageComponentTypeRegistry.registerComponentType(Input);

type TableData = {
    headers: string[];
    rows: any[][];
}

class Table extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter): Promise<TableData> {
        const heads = this.getSubComponentOfType(TableHeader);
        const rows = this.getSubComponentOfType(TableRow);

        const headerValues = await Promise.all(heads.map(head => head.getValue(pageAdapter)));
        const rowValues = await Promise.all(rows.map(row => row.getValue(pageAdapter)));

        return {
            headers: headerValues,
            rows: rowValues.filter(r => r.length),
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const cells = this.getSubComponentOfType(TableField);
        const headers = await Promise.all(cells.map(cell => cell.getValue(pageAdapter)));
        return headers.filter(h => h !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const cells = this.getSubComponentOfType(TableField);
        const fields = await Promise.all(cells.map(cell => cell.getValue(pageAdapter)));
        return fields.filter(f => f !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        return await element?.getInnerText();
    }
}
pageComponentTypeRegistry.registerComponentType(TableField);







