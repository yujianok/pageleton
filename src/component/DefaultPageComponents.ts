import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
import { AbstractComponent } from "./AbstractComponent";
import pageComponentTypeRegistry from './PageComponentTypeRegistry';

class Component extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Component);

class Input extends AbstractComponent {
    public async getValue(element: ElementDriver) {
        return await element.getValue();
    }

    public async setValue(value: string, element: ElementDriver) {
        await element.setValue(value);
    }
}
pageComponentTypeRegistry.registerComponentType(Input);

type TableData = {
    headers: string[];
    rows: any[][];
}

class Table extends AbstractComponent {
    public async getValue(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<TableData> {
        const headerValues = await this.getSubComponentValue(component, TableHeader, page);
        const rowValues = await this.getSubComponentValue(component, TableRow, page);

        return {
            headers: headerValues[0] || [],
            rows: rowValues.filter(r => r && r.length),
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue(element: ElementDriver, page: PageDriver, component: ComponentSpec) {
        const cellValues = await this.getSubComponentValue(component, TableField, page);
        return cellValues.filter(c => c !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue(element: ElementDriver, page: PageDriver, component: ComponentSpec) {
        const cellValues = await this.getSubComponentValue(component, TableField, page);
        return cellValues.filter(c => c !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {
    public async getValue(element: ElementDriver) {
        return await element.getInnerText();
    }
}
pageComponentTypeRegistry.registerComponentType(TableField);







