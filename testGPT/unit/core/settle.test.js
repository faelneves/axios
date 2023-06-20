//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import settle from '../../../lib/core/settle.js';
import AxiosError from '../../../lib/core/AxiosError.js';

describe('settle', () => {
  it('should resolve the Promise if response status is valid', () => {
    const response = {
      status: 200,
      config: { validateStatus: (status) => status >= 200 && status < 300 }
    };

    return new Promise((resolve, reject) => {
      settle(resolve, reject, response);
    }).then((result) => {
      assert.strictEqual(result, response);
    });
  });

  it('should reject the Promise if response status is invalid', () => {
    const response = {
      status: 404,
      config: { validateStatus: (status) => status >= 200 && status < 300 }
    };

    return new Promise((resolve, reject) => {
      settle(resolve, reject, response);
    }).catch((error) => {
      assert.ok(error instanceof AxiosError);
      assert.strictEqual(error.message, 'Request failed with status code 404');
      assert.strictEqual(error.code, AxiosError.ERR_BAD_REQUEST);
      assert.strictEqual(error.config, response.config);
      assert.strictEqual(error.request, response.request);
      assert.strictEqual(error.response, response);
    });
  });
});
