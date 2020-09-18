import pageComponentTypeRegistry from "./PageComponentTypeRegistry";
import { ElementDriver, PageDriver } from "../driver";
import { ComponentSpec } from "../spec";
import { PageCompnentType, PageComponent, WaitCondition } from "./PageComponent";
import { getElementRoutes } from "../service/ComponentSpecService";

export abstract class AbstractComponent implements PageComponent {

    async setValue(value: string, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void> {
        throw new Error(`${this.constructor.name} not supports setting value`);
    }

    async getValue(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<any> {
        throw new Error(`${this.constructor.name} not supports getting value`);
    }

    async getText(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<string> {
        return await element.getInnerText();
    }

    async getAttribute(name: string, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<string | undefined> {
        return element.getAttribute(name);
    }

    async click(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void> {
        await element.click();
    }

    async mouseOver(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void> {
        await element.mouseOver();
    }

    async waitUntil(condition: WaitCondition, timeout: number, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void> {
        const interval = 1000;
        const forever = timeout <= 0;
        let vestige = forever ? interval : timeout;

        while (vestige > 0) {
            if (element && await condition(element, page, component)) {
                return;
            } else if (vestige > 0) {
                const nextInterval = vestige >= interval ? interval : vestige;
                await new Promise(res => setTimeout(res, nextInterval));
                vestige = forever ? interval : vestige - interval;
            }
        }

        throw new Error('Waiting for component to fit condition is timeout: ' + timeout);
    }

    async isPresent(element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<boolean> {
        const [width, height] = await element.getSize();
        return width > 0 && height > 0;
    }

    async waitUntilPresent(timeout: number, element: ElementDriver, page: PageDriver, component: ComponentSpec): Promise<void> {
        return await this.waitUntil((e, p, c) => this.isPresent(e, p, c), timeout, element, page, component);
    }

    protected async getSubComponentValue(component: ComponentSpec, type: PageCompnentType, page: PageDriver) {
        const subComponentSpecs = component.children.filter(c => c.type === type.name);
       
        const headerValues = await Promise.all(subComponentSpecs.map(async (subComponentSpec) => {
            const subComponent = pageComponentTypeRegistry.getComponentByType(subComponentSpec.type);
            const subElement = await page.getElement(getElementRoutes(subComponentSpec));
            return subElement && await subComponent.getValue(subElement, page, subComponentSpec);
        }));

        return headerValues;
    }

}