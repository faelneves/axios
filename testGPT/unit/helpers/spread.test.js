//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
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
