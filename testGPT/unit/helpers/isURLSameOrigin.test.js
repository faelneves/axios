//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import isURLSameOrigin from '../../../lib/helpers/isURLSameOrigin.js';

describe('isURLSameOrigin', () => {
  it('should return true for URLs with the same origin', () => {
    const requestURL = 'https://example.com/path';
    const result = isURLSameOrigin(requestURL);
    assert.strictEqual(result, true);
  });
});
