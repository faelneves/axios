//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import toFormData from '../../../lib/helpers/toFormData.js';

describe('toFormData', () => {
  it('should throw an error if target is not an object', () => {
    assert.throws(() => {
      toFormData('test');
    }, TypeError);
  });

  it('should throw an error if data is not an object', () => {
    assert.throws(() => {
      toFormData(null);
    }, TypeError);
  });
});
