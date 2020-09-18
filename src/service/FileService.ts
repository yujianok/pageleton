
import fs from 'fs';
import glob from 'glob';


export async function getAllFiles(filePath: string): Promise<string[]> {
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

export async function readFileAsString(filePath: string, encoding: string): Promise<string> {
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
