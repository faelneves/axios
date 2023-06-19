import assert from 'assert';
import buildURL from '../../../lib/helpers/buildURL.js';

describe('buildURL', () => {
  it('should return the base URL when no params are provided', () => {
    const url = 'http://www.example.com';
    const result = buildURL(url);
    assert.strictEqual(result, url);
  });

  it('should append params to the URL', () => {
    const url = 'http://www.example.com';
    const params = { key1: 'value1', key2: 'value2' };
    const result = buildURL(url, params);
    assert.strictEqual(result, 'http://www.example.com?key1=value1&key2=value2');
  });

  it('should use custom encoding function if provided', () => {
    const url = 'http://www.example.com';
    const params = { key: 'value' };
    const options = { encode: str => str.toUpperCase() };
    const result = buildURL(url, params, options);
    assert.strictEqual(result, 'http://www.example.com?KEY=VALUE');
  });

  it('should use custom serialize function if provided', () => {
    const url = 'http://www.example.com';
    const params = { key: 'value' };
    const options = {
      serialize: (params, options) => {
        return Object.keys(params).map(key => `${options.encode(key)}=${options.encode(params[key])}`).join('&');
      },
      encode: str => str.toUpperCase()
    };
    const result = buildURL(url, params, options);
    assert.strictEqual(result, 'http://www.example.com?KEY=VALUE');
  });
});
