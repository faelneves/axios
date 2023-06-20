//https://chat.openai.com/share/5d0d70f3-c4c8-4677-845f-63cff57c2248
import assert from 'assert';
import isCancel from '../../../lib/cancel/isCancel.js';

describe('isCancel', function () {
  it('deve retornar true se o objeto contém a propriedade "__CANCEL__"', function () {
    const obj = { __CANCEL__: true };
    const result = isCancel(obj);
    assert.strictEqual(result, true);
  });

  it('deve retornar false se o objeto não contém a propriedade "__CANCEL__"', function () {
    const obj = { foo: 'bar' };
    const result = isCancel(obj);
    assert.strictEqual(result, false);
  });

  it('deve retornar false se o objeto é null', function () {
    const obj = null;
    const result = isCancel(obj);
    assert.strictEqual(result, false);
  });

  it('deve retornar false se o objeto é undefined', function () {
    const obj = undefined;
    const result = isCancel(obj);
    assert.strictEqual(result, false);
  });
});
