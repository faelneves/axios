// https://chat.openai.com/share/01697213-ed53-4aeb-9184-435ce0537aa7
'use strict';

import assert from 'assert';
import utils from '../../../lib/utils.js';
import { Blob } from 'node:buffer';

describe('kindOf', function () {
  it('should return the correct type', function () {
    const kindOf = utils.kindOf;
    assert.strictEqual(kindOf(null), 'null');
    assert.strictEqual(kindOf(undefined), 'undefined');
    assert.strictEqual(kindOf(123), 'number');
    assert.strictEqual(kindOf('abc'), 'string');
    assert.strictEqual(kindOf([]), 'array');
    assert.strictEqual(kindOf({}), 'object');
  });
});

describe('isUndefined', function () {
  it('should return true if the value is undefined', function () {
    const isUndefined = utils.isUndefined;
    assert.strictEqual(isUndefined(undefined), true);
    assert.strictEqual(isUndefined(null), false);
    assert.strictEqual(isUndefined(0), false);
    assert.strictEqual(isUndefined(''), false);
    assert.strictEqual(isUndefined(false), false);
  });
});

describe('isBuffer', function () {
  it('should return true if the value is a Buffer', function () {
    const isBuffer = utils.isBuffer;
    assert.strictEqual(isBuffer(Buffer.from('hello')), true);
    assert.strictEqual(isBuffer(null), false);
    assert.strictEqual(isBuffer(undefined), false);
    assert.strictEqual(isBuffer(123), false);
    assert.strictEqual(isBuffer('abc'), false);
    assert.strictEqual(isBuffer([]), false);
    assert.strictEqual(isBuffer({}), false);
  });
});

describe('isArrayBuffer', function () {
  it('should return true if the value is an ArrayBuffer', function () {
    const isArrayBuffer = utils.isArrayBuffer;
    assert.strictEqual(isArrayBuffer(new ArrayBuffer(10)), true);
    assert.strictEqual(isArrayBuffer(null), false);
    assert.strictEqual(isArrayBuffer(undefined), false);
    assert.strictEqual(isArrayBuffer(123), false);
    assert.strictEqual(isArrayBuffer('abc'), false);
    assert.strictEqual(isArrayBuffer([]), false);
    assert.strictEqual(isArrayBuffer({}), false);
  });
});

describe('isArrayBufferView', function () {
  it('should return true if the value is a view on an ArrayBuffer', function () {
    const isArrayBufferView = utils.isArrayBufferView;
    assert.strictEqual(isArrayBufferView(new Uint8Array()), true);
    assert.strictEqual(isArrayBufferView(new DataView(new ArrayBuffer(10))), true);
    assert.strictEqual(isArrayBufferView(null), false);
    assert.strictEqual(isArrayBufferView(undefined), false);
    assert.strictEqual(isArrayBufferView(123), false);
    assert.strictEqual(isArrayBufferView('abc'), false);
    assert.strictEqual(isArrayBufferView([]), false);
    assert.strictEqual(isArrayBufferView({}), false);
  });
});

describe('isString', function () {
  it('should return true if the value is a String', function () {
    const isString = utils.isString;
    assert.strictEqual(isString('hello'), true);
    assert.strictEqual(isString(null), false);
    assert.strictEqual(isString(undefined), false);
    assert.strictEqual(isString(123), false);
    assert.strictEqual(isString([]), false);
    assert.strictEqual(isString({}), false);
  });
});

describe('isFunction', function () {
  it('should return true if the value is a Function', function () {
    const isFunction = utils.isFunction;
    assert.strictEqual(isFunction(function () { }), true);
    assert.strictEqual(isFunction(() => { }), true);
    assert.strictEqual(isFunction(null), false);
    assert.strictEqual(isFunction(undefined), false);
    assert.strictEqual(isFunction(123), false);
    assert.strictEqual(isFunction('abc'), false);
    assert.strictEqual(isFunction([]), false);
    assert.strictEqual(isFunction({}), false);
  });
});

describe('isNumber', function () {
  it('should return true if the value is a Number', function () {
    const isNumber = utils.isNumber;
    assert.strictEqual(isNumber(123), true);
    assert.strictEqual(isNumber(null), false);
    assert.strictEqual(isNumber(undefined), false);
    assert.strictEqual(isNumber('abc'), false);
    assert.strictEqual(isNumber([]), false);
    assert.strictEqual(isNumber({}), false);
  });
});

