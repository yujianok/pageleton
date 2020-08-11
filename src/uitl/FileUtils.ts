
import fs from 'fs';
import glob from 'glob';

export class FileUtils {

    static async getAllFiles(filePath: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            glob(filePath, function (err, files) {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    static async readFileAsString(filePath: string, encoding: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, encoding, function (err, content) {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        });
    }

}