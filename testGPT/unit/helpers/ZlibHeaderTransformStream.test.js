//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import stream from 'stream';
import assert from 'assert';
import ZlibHeaderTransformStream from '../../../lib/helpers/ZlibHeaderTransformStream.js';

describe('ZlibHeaderTransformStream', () => {

  it('should not add default compression headers when zlib headers are already present', (done) => {
    const input = Buffer.from([120, 156, 72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]);
    const transformStream = new ZlibHeaderTransformStream();

    const writable = new stream.Writable({
      write(chunk, encoding, callback) {
        assert.deepStrictEqual(chunk, input);
        callback();
      }
    });

    transformStream.pipe(writable);

    transformStream.write(input);
    transformStream.end();

    writable.on('finish', () => {
      done();
    });
  });

  it('should pass through empty chunks without modification', (done) => {
    const input = Buffer.from('');

    const transformStream = new ZlibHeaderTransformStream();

    const writable = new stream.Writable({
      write(chunk, encoding, callback) {
        assert.deepStrictEqual(chunk, input);
        callback();
      }
    });

    transformStream.pipe(writable);

    transformStream.write(input);
    transformStream.end();

    writable.on('finish', () => {
      done();
    });
  });
});
