import path from 'path';
import xml2js from 'xml2js';
import { readFileAsString } from '../service';

export type PageSpec = {
    readonly name: string;
    readonly url: string;
    readonly rootComponents: ComponentSpec[];
    readonly getComponent: (routes: string[]) => ComponentSpec;
}

const getComponent = function (this: PageSpec, routes: string[]) {
    let current: ComponentSpec | undefined
    let children: readonly ComponentSpec[] = this.rootComponents;

    for (const route of routes) {
        current = children.find(c => c.name === route);
        if (!current) {
            throw new Error('Component can not be found, path:' + routes.join('>'));
        }
        children = current.children;
    }

    return current!;
}

export type ComponentSpec = {
    readonly name: string;
    readonly selector?: string;
    readonly xpath?: string;
    readonly parent?: ComponentSpec;
    readonly children: readonly ComponentSpec[];
    readonly type: string;
}

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

class PageSpecLoader {

    private async parseIncludeComponent(inculdePath: string, specEncoding: string, parent?: ComponentSpec): Promise<ComponentSpec[]> {
        const specContent = await readFileAsString(inculdePath, specEncoding);
        const json = await parseXmlToJson(specContent);
        return await this.parsePageComponent(inculdePath, specEncoding, json, parent);
    }

    private async parsePageComponent(specPath: string, specEncoding: string, json: any, parent?: ComponentSpec): Promise<ComponentSpec[]> {
        let parsedComponents: ComponentSpec[] = [];

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
                        const { $, ...others } = node;
                        const multiple = parseInt($.multiple || '1');
                        const components = await Promise.all(
                            new Array(multiple).fill(undefined).map(async (v, i) => {
                                const index = i + 1;
                                const component = {
                                    name: $.name && $.name.replace(/{index}/g, index),
                                    selector: $.selector && $.selector.replace(/{index}/g, index),
                                    xpath: $.xpath && $.xpath.replace(/{index}/g, index),
                                    parent,
                                    children: [] as ComponentSpec[],
                                    type: key,
                                };

                                component.children = await this.parsePageComponent(specPath, specEncoding, others, component);

                                return component;
                            }));

                        parsedComponents = [...parsedComponents, ...components];
                    }
                }));
            }
        }

        return parsedComponents;
    }

    public async loadPageSpec(specPath: string, specEncoding: string): Promise<PageSpec> {
        const specContent = await readFileAsString(specPath, specEncoding);

        const json = await parseXmlToJson(specContent);
        const { $, ...others } = json.Page;

        const rootComponents = await this.parsePageComponent(specPath, specEncoding, others);
        return { name: $.name, url: $.url, rootComponents, getComponent };
    }

}

export default new PageSpecLoader();