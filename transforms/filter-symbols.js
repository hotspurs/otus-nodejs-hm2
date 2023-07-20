import { Transform } from 'node:stream';

export default (symbols) => {
    const filterSymbols = new Transform( { objectMode: true } );

    filterSymbols._transform = function (chunk, encoding, done) {
        symbols.forEach((symbol) => {
            chunk = chunk.replace(symbol, '');
        });
        if (chunk) {
            this.push(chunk);
        }
        done();
    }
    return filterSymbols;
};