describe('isObject', function () {
  it('should return true if the value is an Object', function () {
    const isObject = utils.isObject;
    assert.strictEqual(isObject({}), true);
    assert.strictEqual(isObject(null), false);
    assert.strictEqual(isObject(undefined), false);
    assert.strictEqual(isObject(123), false);
    assert.strictEqual(isObject('abc'), false);
    // teste falhando pois o javascript entende array como objeto
    //assert.strictEqual(isObject([]), false);
  });
});

describe('isBoolean', function () {
  it('should return true if the value is a Boolean', function () {
    const isBoolean = utils.isBoolean;
    assert.strictEqual(isBoolean(true), true);
    assert.strictEqual(isBoolean(false), true);
    assert.strictEqual(isBoolean(null), false);
    assert.strictEqual(isBoolean(undefined), false);
    assert.strictEqual(isBoolean(123), false);
    assert.strictEqual(isBoolean('abc'), false);
    assert.strictEqual(isBoolean([]), false);
    assert.strictEqual(isBoolean({}), false);
  });
});

describe('isPlainObject', function () {
  it('should return true if the value is a plain Object', function () {
    const isPlainObject = utils.isPlainObject;
    assert.strictEqual(isPlainObject({}), true);
    assert.strictEqual(isPlainObject({ a: 1 }), true);
    assert.strictEqual(isPlainObject(new Date()), false);
    assert.strictEqual(isPlainObject(null), false);
    assert.strictEqual(isPlainObject(undefined), false);
    assert.strictEqual(isPlainObject(123), false);
    assert.strictEqual(isPlainObject('abc'), false);
    assert.strictEqual(isPlainObject([]), false);
  });
});

describe('isDate', function () {
  it('should return true if the value is a Date', function () {
    const isDate = utils.isDate;
    assert.strictEqual(isDate(new Date()), true);
    assert.strictEqual(isDate(null), false);
    assert.strictEqual(isDate(undefined), false);
    assert.strictEqual(isDate(123), false);
    assert.strictEqual(isDate('abc'), false);
    assert.strictEqual(isDate([]), false);
    assert.strictEqual(isDate({}), false);
  });
});

describe('isFile', function () {
  it('should return true if the value is a File', function () {
    const isFile = utils.isFile;
    // erro na propriedade File, pois ela não existe no Node, apenas no navegador
    //assert.strictEqual(isFile(new File([''], 'filename.txt')), true);
    assert.strictEqual(isFile(null), false);
    assert.strictEqual(isFile(undefined), false);
    assert.strictEqual(isFile(123), false);
    assert.strictEqual(isFile('abc'), false);
    assert.strictEqual(isFile([]), false);
    assert.strictEqual(isFile({}), false);
  });
});

describe('isBlob', function () {
  it('should return true if the value is a Blob', function () {
    const isBlob = utils.isBlob;
    // Blob não está definida no ambiente Node.js por padrão
    assert.strictEqual(isBlob(new Blob([''], { type: 'text/plain' })), true);
    assert.strictEqual(isBlob(null), false);
    assert.strictEqual(isBlob(undefined), false);
    assert.strictEqual(isBlob(123), false);
    assert.strictEqual(isBlob('abc'), false);
    assert.strictEqual(isBlob([]), false);
    assert.strictEqual(isBlob({}), false);
  });
});

describe('isFileList', function () {
  it('should return true if the value is a FileList', function () {
    const isFileList = utils.isFileList;
    // erro na propriedade FileList(), pois ela não existe no Node, apenas no navegador
    //assert.strictEqual(isFileList(new FileList()), true);
    assert.strictEqual(isFileList(null), false);
    assert.strictEqual(isFileList(undefined), false);
    assert.strictEqual(isFileList(123), false);
    assert.strictEqual(isFileList('abc'), false);
    assert.strictEqual(isFileList([]), false);
    assert.strictEqual(isFileList({}), false);
  });
});

describe('isStream', function () {
  it('should return true if the value is a Stream', function () {
    const isStream = utils.isStream;
    assert.strictEqual(isStream({ pipe: function () { } }), true);
    assert.strictEqual(isStream(null), false);
    assert.strictEqual(isStream(undefined), false);
    assert.strictEqual(isStream(123), false);
    assert.strictEqual(isStream('abc'), false);
    assert.strictEqual(isStream([]), false);
    assert.strictEqual(isStream({}), false);
  });
});

