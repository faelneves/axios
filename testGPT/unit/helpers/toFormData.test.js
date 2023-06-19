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
