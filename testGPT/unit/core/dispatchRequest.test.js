//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import dispatchRequest from '../../../lib/core/dispatchRequest.js';

describe('dispatchRequest', () => {

  it('should handle a rejected request', () => {
    const config = {
      method: 'GET',
      url: 'http://example.com/'
    };

    const adapter = () => {
      return Promise.reject(new Error('Request failed'));
    };

    const resultPromise = dispatchRequest(config, adapter);

    return resultPromise.catch((error) => {
      assert.strictEqual(error.message, 'Request failed');
    });
  });
});
