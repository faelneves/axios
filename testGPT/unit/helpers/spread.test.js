//https://chat.openai.com/share/801b9b8b-9b63-485b-8db5-834bb3fc21cc
import assert from 'assert';
import spread from '../../../lib/helpers/spread.js';

describe('spread', () => {
  it('should invoke the callback with expanded array arguments', () => {
    const expectedArgs = [1, 2, 3];
    let invoked = false;

    const callback = (...args) => {
      assert.deepStrictEqual(args, expectedArgs);
      invoked = true;
    };

    const wrappedCallback = spread(callback);
    wrappedCallback(expectedArgs);

    assert.strictEqual(invoked, true);
  });

  it('should return the result of the invoked callback', () => {
    const result = 'test';

    const callback = () => {
      return result;
    };

    const wrappedCallback = spread(callback);
    const returnedResult = wrappedCallback([]);

    assert.strictEqual(returnedResult, result);
  });
});
