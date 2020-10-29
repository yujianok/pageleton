import { ElementNode, ElementRoute } from "../driver";
import { ComponentSpec } from "../spec";
declare function getElementRoutes(componentSpec: ComponentSpec): ElementRoute[];
declare function getRootElementNodes(rootComponents: ComponentSpec[]): ElementNode[];
declare const _default: {
    getElementRoutes: typeof getElementRoutes;
    getRootElementNodes: typeof getRootElementNodes;
};
export default _default;
