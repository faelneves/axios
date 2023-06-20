//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import buildFullPath from '../../../lib/core/buildFullPath.js';

describe('buildFullPath', () => {
  it('should return the requestedURL when it is an absolute URL', () => {
    const baseURL = 'https://api.example.com';
    const requestedURL = 'https://api.example.com/users';
    const fullPath = buildFullPath(baseURL, requestedURL);
    assert.strictEqual(fullPath, requestedURL);
  });

  it('should combine the baseURL and requestedURL when requestedURL is relative', () => {
    const baseURL = 'https://api.example.com';
    const requestedURL = '/users';
    const fullPath = buildFullPath(baseURL, requestedURL);
    assert.strictEqual(fullPath, 'https://api.example.com/users');
  });

  it('should return the requestedURL when baseURL is empty', () => {
    const baseURL = '';
    const requestedURL = 'https://api.example.com/users';
    const fullPath = buildFullPath(baseURL, requestedURL);
    assert.strictEqual(fullPath, requestedURL);
  });

  it('should return the requestedURL when baseURL is null', () => {
    const baseURL = null;
    const requestedURL = 'https://api.example.com/users';
    const fullPath = buildFullPath(baseURL, requestedURL);
    assert.strictEqual(fullPath, requestedURL);
  });
});
