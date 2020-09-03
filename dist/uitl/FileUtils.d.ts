export declare class FileUtils {
    static getAllFiles(filePath: string): Promise<string[]>;
    static readFileAsString(filePath: string, encoding: string): Promise<string>;
}
