//https://chat.openai.com/share/fcc9fec7-c4f7-49f2-af9c-d5cf01516eb5
import assert from 'assert';
import mergeConfig from '../../../lib/core/mergeConfig.js';

describe('mergeConfig', () => {
  it('should merge two configuration objects together', () => {
    const config1 = {
      baseURL: 'https://api.example.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token1'
      },
      timeout: 5000
    };

    const config2 = {
      method: 'get',
      headers: {
        'X-Custom-Header': 'Custom Value',
        Authorization: 'Bearer token2'
      },
      responseType: 'json',
      timeout: 10000
    };

    const mergedConfig = mergeConfig(config1, config2);

    assert.deepStrictEqual(mergedConfig, {
      baseURL: 'https://api.example.com',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'Custom Value',
        Authorization: 'Bearer token2'
      },
      responseType: 'json',
      timeout: 10000
    });
  });

  it('should handle undefined values in the configuration objects', () => {
    const config1 = {
      baseURL: 'https://api.example.com',
      timeout: 5000
    };

    const config2 = {
      method: 'get',
      responseType: 'json',
      timeout: undefined
    };

    const mergedConfig = mergeConfig(config1, config2);

    assert.deepStrictEqual(mergedConfig, {
      baseURL: 'https://api.example.com',
      method: 'get',
      responseType: 'json',
      timeout: 5000
    });
  });

});
