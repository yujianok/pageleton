import { expect } from 'chai';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getAllFiles, readFileAsString } from '../../src/service/FileService';

describe('Test FileUtils', () => {

    it('test getAllFiles', async () => {
        const tempPath = path.join(os.tmpdir(), '/test/');
        if (fs.existsSync(tempPath)) {
            fs.rmdirSync(tempPath, { recursive: true });
        }
        fs.mkdirSync(tempPath);

        [1, 2, 3].forEach((i) => {
            fs.openSync(path.join(tempPath, '/f-' + i), "w");
        })

        const files = await getAllFiles(tempPath + "/*");
        expect(files.sort()).to.deep.equal(['/tmp/test/f-1', '/tmp/test/f-2', '/tmp/test/f-3']);
    });


    it('test readFileAsString', async () => {
        const tempPath = path.join(os.tmpdir(), '/test');
        if (fs.existsSync(tempPath)) {
            fs.rmdirSync(tempPath, { recursive: true });
        }
        fs.mkdirSync(tempPath);

        const filePath = path.join(tempPath, '/f.txt');
        fs.writeFileSync(filePath, "test-1111");

        const content = await readFileAsString(filePath, 'utf8');
        expect(content).to.deep.equal("test-1111");
    });


});