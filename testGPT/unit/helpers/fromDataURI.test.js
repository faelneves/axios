//https://chat.openai.com/share/801b9b8b-9b63-485b-8db5-834bb3fc21cc
import assert from 'assert';
import fromDataURI from '../../../lib/helpers/fromDataURI.js';

describe('fromDataURI', () => {
  it('should parse a data URI to a Buffer', () => {
    const uri1 = 'data:text/plain;base64,SGVsbG8gd29ybGQ='; // "Hello world" in base64
    const result1 = fromDataURI(uri1, false);
    assert.strictEqual(result1.toString(), 'Hello world');
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
