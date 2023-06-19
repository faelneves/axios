import assert from 'assert';
import bind from '../../../lib/helpers/bind.js';

describe('bind', () => {
  it('should bind a function to a context', () => {
    const context = {
      value: 'Hello',
      getValue: function () {
        return this.value;
      }
    };

    const boundFn = bind(context.getValue, context);
    const result = boundFn();

    assert.strictEqual(result, 'Hello');
  });

  it('should bind a function to a different context', () => {
    const context1 = {
      value: 'Hello',
      getValue: function () {
        return this.value;
      }
    };

    const context2 = {
      value: 'World'
    };

    const boundFn = bind(context1.getValue, context2);
    const result = boundFn();

    assert.strictEqual(result, 'World');
  });

});
