import { Transform } from 'node:stream';

const readByLine = new Transform( { objectMode: true } );

readByLine._transform = function (chunk, encoding, done) {
     const data = chunk.toString();
     if (this._lastLineData) {
          data = this._lastLineData + data;
     }

     var lines = data.split('\n');
     this._lastLineData = lines.splice(lines.length - 1, 1)[0];

     lines.forEach(this.push.bind(this));
     done();
}

readByLine._flush = function (done) {
     if (this._lastLineData) {
          this.push(this._lastLineData)
     }
     this._lastLineData = null;
     done();
}

export default readByLine;