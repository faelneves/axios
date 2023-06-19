import assert from 'assert';
import isAxiosError from '../../../lib/helpers/isAxiosError.js';

describe('isAxiosError', () => {
  it('should return true for an Axios error object', () => {
    const error = { isAxiosError: true };
    const result = isAxiosError(error);
    assert.strictEqual(result, true);
  });

  it('should return false for a regular object', () => {
    const obj = { foo: 'bar' };
    const result = isAxiosError(obj);
    assert.strictEqual(result, false);
  });

  it('should return false for null', () => {
    const result = isAxiosError(null);
    assert.strictEqual(result, false);
  });

  it('should return false for undefined', () => {
    const result = isAxiosError(undefined);
    assert.strictEqual(result, false);
  });
});
