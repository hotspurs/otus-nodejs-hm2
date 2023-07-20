import fs from 'node:fs';
import path from 'node:path';

import readByLine from './transforms/read-by-line.js';
import splitByWord from './transforms/split-by-word.js';
import filterSymbols from './transforms/filter-symbols.js';
import count from './transforms/count.js';

async function processFile() {
    const args = process.argv.slice(2);
    const filePath = path.resolve(args[0]);

    try {
        await fs.promises.access(filePath, fs.F_OK);
    } catch (e) {
        console.log(`File ${filePath} doesn't exist. Check file path`);
        return;
    }

    fs.createReadStream(filePath)
        .pipe(readByLine)
        .pipe(splitByWord)
        .pipe(filterSymbols(['.', ',']))
        .pipe(count)
        .on('data', (data) => {
            console.log('data', data);
        });
}

processFile();