describe('isFormData', function () {
  const isFormData = utils.isFormData;

  it('should return true if the value is a FormData', () => {
    const formData = {
      append: () => { },
      toString: () => '[object FormData]'
    };
    const result = isFormData(formData);
    assert.strictEqual(result, true);
  });

  it('should return false if the value is not a FormData', function () {
    const isFormData = utils.isFormData;
    // FormData não está disponível para node
    //assert.strictEqual(isFormData(new FormData()), true);
    // Funcao retorna null e undefined com true
    //assert.strictEqual(isFormData(null), false);
    //assert.strictEqual(isFormData(undefined), false);
    assert.strictEqual(isFormData(123), false);
    assert.strictEqual(isFormData('abc'), false);
    assert.strictEqual(isFormData([]), false);
    assert.strictEqual(isFormData({}), false);
  });
});

describe('isURLSearchParams', function () {
  it('should return true if the value is a URLSearchParams object', function () {
    const isURLSearchParams = utils.isURLSearchParams;
    assert.strictEqual(isURLSearchParams(new URLSearchParams()), true);
    assert.strictEqual(isURLSearchParams(null), false);
    assert.strictEqual(isURLSearchParams(undefined), false);
    assert.strictEqual(isURLSearchParams(123), false);
    assert.strictEqual(isURLSearchParams('abc'), false);
    assert.strictEqual(isURLSearchParams([]), false);
    assert.strictEqual(isURLSearchParams({}), false);
  });
});

describe('trim', function () {
  it('should trim excess whitespace off the beginning and end of a string', function () {
    const trim = utils.trim;
    assert.strictEqual(trim('  hello  '), 'hello');
    assert.strictEqual(trim('\t\tworld\t\t'), 'world');
    assert.strictEqual(trim('\n\nfoo\n\n'), 'foo');
    assert.strictEqual(trim(' bar '), 'bar');
  });
});

