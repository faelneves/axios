//https://chat.openai.com/share/765c2607-d644-4aa5-bd79-b1cdb9a22cf6
import assert from 'assert';
import deprecatedMethod from '../../../lib/helpers/deprecatedMethod.js';

describe('deprecatedMethod', () => {
  let consoleOutput = [];
  let originalConsoleWarn;

  beforeEach(() => {
    originalConsoleWarn = console.warn;
    console.warn = (message) => {
      consoleOutput.push(message);
    };
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
    consoleOutput = [];
  });

  it('should display deprecation warning without alternate method and documentation', () => {
    deprecatedMethod('deprecatedMethod');
    assert.deepStrictEqual(consoleOutput, [
      'DEPRECATED method `deprecatedMethod`. This method will be removed in a future release.'
    ]);
  });

  it('should display deprecation warning with alternate method', () => {
    deprecatedMethod('deprecatedMethod', 'newMethod');
    assert.deepStrictEqual(consoleOutput, [
      'DEPRECATED method `deprecatedMethod`. Use `newMethod` instead. This method will be removed in a future release.'
    ]);
  });

  it('should display deprecation warning with alternate method and documentation', () => {
    deprecatedMethod('deprecatedMethod', 'newMethod', 'https://example.com/docs');
    assert.deepStrictEqual(consoleOutput, [
      'DEPRECATED method `deprecatedMethod`. Use `newMethod` instead. This method will be removed in a future release.',
      'For more information about usage see https://example.com/docs'
    ]);
  });
});
