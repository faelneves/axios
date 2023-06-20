//https://chat.openai.com/share/5d0d70f3-c4c8-4677-845f-63cff57c2248
import assert from 'assert';
import CancelToken from '../../../lib/cancel/CancelToken.js';
import CanceledError from '../../../lib/cancel/CanceledError.js';

describe('CancelToken', function () {
  it('deve lançar um TypeError se o executor não for uma função', function () {
    assert.throws(() => {
      new CancelToken();
    }, TypeError);
  });

  it('deve criar uma instância de CancelToken com uma promise', function () {
    const cancelToken = new CancelToken(() => { });
    assert(cancelToken.promise instanceof Promise);
  });

  it('deve lançar um CanceledError quando o cancelamento for solicitado', async function () {
    const cancelToken = new CancelToken(cancel => {
      cancel('Operação cancelada');
    });

    try {
      await cancelToken.promise;
    } catch (error) {
      assert(error instanceof CanceledError);
      assert.strictEqual(error.message, 'Operação cancelada');
    }
  });

  it('deve lançar um CanceledError se o cancelamento já foi solicitado', async function () {
    const cancelToken = new CancelToken(cancel => {
      cancel('Operação cancelada');
      cancel('Segundo cancelamento');
    });

    try {
      await cancelToken.promise;
    } catch (error) {
      assert.strictEqual(error.message, 'Operação cancelada');
    }
  });

  it('deve chamar os ouvintes registrados quando o cancelamento for solicitado', async function () {
    const cancelToken = new CancelToken(cancel => {
      setTimeout(() => {
        cancel('Operação cancelada');
      }, 100);
    });

    let listenerCalled = false;
    cancelToken.subscribe(() => {
      listenerCalled = true;
    });

    try {
      await cancelToken.promise;
    } catch (error) {
      assert(listenerCalled);
    }
  });

  it('deve criar uma fonte de CancelToken', function () {
    const source = CancelToken.source();
    assert(source.token instanceof CancelToken);
    assert(typeof source.cancel === 'function');
  });

});
