//https://chat.openai.com/share/801b9b8b-9b63-485b-8db5-834bb3fc21cc
import assert from 'assert';
import stream from 'stream';
import AxiosTransformStream from '../../../lib/helpers/AxiosTransformStream.js';

describe('AxiosTransformStream', () => {
  it('should inherit from stream.Transform', () => {
    const transformStream = new AxiosTransformStream();

    assert(transformStream instanceof stream.Transform);
  });
});
