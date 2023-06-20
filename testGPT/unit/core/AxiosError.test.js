//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import AxiosError from '../../../lib/core/AxiosError.js';

describe('AxiosError', () => {
  it('should create an AxiosError instance', () => {
    const error = new AxiosError('Error message');
    assert.strictEqual(error instanceof AxiosError, true);
    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, 'AxiosError');
    assert.strictEqual(error.message, 'Error message');
    assert.strictEqual(error.code, undefined);
    assert.strictEqual(error.config, undefined);
    assert.strictEqual(error.request, undefined);
    assert.strictEqual(error.response, undefined);
  });

  it('should create an AxiosError instance with additional properties', () => {
    const config = { method: 'GET', url: 'https://api.example.com' };
    const request = { headers: { 'Content-Type': 'application/json' } };
    const response = { status: 500, data: { message: 'Internal Server Error' } };
    const error = new AxiosError('Error message', 'ECONNABORTED', config, request, response);
    assert.strictEqual(error instanceof AxiosError, true);
    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, 'AxiosError');
    assert.strictEqual(error.message, 'Error message');
    assert.strictEqual(error.code, 'ECONNABORTED');
    assert.deepStrictEqual(error.config, config);
    assert.deepStrictEqual(error.request, request);
    assert.deepStrictEqual(error.response, response);
  });

  it('should serialize AxiosError to JSON', () => {
    const error = new AxiosError('Error message', 'ECONNABORTED');
    const json = error.toJSON();
    assert.strictEqual(json.message, 'Error message');
    assert.strictEqual(json.name, 'AxiosError');
    assert.strictEqual(json.code, 'ECONNABORTED');
    assert.strictEqual(json.config, undefined);
    assert.strictEqual(json.status, null);
  });

  it('should create AxiosError from existing error', () => {
    const originalError = new Error('Original error');
    const config = { method: 'POST', url: 'https://api.example.com' };
    const request = { headers: { 'Content-Type': 'application/json' } };
    const response = { status: 400, data: { message: 'Bad Request' } };
    const customProps = { additional: 'property' };
    const error = AxiosError.from(originalError, 'ERR_BAD_REQUEST', config, request, response, customProps);
    assert.strictEqual(error instanceof AxiosError, true);
    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, 'Error');
    assert.strictEqual(error.message, 'Original error');
    assert.strictEqual(error.code, 'ERR_BAD_REQUEST');
    assert.deepStrictEqual(error.config, config);
    assert.deepStrictEqual(error.request, request);
    assert.deepStrictEqual(error.response, response);
    assert.strictEqual(error.additional, 'property');
    assert.strictEqual(error.cause, originalError);
  });
});
