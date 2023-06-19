//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import AxiosURLSearchParams from '../../../lib/helpers/AxiosURLSearchParams.js';

describe('AxiosURLSearchParams', () => {
  it('should initialize with empty pairs', () => {
    const params = new AxiosURLSearchParams();
    assert.deepStrictEqual(params._pairs, []);
  });

  it('should append a pair correctly', () => {
    const params = new AxiosURLSearchParams();
    params.append('key', 'value');
    assert.deepStrictEqual(params._pairs, [['key', 'value']]);
  });

  it('should convert to string correctly without encoder', () => {
    const params = new AxiosURLSearchParams();
    params.append('key1', 'value1');
    params.append('key2', 'value2');
    assert.strictEqual(params.toString(), 'key1=value1&key2=value2');
  });

  it('should convert to string correctly with encoder', () => {
    const params = new AxiosURLSearchParams();
    params.append('key', 'va lue');
    assert.strictEqual(params.toString(encodeURIComponent), 'key=va%20lue');
  });
});
