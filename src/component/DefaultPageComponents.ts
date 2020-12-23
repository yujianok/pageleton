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

class Table extends AbstractComponent {
    public async getValue() {
        const headerValues: string[] = await Promise.all(this.getSubComponents(TableHeader).map(header => header.getValue()));
        const rowValues: string[][] = await Promise.all(this.getSubComponents(TableRow).map(row => row.getValue()));

        return {
            headers: headerValues[0] || [],
            rows: rowValues.filter(r => r && r.length),
        };
    }
}
pageComponentTypeRegistry.registerComponentType(Table);

class TableHeader extends AbstractComponent {
    public async getValue() {
        const cellValues: string[] = await Promise.all(this.getSubComponents(TableField).map(cell => cell.getValue()));
        return cellValues.filter(c => c !== undefined);
    }
}
pageComponentTypeRegistry.registerComponentType(TableHeader);

class TableRow extends AbstractComponent {
    public async getValue() {
        const cellValues: string[][] = await Promise.all(this.getSubComponents(TableField).map(cell => cell.getValue()));
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

class Form extends AbstractComponent {
    public async getValue() {
        const fields = await Promise.all(this.getSubComponents(FormField).map(async field => {
            const label = await (field as FormField).getLabel();
            const value = await (field as FormField).getValue();

            return label === undefined && value === undefined ? undefined : { [label || 'unknown']: value };
        }));
        return fields.filter(field => field !== undefined).reduce((rs, field) => ({ ...rs, ...field }), {});
    }

    public async setValue(value: { [fieldName: string]: string }) {
        for (const fieldName in value) {
            const fieldValue = value[fieldName];
            const fields = this.getSubComponents(FormField) as FormField[];
            for (const field of fields) {
                const fieldLabel = await field.getLabel();
                if (fieldLabel === fieldName) {
                    await field.setValue(fieldValue);
                }
            }
        }

    }
}
pageComponentTypeRegistry.registerComponentType(Form);

class FormField extends AbstractComponent {
    public async getValue() {
        return await this.getSubComponent(FieldInput)?.getValue();
    }

    public async getLabel() {
        return await this.getSubComponent(FieldLabel)?.getText();
    }

    public async setValue(value: string) {
        await this.getSubComponent(FieldInput)?.setValue(value);
    }
}
pageComponentTypeRegistry.registerComponentType(FormField);

class FieldLabel extends AbstractComponent {

}
pageComponentTypeRegistry.registerComponentType(FieldLabel);

class FieldInput extends AbstractComponent {
    public async getValue() {
        const element = await this.getElementDriver(true);
        return element && await element.getValue();
    }

    public async setValue(value: string): Promise<void> {
        const element = await this.getElementDriver(true);
        element && await element.setValue(value);
    }
}
pageComponentTypeRegistry.registerComponentType(FieldInput);



export const BuildInComponents = {
    Input,
    Table,
    TableRow,
    TableHeader,
    TableField,
    Form,
    FormField,
    FieldLabel,
    FieldInput,
}







