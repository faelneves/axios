import assert from 'assert';
import defaults from '../../../lib/defaults/index.js';
import transitionalDefaults from '../../../lib/defaults/transitional.js';
import platform from '../../../lib/platform/index.js';
import utils from '../../../lib/utils.js';

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

describe('defaults', () => {
  it('should have the correct default values', () => {
    assert.deepStrictEqual(defaults.transitional, transitionalDefaults);
    assert.deepStrictEqual(defaults.adapter, ['xhr', 'http']);
    assert.deepStrictEqual(defaults.timeout, 0);
    assert.strictEqual(defaults.xsrfCookieName, 'XSRF-TOKEN');
    assert.strictEqual(defaults.xsrfHeaderName, 'X-XSRF-TOKEN');
    assert.strictEqual(defaults.maxContentLength, -1);
    assert.strictEqual(defaults.maxBodyLength, -1);

    const expectedEnv = {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    };
    assert.deepStrictEqual(defaults.env, expectedEnv);

    assert.strictEqual(typeof defaults.validateStatus, 'function');

    const expectedCommonHeaders = {
      'Accept': 'application/json, text/plain, */*'
    };
    assert.deepStrictEqual(defaults.headers.common, expectedCommonHeaders);

    const methodsWithoutData = ['delete', 'get', 'head'];
    methodsWithoutData.forEach((method) => {
      assert.deepStrictEqual(defaults.headers[method], {});
    });

    const methodsWithData = ['post', 'put', 'patch'];
    methodsWithData.forEach((method) => {
      const expectedHeaders = utils.merge(DEFAULT_CONTENT_TYPE);
      assert.deepStrictEqual(defaults.headers[method], expectedHeaders);
    });
  });
});
