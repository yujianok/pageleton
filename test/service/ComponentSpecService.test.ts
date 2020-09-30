import { ComponentSpec } from "../../src/spec";
import { getRootElementNodes } from "../../src/service/ComponentSpecService";
import { expect } from "chai";

describe('Test ComponentSpecService', () => {

    it('test getRootElementNodes', async () => {
        const rootComponents: ComponentSpec[] = [
            {
                name: '1',
                type: 'BLOCK',
                selector: "selector_1",
                xpath: "xpath_1",
                children: [
                    {
                        name: '1-1',
                        type: 'BLOCK',
                        selector: "selector_1-1",
                        xpath: "xpath_1-1",
                        children: [
                            {
                                name: '1-1-2',
                                type: 'BLOCK',
                                selector: "selector_1-1-2",
                                xpath: "xpath_1-1-2",
                                children: []
                            }
                        ]
                    },
                    {
                        name: '1-2',
                        type: 'BLOCK',
                        selector: "selector_1-2",
                        xpath: "xpath_1-2",
                        children: [
                            {
                                name: '1-2-2',
                                selector: "selector_1-2-2",
                                xpath: "xpath_1-2-2",
                                type: 'BLOCK',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '2',
                type: 'BLOCK',
                selector: "selector_2",
                xpath: "xpath_2",
                children: [
                    {
                        name: '2-1',
                        type: 'BLOCK',
                        selector: "selector_2-1",
                        xpath: "xpath_2-1",
                        children: [
                            {
                                name: '2-1-2',
                                selector: "selector_2-1-2",
                                xpath: "xpath_2-1-2",
                                type: 'BLOCK',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '2-2',
                        selector: "selector_2-2",
                        xpath: "xpath_2-2",
                        type: 'BLOCK',
                        children: [
                            {
                                name: '2-2-2',
                                selector: "selector_2-2-2",
                                xpath: "xpath_2-2-2",
                                type: 'BLOCK',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ];
        const actual = getRootElementNodes(rootComponents);
        expect(actual).deep.equal([
            {
                name: '1',
                selector: "selector_1",
                xpath: "xpath_1",
                children: [
                    {
                        name: '1-1',
                        selector: "selector_1-1",
                        xpath: "xpath_1-1",
                        children: [
                            {
                                name: '1-1-2',
                                selector: "selector_1-1-2",
                                xpath: "xpath_1-1-2",
                                children: []
                            }
                        ]
                    },
                    {
                        name: '1-2',
                        selector: "selector_1-2",
                        xpath: "xpath_1-2",
                        children: [
                            {
                                name: '1-2-2',
                                selector: "selector_1-2-2",
                                xpath: "xpath_1-2-2",
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '2',
                selector: "selector_2",
                xpath: "xpath_2",
                children: [
                    {
                        name: '2-1',
                        selector: "selector_2-1",
                        xpath: "xpath_2-1",
                        children: [
                            {
                                name: '2-1-2',
                                selector: "selector_2-1-2",
                                xpath: "xpath_2-1-2",
                                children: []
                            }
                        ]
                    },
                    {
                        name: '2-2',
                        selector: "selector_2-2",
                        xpath: "xpath_2-2",
                        children: [
                            {
                                name: '2-2-2',
                                selector: "selector_2-2-2",
                                xpath: "xpath_2-2-2",
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]);
    });
})