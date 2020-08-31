import { AbstractComponent } from "./AbstractComponent";
import { pageComponentTypeRegistry } from "./PageComponentTypeRegistry";

type TableData = {
    headers: string[];
    rows: any[][];
}

class Table extends AbstractComponent {
    public async getValue(): Promise<TableData> {
        const heads = this.getSubComponentOfType(TableHeader);
        const rows = this.getSubComponentOfType(TableRow);

        const headerValues = await Promise.all(heads.map(head => head.getValue()));
        const rowValues = await Promise.all(rows.map(row => row.getValue()));

        return {
            headers: headerValues,
            rows: rowValues,
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue() {
        const cells = this.getSubComponentOfType(TableField);
        return Promise.all(cells.map(cell => cell.getValue()));
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue() {
        const cells = this.getSubComponentOfType(TableField);
        return Promise.all(cells.map(cell => cell.getValue()));
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(TableField);

class Input extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Input);


class Dialog extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Dialog);

class Content extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Content);

class Menu extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Menu);

class Button extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Button);

class Toolbar extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Toolbar);



