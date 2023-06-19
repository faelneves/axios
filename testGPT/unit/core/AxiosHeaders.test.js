//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import AxiosHeaders from '../../../lib/core/AxiosHeaders.js';

describe('AxiosHeaders', function () {
  it('should set and get a header', function () {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/json');

    const result = headers.get('Content-Type');
    assert.strictEqual(result, 'application/json');
  });

  it('should delete a header', function () {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/json');

    const deleted = headers.delete('Content-Type');
    assert.strictEqual(deleted, true);

    const result = headers.get('Content-Type');
    assert.strictEqual(result, undefined);
  });

  it('should normalize headers', function () {
    const headers = new AxiosHeaders();
    headers.set('content-type', 'application/json');

    headers.normalize();

    const result = headers.get('Content-Type');
    assert.strictEqual(result, 'application/json');
  });

  it('should concatenate headers', function () {
    const headers1 = new AxiosHeaders();
    headers1.set('Content-Type', 'application/json');

    const headers2 = new AxiosHeaders();
    headers2.set('Authorization', 'Bearer token');

    const combined = AxiosHeaders.concat(headers1, headers2);

    const result1 = combined.get('Content-Type');
    assert.strictEqual(result1, 'application/json');

    const result2 = combined.get('Authorization');
    assert.strictEqual(result2, 'Bearer token');
  });
});