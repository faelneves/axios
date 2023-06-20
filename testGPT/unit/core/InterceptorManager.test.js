//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import InterceptorManager from '../../../lib/core/InterceptorManager.js';

describe('InterceptorManager', () => {
  it('should add a new interceptor to the stack', () => {
    const interceptorManager = new InterceptorManager();
    const fulfilled = () => { };
    const rejected = () => { };

    const id = interceptorManager.use(fulfilled, rejected, {
      synchronous: true,
      runWhen: () => true
    });

    assert.strictEqual(interceptorManager.handlers.length, 1);
    assert.strictEqual(id, 0);
  });

  it('should remove an interceptor from the stack', () => {
    const interceptorManager = new InterceptorManager();
    const fulfilled = () => { };
    const rejected = () => { };

    interceptorManager.use(fulfilled, rejected);
    interceptorManager.use(fulfilled, rejected);

    const removed = interceptorManager.eject(1);

    assert.strictEqual(interceptorManager.handlers.length, 2);
    assert.strictEqual(interceptorManager.handlers[1], null);
  });

  it('should clear all interceptors from the stack', () => {
    const interceptorManager = new InterceptorManager();
    const fulfilled = () => { };
    const rejected = () => { };

    interceptorManager.use(fulfilled, rejected);
    interceptorManager.use(fulfilled, rejected);

    interceptorManager.clear();

    assert.strictEqual(interceptorManager.handlers.length, 0);
  });

  it('should iterate over all the registered interceptors', () => {
    const interceptorManager = new InterceptorManager();
    const fulfilled = () => { };
    const rejected = () => { };

    interceptorManager.use(fulfilled, rejected);
    interceptorManager.use(fulfilled, rejected);

    let count = 0;

    interceptorManager.forEach(() => {
      count++;
    });

    assert.strictEqual(count, 2);
  });
});
