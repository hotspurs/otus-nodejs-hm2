import { Transform } from 'node:stream';

const splitByWord = new Transform( { objectMode: true } );

splitByWord._transform = function (chunk, encoding, done) {
     const words = chunk.split(' ');

     words.forEach(word => this.push(word));
     done();
}

export default splitByWord;