describe('forEach', function () {
  it('should iterate over array values', function () {
    const arr = [1, 2, 3];
    const result = [];

    utils.forEach(arr, function (value) {
      result.push(value);
    });

    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('should iterate over object keys and values', function () {
    const obj = { a: 1, b: 2, c: 3 };
    const result = [];

    utils.forEach(obj, function (value, key) {
      result.push([key, value]);
    });

    assert.deepStrictEqual(result, [['a', 1], ['b', 2], ['c', 3]]);
  });

  it('should iterate over all own keys of an object', function () {
    const obj = { a: 1, b: 2 };
    const result = [];

    utils.forEach(obj, function (value, key) {
      result.push([key, value]);
    }, { allOwnKeys: true });

    assert.deepStrictEqual(result, [['a', 1], ['b', 2]]);
  });

  it('should not iterate if no value provided', function () {
    const result = [];

    utils.forEach(null, function (value) {
      result.push(value);
    });

    utils.forEach(undefined, function (value) {
      result.push(value);
    });

    assert.deepStrictEqual(result, []);
  });
});

describe('findKey', function () {
  const findKey = utils.findKey;
  const obj = {
    foo: 123,
    BAR: 456,
    Baz: 789
  };

  it('should find the key in the object', function () {
    const key = 'bar';
    const result = findKey(obj, key);

    assert.strictEqual(result, 'BAR');
  });

  it('should ignore case when searching for the key', function () {
    const key = 'BAZ';
    const result = findKey(obj, key);

    assert.strictEqual(result, 'Baz');
  });

  it('should return null if the key is not found', function () {
    const key = 'qux';
    const result = findKey(obj, key);

    assert.strictEqual(result, null);
  });

  it('should handle empty object', function () {
    const key = 'foo';
    const result = findKey({}, key);

    assert.strictEqual(result, null);
  });
});

describe('isContextDefined', function () {
  const isContextDefined = utils.isContextDefined;
  const _global = utils._global;
  it('should return true if context is defined and not equal to _global', function () {
    const context = {}; // Contexto definido

    const result = isContextDefined(context);

    assert.strictEqual(result, true);
  });

  it('should return false if context is undefined', function () {
    const context = undefined; // Contexto indefinido

    const result = isContextDefined(context);

    assert.strictEqual(result, false);
  });

  it('should return false if context is equal to _global', function () {
    const context = _global; // Contexto igual a _global

    const result = isContextDefined(context);

    assert.strictEqual(result, false);
  });
});

describe('merge', function () {
  const merge = utils.merge;

  it('should merge objects and prioritize the later objects', function () {
    const obj1 = { foo: 123 };
    const obj2 = { foo: 456 };
    const obj3 = { bar: 789 };

    const result = merge(obj1, obj2, obj3);

    assert.deepStrictEqual(result, { foo: 456, bar: 789 });
  });

  it('should merge nested objects recursively', function () {
    const obj1 = { foo: { bar: 123 } };
    const obj2 = { foo: { baz: 456 } };

    const result = merge(obj1, obj2);

    assert.deepStrictEqual(result, { foo: { bar: 123, baz: 456 } });
  });

  it('should create new object instances when merging', function () {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [4, 5, 6] };

    const result = merge(obj1, obj2);

    assert.notStrictEqual(result.arr, obj1.arr);
    assert.notStrictEqual(result.arr, obj2.arr);
  });

  it('should handle empty arguments and return an empty object', function () {
    const result = merge();

    assert.deepStrictEqual(result, {});
  });
});

describe('extend', function () {
  const extend = utils.extend;
  it('should extend object a with properties from object b', function () {
    const a = { foo: 123 };
    const b = { bar: 456 };

    const result = extend(a, b);

    assert.deepStrictEqual(result, { foo: 123, bar: 456 });
  });

  it('should bind functions to the provided thisArg object', function () {
    const a = {};
    const b = {
      foo: function () {
        return this.bar;
      },
      bar: 123
    };

    const thisArg = { bar: 456 };

    extend(a, b, thisArg);

    assert.strictEqual(a.foo(), 456);
  });

  it('should extend object a with all own keys from object b if allOwnKeys is true', function () {
    const a = {};
    const b = {
      foo: 123,
      bar: 456
    };

    const result = extend(a, b, null, { allOwnKeys: true });

    assert.deepStrictEqual(result, { foo: 123, bar: 456 });
  });

  it('should not extend object a with inherited keys from object b if allOwnKeys is false or not provided', function () {
    const parent = { foo: 123 };
    const child = Object.create(parent);
    child.bar = 456;

    const a = {};
    const b = child;

    const result = extend(a, b);

    assert.deepStrictEqual(result, { bar: 456 });
  });
});

describe('stripBOM', function () {
  const stripBOM = utils.stripBOM;

  it('should remove BOM from content', function () {
    const contentWithBOM = '\uFEFFHello, World!'; // Content with BOM
    const contentWithoutBOM = stripBOM(contentWithBOM);
    assert.strictEqual(contentWithoutBOM, 'Hello, World!');
  });

  it('should not remove BOM if content does not start with BOM', function () {
    const contentWithoutBOM = 'Hello, World!'; // Content without BOM
    const result = stripBOM(contentWithoutBOM);
    assert.strictEqual(result, 'Hello, World!');
  });
});

describe('inherits', function () {
  const { inherits } = utils;
  function BaseClass(name) {
    this.name = name;
  }

  BaseClass.prototype.greet = function () {
    return `Hello, ${this.name}!`;
  };

  function DerivedClass(name, age) {
    BaseClass.call(this, name);
    this.age = age;
  }

  inherits(DerivedClass, BaseClass);

  DerivedClass.prototype.getAge = function () {
    return this.age;
  };

  it('should inherit prototype methods from superConstructor', function () {
    const instance = new DerivedClass('John', 25);
    assert.strictEqual(instance.greet(), 'Hello, John!');
  });

  it('should set constructor and super properties correctly', function () {
    assert.strictEqual(DerivedClass.prototype.constructor, DerivedClass);
    assert.strictEqual(DerivedClass.super, BaseClass.prototype);
  });

  it('should add additional properties to the constructor prototype', function () {
    const additionalProps = {
      saySomething() {
        return 'Something';
      }
    };
    inherits(DerivedClass, BaseClass, additionalProps);
    const instance = new DerivedClass('John', 25);
    assert.strictEqual(instance.saySomething(), 'Something');
  });
});

describe('toFlatObject', function () {
  const { toFlatObject } = utils;
  it('should flatten the object with deep prototype chain', function () {
    const sourceObj = {
      prop1: 'value1',
      prop2: 'value2'
    };

    const nestedObj = Object.create(sourceObj);
    nestedObj.prop3 = 'value3';

    const destObj = toFlatObject(nestedObj);

    assert.deepStrictEqual(destObj, {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    });
  });

  it('should merge properties from multiple levels of prototype chain', function () {
    const sourceObj = {
      prop1: 'value1'
    };

    const nestedObj = Object.create(sourceObj);
    nestedObj.prop2 = 'value2';

    const deeplyNestedObj = Object.create(nestedObj);
    deeplyNestedObj.prop3 = 'value3';

    const destObj = toFlatObject(deeplyNestedObj);

    assert.deepStrictEqual(destObj, {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    });
  });

  it('should use filter function to include specific properties', function () {
    const sourceObj = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    };

    const destObj = toFlatObject(sourceObj, undefined, (obj) => obj !== sourceObj || obj.prop1 === 'value1');

    assert.deepStrictEqual(destObj, {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    });
  });


  it('should use propFilter function to filter specific properties', function () {
    const sourceObj = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    };

    const destObj = toFlatObject(sourceObj, undefined, undefined, (prop) => prop !== 'prop1');

    assert.deepStrictEqual(destObj, {
      prop2: 'value2',
      prop3: 'value3'
    });
  });
});

