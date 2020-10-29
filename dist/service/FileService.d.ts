declare function getAllFiles(filePath: string): Promise<string[]>;
declare function readFileAsString(filePath: string, encoding: string): Promise<string>;
declare const _default: {
    getAllFiles: typeof getAllFiles;
    readFileAsString: typeof readFileAsString;
};
export default _default;
