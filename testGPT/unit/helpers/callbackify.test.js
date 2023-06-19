import assert from 'assert';
import callbackify from '../../../lib/helpers/callbackify.js';

// Exemplo de função assíncrona para teste
async function asyncFunction(value) {
  return value;
}

describe('callbackify', () => {
  it('should convert an async function to a callback-based function', (done) => {
    const cbFunction = callbackify(asyncFunction);

    cbFunction('Hello', (err, result) => {
      assert.strictEqual(err, null);
      assert.strictEqual(result, 'Hello');
      done();
    });
  });

  it('should handle an async function with multiple arguments', (done) => {
    const asyncMultiply = async (x, y) => {
      return x * y;
    };

    const cbMultiply = callbackify(asyncMultiply);

    cbMultiply(3, 4, (err, result) => {
      assert.strictEqual(err, null);
      assert.strictEqual(result, 12);
      done();
    });
  });

  it('should handle an async function with a reducer', (done) => {
    const asyncAdd = async (a, b) => {
      return a + b;
    };

    const reducer = (value) => [value + 10];

    const cbAdd = callbackify(asyncAdd, reducer);

    cbAdd(5, 7, (err, result) => {
      assert.strictEqual(err, null);
      assert.strictEqual(result, 22);
      done();
    });
  });
});
