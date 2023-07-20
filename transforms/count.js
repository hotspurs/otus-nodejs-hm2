import { Transform } from 'node:stream';

const count = new Transform( { objectMode: true } );

count._transform = function (chunk, encoding, done) {
     const word = chunk;
     if (!this._data) {
          this._data = {};
     }

     if (!this._data[word]) {
        this._data[word] = 1;
     } else {
        this._data[word] = this._data[word] + 1;
     }

     done();
}

count._flush = function (done) {
     if (this._data) {
        const result = [];
        Object.keys(this._data).sort().forEach((key) => {
            result.push(this._data[key]);
        });
        this.push(result);
     }

     done();
}

export default count;
