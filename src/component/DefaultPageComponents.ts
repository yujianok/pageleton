import { AbstractComponent } from "./AbstractComponent";
import { pageComponentTypeRegistry } from "./PageComponentTypeRegistry";
import { PageAdapter } from "../driver";

class Component extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        return await element?.getInnerText();
    }
}
pageComponentTypeRegistry.registerComponentType(Component);

class Input extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        return await element?.getInputValue();
    }

    public async setValue(value: string, pageAdapter: PageAdapter) {
        const element = await this.getComponentElement(pageAdapter);
        await element?.setInputValue(value);
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
            rows: rowValues,
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const cells = this.getSubComponentOfType(TableField);
        return Promise.all(cells.map(cell => cell.getValue(pageAdapter)));
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue(pageAdapter: PageAdapter) {
        const cells = this.getSubComponentOfType(TableField);
        return Promise.all(cells.map(cell => cell.getValue(pageAdapter)));
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(TableField);







