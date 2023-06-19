import assert from 'assert';
import throttle from '../../../lib/helpers/throttle.js';

describe('throttle', () => {
  it('should allow immediate execution if "force" is set to true', (done) => {
    let count = 0;

    const throttledFn = throttle(() => {
      count++;
    }, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    // Call the throttled function with "force" set to true
    throttledFn(true);

    // After the delay, the function should be called twice (immediate execution + throttled execution)
    setTimeout(() => {
      assert.strictEqual(count, 2);
      done();
    }, 200);
  });

  it('should return the result of the throttled function', (done) => {
    const result = 'test';

    const throttledFn = throttle(() => {
      return result;
    }, 100);

    const returnedResult = throttledFn();

    assert.strictEqual(returnedResult, result);
    done();
  });
});