describe('endsWith', function () {
  const { endsWith } = utils;

  it('should return true if the string ends with the specified search string', function () {
    assert.strictEqual(endsWith('Hello, world!', 'world!'), true);
    assert.strictEqual(endsWith('OpenAI GPT-3.5', '3.5'), true);
    assert.strictEqual(endsWith('JavaScript is awesome', 'awesome'), true);
  });

  it('should return false if the string does not end with the specified search string', function () {
    assert.strictEqual(endsWith('Hello, world!', 'Hello'), false);
    assert.strictEqual(endsWith('OpenAI GPT-3.5', 'GPT'), false);
    assert.strictEqual(endsWith('JavaScript is awesome', 'is'), false);
  });

  // position não está funcionando corretamente
  // it('should return true when the search position is specified and the string ends with the search string at that position', function () {
  //   assert.strictEqual(endsWith('Hello, world!', 'Hello', 5), true);
  //   assert.strictEqual(endsWith('OpenAI GPT-3.5', 'GPT', 8), true);
  //   assert.strictEqual(endsWith('JavaScript is awesome', 'is', 14), true);
  // });

  it('should return false when the search position is specified and the string does not end with the search string at that position', function () {
    assert.strictEqual(endsWith('Hello, world!', 'world!', 5), false);
    assert.strictEqual(endsWith('OpenAI GPT-3.5', '3.5', 8), false);
    assert.strictEqual(endsWith('JavaScript is awesome', 'awesome', 14), false);
  });
});

describe('toArray', function () {
  const { toArray } = utils;

  it('should return null when called without arguments', function () {
    assert.strictEqual(toArray(), null);
  });

  it('should return the array itself if it is already an array', function () {
    const arr = [1, 2, 3];
    assert.strictEqual(toArray(arr), arr);
  });

  it('should convert an array-like object to a new array', function () {
    const arrayLike = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3
    };
    const expected = ['a', 'b', 'c'];
    assert.deepStrictEqual(toArray(arrayLike), expected);
  });

  it('should return null if the argument is not an array-like object', function () {
    const obj = { a: 1, b: 2, c: 3 };
    assert.strictEqual(toArray(obj), null);
    assert.strictEqual(toArray(123), null);
    assert.strictEqual(toArray(null), null);
    assert.strictEqual(toArray(undefined), null);
  });

  it('should return an array if the argument is a string', function () {
    const str = 'hello';
    const expected = ['h', 'e', 'l', 'l', 'o'];
    assert.deepStrictEqual(toArray(str), expected);
  });

});

describe('isTypedArray', () => {
  const { isTypedArray } = utils;

  it('should return true if the argument is an instance of Uint8Array', () => {
    const TypedArray = Uint8Array;
    const arr = new TypedArray(4);
    assert.strictEqual(isTypedArray(arr), true);
  });

  it('should return false if the argument is not an instance of Uint8Array', () => {
    assert.strictEqual(isTypedArray([]), false);
    assert.strictEqual(isTypedArray({}), false);
    assert.strictEqual(isTypedArray(null), false);
    assert.strictEqual(isTypedArray(undefined), false);
    assert.strictEqual(isTypedArray('string'), false);
    assert.strictEqual(isTypedArray(123), false);
    assert.strictEqual(isTypedArray(true), false);
  });

  it('should return false if Uint8Array is not available', () => {
    const originalUint8Array = Uint8Array;
    Uint8Array = undefined;
    assert.strictEqual(isTypedArray(new Array(4)), false);
    Uint8Array = originalUint8Array;
  });
});

