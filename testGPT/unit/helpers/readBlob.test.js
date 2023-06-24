//https://chat.openai.com/share/801b9b8b-9b63-485b-8db5-834bb3fc21cc
import assert from 'assert';
import readBlob from '../../../lib/helpers/readBlob.js';

describe('readBlob', () => {
  it('should iterate over the blob stream', async () => {
    const blob = {
      stream: () => ['Hello', ' ', 'world'] // Mock stream implementation
    };

    const result = [];
    for await (const chunk of readBlob(blob)) {
      result.push(chunk);
    }

    assert.deepStrictEqual(result, ['Hello', ' ', 'world']);
  });

  it('should yield the blob arrayBuffer', async () => {
    const arrayBuffer = new Uint8Array([72, 101, 108, 108, 111]).buffer;
    const blob = {
      arrayBuffer: async () => arrayBuffer
    };

    const result = [];
    for await (const chunk of readBlob(blob)) {
      result.push(chunk);
    }

    assert.deepStrictEqual(result, [arrayBuffer]);
  });

  it('should yield the blob itself if no stream, arrayBuffer, or asyncIterator is available', async () => {
    const blob = 'Hello, world';

    const result = [];
    for await (const chunk of readBlob(blob)) {
      result.push(chunk);
    }

    assert.deepStrictEqual(result, [blob]);
  });
});
