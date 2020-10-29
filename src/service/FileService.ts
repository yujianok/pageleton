
import fs from 'fs';
import glob from 'glob';


async function getAllFiles(filePath: string): Promise<string[]> {
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

async function readFileAsString(filePath: string, encoding: string): Promise<string> {
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

export default { getAllFiles, readFileAsString }