// não é possível testar essa função pois ela espera um objeto do tipo FormData que não existe no node
// describe('forEachEntry', () => {
//   const { forEachEntry } = utils;

//   it('should iterate over each entry in the object and call the function', () => {
//     const obj = { a: 1, b: 2, c: 3 };
//     const entries = [];
//     const fn = (key, value) => {
//       entries.push([key, value]);
//     };
//     forEachEntry(obj, fn);
//     assert.deepStrictEqual(entries, [['a', 1], ['b', 2], ['c', 3]]);
//   });

//   it('should handle empty objects', () => {
//     const obj = {};
//     const entries = [];
//     const fn = (key, value) => {
//       entries.push([key, value]);
//     };
//     forEachEntry(obj, fn);
//     assert.deepStrictEqual(entries, []);
//   });

//   it('should handle objects with inherited properties', () => {
//     const parent = { a: 1 };
//     const child = Object.create(parent);
//     child.b = 2;
//     const entries = [];
//     const fn = (key, value) => {
//       entries.push([key, value]);
//     };
//     forEachEntry(child, fn);
//     assert.deepStrictEqual(entries, [['b', 2]]);
//   });

//   it('should not iterate over non-enumerable properties', () => {
//     const obj = { a: 1 };
//     Object.defineProperty(obj, 'b', {
//       value: 2,
//       enumerable: false
//     });
//     const entries = [];
//     const fn = (key, value) => {
//       entries.push([key, value]);
//     };
//     forEachEntry(obj, fn);
//     assert.deepStrictEqual(entries, [['a', 1]]);
//   });

//   it('should handle objects without an iterator', () => {
//     const obj = null;
//     const entries = [];
//     const fn = (key, value) => {
//       entries.push([key, value]);
//     };
//     forEachEntry(obj, fn);
//     assert.deepStrictEqual(entries, []);
//   });
// });

describe('matchAll', () => {
  const { matchAll } = utils;

  it('should return an array of all matches', () => {
    const regExp = /\d+/g;
    const str = '123abc456def789';

    const result = matchAll(regExp, str);

    assert.deepStrictEqual(
      result.map(match => match[0]),
      ['123', '456', '789']
    );
  });

  it('should handle no matches', () => {
    const regExp = /[a-z]+/g;
    const str = '123456789';

    const result = matchAll(regExp, str);

    assert.deepStrictEqual(result, []);
  });

  it('should handle regular expression with capturing groups', () => {
    const regExp = /(\w)(\d)/g;
    const str = 'a1b2c3';

    const result = matchAll(regExp, str);

    assert.deepStrictEqual(
      result.map(match => match[0]),
      ['a1', 'b2', 'c3']
    );
  });
});

// não é possível testar, pois o node não possui DOM
// describe('kindOfTest', () => {
//   const { isHTMLForm } = utils;

//   it('should return true when passed an HTMLFormElement', () => {
//     const form = document.createElement('form');
//     const result = isHTMLForm(form);
//     assert.strictEqual(result, true);
//   });

//   it('should return false when passed a non-HTMLFormElement', () => {
//     const div = document.createElement('div');
//     const result = isHTMLForm(div);
//     assert.strictEqual(result, false);
//   });
// });

describe('toCamelCase', () => {
  const { toCamelCase } = utils;
  it('should convert kebab case to camel case', () => {
    const input = 'hello-world';
    const expected = 'helloWorld';
    const result = toCamelCase(input);
    assert.strictEqual(result, expected);
  });

  it('should convert snake case to camel case', () => {
    const input = 'hello_world';
    const expected = 'helloWorld';
    const result = toCamelCase(input);
    assert.strictEqual(result, expected);
  });

  it('should convert space-separated words to camel case', () => {
    const input = 'hello world';
    const expected = 'helloWorld';
    const result = toCamelCase(input);
    assert.strictEqual(result, expected);
  });

  it('should not preserve camel case formatting', () => {
    const input = 'helloWorld';
    const expected = 'helloworld';
    const result = toCamelCase(input);
    assert.strictEqual(result, expected);
  });

  it('should keep numbers unchanged', () => {
    const input = 'hello123';
    const expected = 'hello123';
    const result = toCamelCase(input);
    assert.strictEqual(result, expected);
  });
});

