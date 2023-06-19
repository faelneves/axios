import assert from 'assert';
import fromDataURI from '../../../lib/helpers/fromDataURI.js';

describe('fromDataURI', () => {
  it('should parse a data URI to a Buffer', () => {
    const uri1 = 'data:text/plain;base64,SGVsbG8gd29ybGQ='; // "Hello world" in base64
    const result1 = fromDataURI(uri1, false);
    assert.strictEqual(result1.toString(), 'Hello world');
  });

  it('should parse a data URI to a Blob', () => {
    // Blob support is required for this test
    if (typeof Blob !== 'undefined') {
      const uri = 'data:text/plain;base64,SGVsbG8gd29ybGQ='; // "Hello world" in base64
      const result = fromDataURI(uri, true);
      assert.strictEqual(result instanceof Blob, true);
      assert.strictEqual(result.type, 'text/plain');
    } else {
      assert.strictEqual(true, true); // Skip the test if Blob is not supported
    }
  });

  it('should throw an error for an invalid data URI', () => {
    const invalidURI = 'data:invalid-uri';
    assert.throws(() => {
      fromDataURI(invalidURI, false);
    }, /^AxiosError: Invalid URL$/);
  });

  it('should throw an error for an unsupported protocol', () => {
    const uri = 'http://www.example.com';
    assert.throws(() => {
      fromDataURI(uri, false);
    }, /^AxiosError: Unsupported protocol http$/);
  });
});
