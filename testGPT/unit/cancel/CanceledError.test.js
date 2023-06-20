//https://chat.openai.com/share/5d0d70f3-c4c8-4677-845f-63cff57c2248
import assert from 'assert';
import CanceledError from '../../../lib/cancel/CanceledError.js';

describe('CanceledError', function () {
  it('deve criar um objeto CanceledError com as propriedades corretas', function () {
    const message = 'Operação cancelada';
    const config = { timeout: 5000 };
    const request = { method: 'GET', url: '/api/data' };

    const error = new CanceledError(message, config, request);

    assert.strictEqual(error.message, message);
    assert.strictEqual(error.config, config);
    assert.strictEqual(error.request, request);
    assert.strictEqual(error.name, 'CanceledError');
    assert.strictEqual(error.__CANCEL__, true);
  });

  it('deve criar um objeto CanceledError com a mensagem padrão se nenhuma mensagem for fornecida', function () {
    const error = new CanceledError();

    assert.strictEqual(error.message, 'canceled');
  });
});
