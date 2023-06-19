import assert from 'assert';
import isAbsoluteURL from '../../../lib/helpers/isAbsoluteURL.js';

describe('isAbsoluteURL', () => {
  it('should return true for an absolute URL', () => {
    const url = 'https://example.com';
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, true);
  });

  it('should return true for a protocol-relative URL', () => {
    const url = '//example.com';
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, true);
  });

  it('should return false for a relative URL', () => {
    const url = '/path/to/resource';
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, false);
  });

  it('should return false for an empty string', () => {
    const url = '';
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, false);
  });

  it('should return false for null', () => {
    const url = null;
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, false);
  });

  it('should return false for undefined', () => {
    const url = undefined;
    const result = isAbsoluteURL(url);
    assert.strictEqual(result, false);
  });
});
