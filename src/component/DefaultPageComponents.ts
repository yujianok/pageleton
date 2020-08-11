import { AbstractComponent } from "./AbstractComponent";
import { pageComponentTypeRegistry } from "./PageComponentTypeRegistry";

type TableData = {
    headers: string[];
    rows: any[][];
}

class Table extends AbstractComponent {
    public async getValue(): Promise<TableData> {
        const heads = await this.getSubComponentOfType(TableHead);
        const rows = await this.getSubComponentOfType(TableRow);

        const headerValues = await Promise.all(heads.map(head => head.getValue()));
        const rowValues = await Promise.all(rows.map(row => row.getValue()));

        return {
            headers: headerValues,
            rows: rowValues,
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHead extends AbstractComponent {
    public async getValue() {
        const componentEl = await this.getComponentEl();
        return await componentEl.getText();
    }
}
pageComponentTypeRegistry.registerComponentType(TableHead);

class TableRow extends AbstractComponent {
    public async getValue() {
        const cells = await this.getSubComponentOfType(TableField);
        return Promise.all(cells.map(cell => cell.getValue()));
    }
}
pageComponentTypeRegistry.registerComponentType(TableRow);

class TableField extends AbstractComponent {
    public async getValue() {
        const componentEl = await this.getComponentEl();
        return await componentEl.getText();
    }
}
pageComponentTypeRegistry.registerComponentType(TableField);

class Input extends AbstractComponent {
    public async setValue(text: string) {
        const componentEl = await this.getComponentEl();
        const values = await componentEl.getValue();
        await componentEl.setValue(values.replace(/./g, '\uE003') + text);
    }

    public async getValue() {
        const componentEl = await this.getComponentEl();
        return await componentEl.getValue();
    }
}
pageComponentTypeRegistry.registerComponentType(Input);



class Dialog extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(Dialog);

class Content extends AbstractComponent {
    public async getValue(): Promise<any> {
        const componentEl = await this.getComponentEl();
        return await componentEl.getText();
    };
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



