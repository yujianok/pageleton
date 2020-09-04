import path from 'path';
import xml2js from 'xml2js';
import { PageComponent, pageComponentTypeRegistry } from '../component';
import { AbstractComponent } from '../component/AbstractComponent';
import { FileUtils } from '../uitl';
import { PageletonPage } from "./PageletonPage";

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

class PageletonPageLoader {

    private async parseIncludeComponent(inculdePath: string, specEncoding: string, parent?: PageComponent): Promise<PageComponent[]> {
        const specContent = await FileUtils.readFileAsString(inculdePath, specEncoding);
        const json = await parseXmlToJson(specContent);
        return await this.parsePageComponent(inculdePath, specEncoding, json, parent);
    }

    private async parsePageComponent(specPath: string, specEncoding: string, json: any, parent?: PageComponent): Promise<PageComponent[]> {
        let parsedComponents: PageComponent[] = [];

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const nodes = Array.isArray(json[key]) ? json[key] : [json[key]];
                await Promise.all(nodes.map(async (node: any) => {
                    if (key === "Include") {
                        const include = node as { $: { path: string } };
                        const inculdePath = path.join(specPath, '../', include.$.path);
                        const components = await this.parseIncludeComponent(inculdePath, specEncoding, parent);
                        parsedComponents = [...parsedComponents, ...components];
                    } else {
                        const ComponentType = pageComponentTypeRegistry.getComponentType(key);

                        const { $, ...others } = node;
                        const multiple = parseInt($.multiple || '1');
                        const components = await Promise.all(
                            new Array(multiple).fill(undefined).map(async (v, i) => {
                                const index = i + 1;
                                const component = new ComponentType({
                                    name: $.name && $.name.replace(/{index}/g, index),
                                    selector: $.selector && $.selector.replace(/{index}/g, index),
                                    xpath: $.xpath && $.xpath.replace(/{index}/g, index),
                                    index,
                                    parent,
                                    children: [],
                                }) as AbstractComponent;

                                const children = await this.parsePageComponent(specPath, specEncoding, others, component);
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

    public async loadPageSpec(specPath: string, specEncoding: string): Promise<PageletonPage> {
        const specContent = await FileUtils.readFileAsString(specPath, specEncoding);

        const json = await parseXmlToJson(specContent);
        const { $, ...others } = json.Page;

        const rootComponents = await this.parsePageComponent(specPath, specEncoding, others);
        return new PageletonPage($.name, $.url, rootComponents);
    }

}

export const pageletonPageLoader = new PageletonPageLoader();