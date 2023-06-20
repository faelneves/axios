//https://chat.openai.com/share/2251409c-d879-430c-b2c9-b71f8c88820e
import assert from 'assert';
import nock from 'nock';
import httpAdapter from '../../../lib/adapters/http.js';

describe('httpAdapter', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should export a function', () => {
    assert.strictEqual(typeof httpAdapter, 'function');
  });

  it('should handle a basic HTTP GET request', async () => {
    const config = {
      method: 'GET',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      }
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .get('/')
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);
    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle a basic HTTPS GET request', async () => {
    const config = {
      method: 'GET',
      url: 'https://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      }
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('https://example.com')
      .get('/')
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle a basic HTTP POST request', async () => {
    const config = {
      method: 'POST',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        age: 30
      })
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .post('/', JSON.stringify(config.data), { reqheaders: config.headers })
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle a request with custom headers', async () => {
    const config = {
      method: 'GET',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0',
        'X-Custom-Header': 'custom-value'
      }
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .get('/')
      .matchHeader('X-Custom-Header', 'custom-value')
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle a request with query parameters', async () => {
    const config = {
      method: 'GET',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      },
      params: {
        param1: 'value1',
        param2: 'value2'
      }
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .get('/')
      .query(config.params)
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle a request with timeout', async () => {
    const config = {
      method: 'GET',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      },
      timeout: 5000
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .get('/')
      .delay(6000)
      .reply(200, response.data, response.headers);

    try {
      await httpAdapter(config);
      assert.fail('Expected a timeout error to be thrown');
    } catch (error) {
      assert.strictEqual(error.message, 'timeout of 5000ms exceeded');
      assert.strictEqual(error.code, 'ECONNABORTED');
    }
  });

  it('should handle a request with authentication credentials', async () => {
    const config = {
      method: 'GET',
      url: 'http://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      },
      auth: {
        username: 'username',
        password: 'password'
      }
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://example.com')
      .get('/')
      .basicAuth({
        user: config.auth.username,
        pass: config.auth.password
      })
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

  it('should handle an unsupported protocol', async () => {
    const config = {
      method: 'GET',
      url: 'ftp://example.com',
      headers: {
        'User-Agent': 'axios/1.0.0'
      }
    };

    try {
      await httpAdapter(config);
      assert.fail('Expected an error to be thrown');
    } catch (error) {
      assert.strictEqual(error.message, 'Unsupported protocol ftp:');
    }
  });

  it('should handle a request error', async () => {
    const config = {
      method: 'GET',
      url: 'https://example.com/nonexistent',
      headers: {
        'User-Agent': 'axios/1.0.0'
      }
    };

    const error = {
      response: {
        status: 404,
        statusText: 'Not Found'
      },
      message: 'Request failed with status code 404'
    };

    nock('https://example.com')
      .get('/nonexistent')
      .replyWithError(error);

    try {
      await httpAdapter(config);
      assert.fail('Expected an error to be thrown');
    } catch (err) {
      assert.strictEqual(err.response.status, error.response.status);
      assert.strictEqual(err.response.statusText, error.response.statusText);
      assert.strictEqual(err.message, error.message);
    }
  });

  it('should handle a request with a custom socket path', async () => {
    const config = {
      method: 'GET',
      url: 'http://localhost',
      headers: {
        'User-Agent': 'axios/1.0.0'
      },
      socketPath: '/var/run/mysocket.sock'
    };

    const response = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      data: '<html>...</html>'
    };

    nock('http://localhost')
      .get('/')
      .reply(200, response.data, response.headers);

    const result = await httpAdapter(config);

    assert.strictEqual(result.status, response.status);
    assert.strictEqual(result.headers.get('Content-Type'), response.headers['Content-Type']);
    assert.strictEqual(result.data.includes('<html'), true);
  });

});
