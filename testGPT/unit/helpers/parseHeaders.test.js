//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import parseHeaders from '../../../lib/helpers/parseHeaders.js';

describe('parseHeaders', () => {
  it('should parse raw headers into an object', () => {
    const rawHeaders = `Date: Wed, 27 Aug 2014 08:58:49 GMT
      Content-Type: application/json
      Connection: keep-alive
      Transfer-Encoding: chunked`;

    const expected = {
      date: 'Wed, 27 Aug 2014 08:58:49 GMT',
      'content-type': 'application/json',
      connection: 'keep-alive',
      'transfer-encoding': 'chunked'
    };

    const result = parseHeaders(rawHeaders);

    assert.deepStrictEqual(result, expected);
  });

  it('should handle multiple headers with the same key', () => {
    const rawHeaders = `Set-Cookie: cookie1=value1
      Set-Cookie: cookie2=value2`;

    const expected = {
      'set-cookie': ['cookie1=value1', 'cookie2=value2']
    };

    const result = parseHeaders(rawHeaders);

    assert.deepStrictEqual(result, expected);
  });

  it('should ignore duplicate headers based on predefined list', () => {
    const rawHeaders = `Content-Length: 100
      Content-Type: text/plain
      Content-Length: 200`;

    const expected = {
      'content-length': '100',
      'content-type': 'text/plain'
    };

    const result = parseHeaders(rawHeaders);

    assert.deepStrictEqual(result, expected);
  });

  it('should handle empty raw headers', () => {
    const rawHeaders = '';

    const expected = {};

    const result = parseHeaders(rawHeaders);

    assert.deepStrictEqual(result, expected);
  });
});