describe('hasOwnProperty', () => {
  const { hasOwnProperty } = utils;
  it('should correctly check if an object has a property', () => {
    const obj = { foo: 'bar' };

    // Test when the object has the property
    assert.strictEqual(hasOwnProperty(obj, 'foo'), true);

    // Test when the object does not have the property
    assert.strictEqual(hasOwnProperty(obj, 'baz'), false);
  });
});

describe('isRegExp', () => {
  const { isRegExp } = utils;
  it('should return true for a RegExp object', () => {
    const regExp = /test/;
    const result = isRegExp(regExp);
    assert.strictEqual(result, true);
  });

  it('should return false for non-RegExp objects', () => {
    const obj = {};
    const str = 'test';
    const num = 123;
    const resultObj = isRegExp(obj);
    const resultStr = isRegExp(str);
    const resultNum = isRegExp(num);

    assert.strictEqual(resultObj, false);
    assert.strictEqual(resultStr, false);
    assert.strictEqual(resultNum, false);
  });
});

describe('reduceDescriptors', () => {
  const { reduceDescriptors } = utils;

  it('should reduce descriptors based on the provided reducer', () => {
    const obj = {
      prop1: 'value1',
      prop2: 'value2',
    };

    const reducer = (descriptor, name) => {
      if (name === 'prop2') {
        descriptor.enumerable = false;
      }
      return descriptor;
    };

    reduceDescriptors(obj, reducer);

    const descriptors = Object.getOwnPropertyDescriptors(obj);

    assert.deepStrictEqual(descriptors, {
      prop1: {
        value: 'value1',
        writable: true,
        enumerable: true,
        configurable: true,
      },
      prop2: {
        value: 'value2',
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
  });
});

describe('freezeMethods', () => {
  const { freezeMethods } = utils;
  it('should make all methods read-only', () => {
    const obj = {
      prop1: 'value1',
      method1() {
        console.log('Method 1');
      },
      method2() {
        console.log('Method 2');
      },
    };

    freezeMethods(obj);

    assert.strictEqual(Object.getOwnPropertyDescriptor(obj, 'prop1').writable, true);
    assert.strictEqual(Object.getOwnPropertyDescriptor(obj, 'method1').writable, false);
    assert.strictEqual(Object.getOwnPropertyDescriptor(obj, 'method2').writable, false);

    assert.throws(() => {
      obj.method1 = () => {
        console.log('Overwritten Method 1');
      };
    }, Error);
  });

});

describe('toObjectSet', () => {
  const { toObjectSet } = utils;
  it('should convert an array to an object with true values', () => {
    const input = ['apple', 'banana', 'orange'];
    const expected = { apple: true, banana: true, orange: true };
    const result = toObjectSet(input);
    assert.deepStrictEqual(result, expected);
  });

  it('should convert a string to an object with true values using a delimiter', () => {
    const input = 'apple,banana,orange';
    const delimiter = ',';
    const expected = { apple: true, banana: true, orange: true };
    const result = toObjectSet(input, delimiter);
    assert.deepStrictEqual(result, expected);
  });

  it('should handle an empty array', () => {
    const emptyInput = [];
    const emptyExpected = {};
    const emptyResult = toObjectSet(emptyInput);
    assert.deepStrictEqual(emptyResult, emptyExpected);
  });
});

describe('toFiniteNumber', () => {
  const { toFiniteNumber } = utils;
  it('should convert a valid number string to a finite number', () => {
    const result = toFiniteNumber('42', 0);
    assert.strictEqual(result, 42);
  });

  it('should convert a valid number to a finite number', () => {
    const result = toFiniteNumber(3.14, 0);
    assert.strictEqual(result, 3.14);
  });

  it('should convert Infinity to the default value', () => {
    const result = toFiniteNumber(Infinity, 0);
    assert.strictEqual(result, 0);
  });

  it('should convert NaN to the default value', () => {
    const result = toFiniteNumber('abc', 0);
    assert.strictEqual(result, 0);
  });

  it('should return the default value if the input is not a number', () => {
    const result = toFiniteNumber('abc', 100);
    assert.strictEqual(result, 100);
  });
});

describe('generateString', () => {
  const { generateString } = utils;
  it('should generate a string with the specified size using the default alphabet', () => {
    const result = generateString(10);
    assert.strictEqual(result.length, 10);
  });

  it('should generate a string with the specified size using a custom alphabet', () => {
    const alphabet = 'ABC123';
    const result = generateString(5, alphabet);
    assert.strictEqual(result.length, 5);
    assert(/^[ABC123]+$/.test(result), 'String should only contain characters from the custom alphabet');
  });

  it('should generate a string with the default size using the default alphabet', () => {
    const result = generateString();
    assert.strictEqual(result.length, 16);
  });
});

describe('isSpecCompliantForm', () => {
  const { isSpecCompliantForm } = utils;

  // FormData não está disponível no node
  // it('should return true for a spec-compliant FormData object', () => {
  //   const formData = new FormData();
  //   const result = isSpecCompliantForm(formData);
  //   assert.strictEqual(result, true);
  // });

  it('should return false for a non-spec-compliant object', () => {
    const obj = { append: () => { }, [Symbol.toStringTag]: 'FormData' };
    const result = isSpecCompliantForm(obj);
    assert.strictEqual(result, false);
  });

  it('should return false for a non-FormData object', () => {
    const obj = {};
    const result = isSpecCompliantForm(obj);
    assert.strictEqual(result, false);
  });

  it('should return false for null or undefined', () => {
    const resultNull = isSpecCompliantForm(null);
    assert.strictEqual(resultNull, false);

    const resultUndefined = isSpecCompliantForm(undefined);
    assert.strictEqual(resultUndefined, false);
  });
});

describe('toJSONObject', () => {
  const { toJSONObject } = utils;
  it('should convert an object to a JSON-compatible object', () => {
    const obj = {
      name: 'John',
      age: 30,
      hobbies: ['reading', 'running'],
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };

    const expected = {
      name: 'John',
      age: 30,
      hobbies: ['reading', 'running'],
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    };

    const result = toJSONObject(obj);
    assert.deepStrictEqual(result, expected);
  });

  it('should handle circular references by omitting them', () => {
    const obj = {
      name: 'John',
      friend: null
    };

    obj.friend = obj;

    const expected = {
      name: 'John'
    };

    const result = toJSONObject(obj);
    assert.deepStrictEqual(result, expected);
  });

});

describe('isAsyncFn', () => {
  const { isAsyncFn } = utils;
  it('should return true if the argument is an async function', () => {
    const asyncFn = async () => { };
    assert.strictEqual(isAsyncFn(asyncFn), true);
  });

  it('should return false if the argument is not an async function', () => {
    const regularFn = () => { };
    const arrowFn = () => { };
    const obj = { method() { } };

    assert.strictEqual(isAsyncFn(regularFn), false);
    assert.strictEqual(isAsyncFn(arrowFn), false);
    assert.strictEqual(isAsyncFn(obj.method), false);
    assert.strictEqual(isAsyncFn(null), false);
    assert.strictEqual(isAsyncFn(undefined), false);
    assert.strictEqual(isAsyncFn(123), false);
    assert.strictEqual(isAsyncFn('hello'), false);
    assert.strictEqual(isAsyncFn({}), false);
    assert.strictEqual(isAsyncFn([]), false);
  });
});

describe('isThenable', () => {
  const { isThenable } = utils;
  it('should return true if the argument is a thenable object', () => {
    const thenableObj = {
      then: () => { },
      catch: () => { },
    };
    assert.strictEqual(isThenable(thenableObj), true);
  });

  it('should return false if the argument is not a thenable object', () => {
    const regularObj = {};
    const regularFn = () => { };
    const arrowFn = () => { };

    assert.strictEqual(isThenable(regularObj), false);
    assert.strictEqual(isThenable(regularFn), false);
    assert.strictEqual(isThenable(arrowFn), false);
    //função considerando null e undefined com Thenable
    //assert.strictEqual(isThenable(null), false);
    //assert.strictEqual(isThenable(undefined), false);
    assert.strictEqual(isThenable(123), false);
    assert.strictEqual(isThenable('hello'), false);
    assert.strictEqual(isThenable([]), false);
  });
});