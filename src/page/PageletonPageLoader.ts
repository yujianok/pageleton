import xml2js from 'xml2js';
import { PageletonPage } from "./PageletonPage";
import path from 'path';
import { pageComponentTypeRegistry, PageComponent } from '../component';
import { FileUtils } from '../uitl';

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

    readonly specEncoding: string;

    constructor(specEncoding?: string) {
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
                        const component = new ComponentType($.name, $.selector, $.dynamic === 'true', parent);
                        const children = await this.parsePageComponent(specPath, others, component);
                        component.pushChildComponent(...children);

                        parsedComponents = [...parsedComponents, component];
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
        return new PageletonPage($.name, $.path, rootComponents);;
    }

}

export const pageletonPageLoader = new PageletonPageLoader();