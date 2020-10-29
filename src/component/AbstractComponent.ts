import pageComponentTypeRegistry from "./PageComponentTypeRegistry";
import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
import { PageComponent, PageComponentType, WaitCondition } from "./PageComponent";
import { getElementRoutes } from "../service/ComponentSpecService";

export abstract class AbstractComponent implements PageComponent {
    protected readonly pageDriver: PageDriver;
    protected readonly componentSpec: ComponentSpec;

    constructor(pageDriver: PageDriver, componentSpec: ComponentSpec) {
        this.pageDriver = pageDriver;
        this.componentSpec = componentSpec;
    }

    async setValue(value: string): Promise<void> {
        throw new Error(`${this.constructor.name} not supports setting value`);
    }

    async getValue(): Promise<any> {
        throw new Error(`${this.constructor.name} not supports getting value`);
    }

    async getText(): Promise<string> {
        const element = await this.getElementDriver();
        return await element!.getInnerText();
    }

    async getAttribute(name: string): Promise<string | undefined> {
        const element = await this.getElementDriver();
        return await element!.getAttribute(name);
    }

    async click(): Promise<void> {
        const element = await this.getElementDriver();
        await element!.click();
    }

    async mouseOver(): Promise<void> {
        const element = await this.getElementDriver();
        await element!.mouseOver();
    }

    async waitUntil(condition: WaitCondition, timeout: number = 0): Promise<void> {
        const interval = 1000;
        const forever = timeout <= 0;
        let vestige = forever ? interval : timeout;

        while (vestige > 0) {
            if (await condition(this)) {
                return;
            } else if (vestige > 0) {
                const nextInterval = vestige >= interval ? interval : vestige;
                await new Promise(res => setTimeout(res, nextInterval));
                vestige = forever ? interval : vestige - interval;
            }
        }

        throw new Error('Waiting for component to fit condition is timeout: ' + timeout);
    }

    async isPresent(): Promise<boolean> {
        const element = await this.getElementDriver(true);
        if (!element) {
            return false;
        }
        const [width, height] = await element.getSize();
        return width > 0 && height > 0;
    }

    async waitUntilPresent(timeout?: number): Promise<void> {
        return await this.waitUntil(async (component) => await component.isPresent(), timeout);
    }

    async waitUntilVanished(timeout?: number): Promise<void> {
        return await this.waitUntil(async (component) => !(await component.isPresent()), timeout);
    }

    protected getSubComponents(type: PageComponentType) {
        const subComponentSpecs = this.componentSpec.children.filter(c => c.type === type.name);

        const subComponents = subComponentSpecs.map((subComponentSpec) => {
            const SubComponentType = pageComponentTypeRegistry.getComponentType(subComponentSpec.type);
            return new SubComponentType(this.pageDriver, subComponentSpec);
        });

        return subComponents;
    }

    protected async getElementDriver(canBeNull?: boolean): Promise<ElementDriver | undefined> {
        const elementRoutes = getElementRoutes(this.componentSpec);
        const elementDriver = await this.pageDriver.getElement(elementRoutes);

        if (!elementDriver && !canBeNull) {
            throw new Error('Can not locate element by component:' + elementRoutes.map(er => er.name).join('>'));
        }

        return elementDriver;
    }

}