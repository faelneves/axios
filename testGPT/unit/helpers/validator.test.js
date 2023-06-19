import assert from 'assert';
import validator from '../../../lib/helpers/validator.js';

describe('validator.assertOptions', () => {
  it('should throw an error if options is not an object', () => {
    assert.throws(() => {
      validator.assertOptions('notAnObject', {});
    }, /^AxiosError: options must be an object$/);
  });

  it('should throw an error if an unknown option is provided', () => {
    assert.throws(() => {
      validator.assertOptions({ unknownOption: 'value' }, {}, false);
    }, /^AxiosError: Unknown option unknownOption$/);
  });

  it('should validate options against the schema', () => {
    const schema = {
      name: validator.validators.string,
      age: validator.validators.number,
      isAlive: validator.validators.boolean
    };

    assert.doesNotThrow(() => {
      validator.assertOptions({ name: 'John', age: 25, isAlive: true }, schema);
    });

    assert.throws(() => {
      validator.assertOptions({ name: 'John', age: '25', isAlive: true }, schema);
    }, /^AxiosError: option age must be a number$/);

    assert.throws(() => {
      validator.assertOptions({ name: 'John', age: 25, isAlive: 'yes' }, schema);
    }, /^AxiosError: option isAlive must be a boolean$/);
  });

  it('should handle deprecated transitional options', () => {
    const schema = {
      oldOption: validator.validators.transitional(validator.validators.string, 'v2.0.0', 'This option is deprecated.')
    };

    assert.throws(() => {
      validator.assertOptions({ newOption: 'value' }, schema);
    }, /^AxiosError: Unknown option newOption$/);
  });
});
