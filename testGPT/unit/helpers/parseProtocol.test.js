import assert from 'assert';
import parseProtocol from '../../../lib/helpers/parseProtocol.js';

describe('parseProtocol', () => {
  it('should return the protocol from the URL', () => {
    const url1 = 'https://www.example.com';
    const result1 = parseProtocol(url1);
    assert.strictEqual(result1, 'https');

    const url2 = 'http://localhost:3000';
    const result2 = parseProtocol(url2);
    assert.strictEqual(result2, 'http');

    const url3 = 'ftp://ftp.example.com';
    const result3 = parseProtocol(url3);
    assert.strictEqual(result3, 'ftp');

    const url4 = 'invalid-url';
    const result4 = parseProtocol(url4);
    assert.strictEqual(result4, '');
  });
});
