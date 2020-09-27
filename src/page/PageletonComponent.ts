import { PageComponent, pageComponentTypeRegistry } from "../component";
import { ElementDriver, PageDriver } from "../driver";
import { getElementRoutes } from "../service/ComponentSpecService";
import { ComponentSpec } from "../spec";

type ComponentCommand = (pageComponent: PageComponent, elementDriver: ElementDriver, pageDriver: PageDriver) => Promise<any>

export class PageletonComponent {
    private readonly componentSpec: ComponentSpec;
    private readonly pageDriver: PageDriver;

    constructor(componentSpec: ComponentSpec, pageDriver: PageDriver) {
        this.componentSpec = componentSpec;
        this.pageDriver = pageDriver;
    }

    async getValue(): Promise<any> {
        return await this.execute((pageComponent, elementDriver, pageDriver) => pageComponent.getValue(elementDriver, pageDriver, this.componentSpec));
    }

    async setValue(value: string): Promise<void> {
        return await this.execute((pageComponent, elementDriver, pageDriver) => pageComponent.setValue(value, elementDriver, pageDriver, this.componentSpec));
    }

    async click(): Promise<void> {
        return await this.execute((pageComponent, elementDriver, pageDriver) => pageComponent.click(elementDriver, pageDriver, this.componentSpec));
    }

    async isPresent(): Promise<boolean> {
        const pageComponent = pageComponentTypeRegistry.getComponentByType(this.componentSpec.type);
        const elementRoutes = getElementRoutes(this.componentSpec);
        const elementDriver = await this.pageDriver.getElement(elementRoutes);

        return elementDriver ?  await pageComponent.isPresent(elementDriver, this.pageDriver, this.componentSpec) : false;
    }

    async getAttribute(name: string): Promise<string> {
        return await this.execute((pageComponent, elementDriver, pageDriver) => pageComponent.getAttribute(name, elementDriver, pageDriver, this.componentSpec));
    }

    async getText(): Promise<string> {
        return await this.execute((pageComponent, elementDriver, pageDriver) => pageComponent.getText(elementDriver, pageDriver, this.componentSpec));
    }

    private async execute(command: ComponentCommand) {
        const pageComponent = pageComponentTypeRegistry.getComponentByType(this.componentSpec.type);
        const elementRoutes = getElementRoutes(this.componentSpec);
        const elementDriver = await this.pageDriver.getElement(elementRoutes);

        if (!elementDriver) {
            throw new Error('Can not locate element by component:' + elementRoutes.map(er => er.name).join('>'));
        }

        return await command(pageComponent, elementDriver, this.pageDriver);
    }


}
