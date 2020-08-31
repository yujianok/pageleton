import xml2js from 'xml2js';
import { PageletonPage } from "./PageletonPage";
import path from 'path';
import { pageComponentTypeRegistry, PageComponent } from '../component';
import { FileUtils } from '../uitl';
import { BrowserDriver, BrowserDriverType } from '../driver';
import { browserDriverFactory } from '../driver/BrowserDriverFactory';
import { AbstractComponent } from '../component/AbstractComponent';

async function parseXmlToJson(data: string): Promise<any> {
    return new Promise((resovle, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false, trim: false });
        parser.parseString(data, function (err: any, result: any) {
            if (err) {
                reject(err);
            } else {
                resovle(result);
            }
        });
    });
}

export class PageletonPageLoader {

    readonly specEncoding: string;
    readonly driver: BrowserDriver;

    constructor(driverType?: BrowserDriverType, specEncoding?: string) {
        this.driver = browserDriverFactory.getBrowserDriver(driverType);
        this.specEncoding = specEncoding || 'utf8';
    }

    private async parseIncludeComponent(inculdePath: string, parent?: PageComponent): Promise<PageComponent[]> {
        const specContent = await FileUtils.readFileAsString(inculdePath, this.specEncoding);
        const json = await parseXmlToJson(specContent);
        return await this.parsePageComponent(inculdePath, json, parent);
    }

    private async parsePageComponent(specPath: string, json: any, parent?: PageComponent): Promise<PageComponent[]> {
        let parsedComponents: PageComponent[] = [];

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const nodes = Array.isArray(json[key]) ? json[key] : [json[key]];
                await Promise.all(nodes.map(async (node: any) => {
                    if (key === "Include") {
                        const include = node as { $: { path: string } };
                        const inculdePath = path.join(specPath, '../', include.$.path);
                        const components = await this.parseIncludeComponent(inculdePath, parent);
                        parsedComponents = [...parsedComponents, ...components];
                    } else {
                        const ComponentType = pageComponentTypeRegistry.getComponentType(key);
                        if (!ComponentType) {
                            throw new Error('组件类型不存在:' + key);
                        }

                        const { $, ...others } = node;
                        const multiple = parseInt($.multiple || '1');
                        const components = await Promise.all(
                            new Array(multiple).fill(undefined).map(async (v, i) => {
                                const index = i + 1;
                                const component = new ComponentType({
                                    name: $.name.replace(/{index}/g, index),
                                    driver: this.driver,
                                    selector: $.selector.replace(/{index}/g, index),
                                    index,
                                    parent,
                                    children: [],
                                }) as AbstractComponent;

                                const children = await this.parsePageComponent(specPath, others, parent);
                                component.pushChildComponents(...children);
                                return component;
                            }))

                        parsedComponents = [...parsedComponents, ...components];
                    }
                }));
            }
        }

        return parsedComponents;
    }

    public async loadPageSpec(specPath: string): Promise<PageletonPage> {
        const specContent = await FileUtils.readFileAsString(specPath, this.specEncoding);

        const json = await parseXmlToJson(specContent);
        const { $, ...others } = json.Page;

        const rootComponents = await this.parsePageComponent(specPath, others);
        return new PageletonPage($.name, $.path, rootComponents);
    }

}