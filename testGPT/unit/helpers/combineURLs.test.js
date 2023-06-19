import assert from 'assert';
import combineURLs from '../../../lib/helpers/combineURLs.js';

describe('combineURLs', () => {
  it('should combine the base URL and relative URL', () => {
    const baseURL = 'https://example.com/api';
    const relativeURL = '/users';
    const combinedURL = combineURLs(baseURL, relativeURL);
    assert.strictEqual(combinedURL, 'https://example.com/api/users');
  });

  it('should handle trailing slashes in base URL and leading slashes in relative URL', () => {
    const baseURL = 'https://example.com/api/';
    const relativeURL = '/users';
    const combinedURL = combineURLs(baseURL, relativeURL);
    assert.strictEqual(combinedURL, 'https://example.com/api/users');
  });

  it('should handle no relative URL', () => {
    const baseURL = 'https://example.com/api';
    const combinedURL = combineURLs(baseURL, null);
    assert.strictEqual(combinedURL, 'https://example.com/api');
  });
});
