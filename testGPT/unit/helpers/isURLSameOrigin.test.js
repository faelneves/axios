import assert from 'assert';
import isURLSameOrigin from '../../../lib/helpers/isURLSameOrigin.js';

describe('isURLSameOrigin', () => {
  it('should return true for URLs with the same origin', () => {
    const requestURL = 'https://example.com/path';
    const result = isURLSameOrigin(requestURL);
    assert.strictEqual(result, true);
  });
});
