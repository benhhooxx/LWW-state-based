const LWWDictionaryStateBased = require('../LWW-dictionary-state-based');
const ErrorMessage = require('../constants/error');

const lww = new LWWDictionaryStateBased();
const addSetInit = {};
const removeSetInit = {};

test('init payload', () => {
  expect(lww.addSet).toStrictEqual(addSetInit);
  expect(lww.removeSet).toStrictEqual(removeSetInit);
});

afterEach(() => {
  // reset the payload for all test suits
  lww.addSet = addSetInit;
  lww.removeSet = removeSetInit;
});

describe('add', () => {
  test('success - update addSet if the input with number', () => {
    lww.add(1);
    expect(lww.addSet).toStrictEqual({ 1: lww.addSet[1] })
  });

  test('success - update addSet if the input with string', () => {
    lww.add("test_element");
    expect(lww.addSet).toStrictEqual({ "test_element": lww.addSet["test_element"] })
  });

  test('failed - update addSet if the input with null, and throw Error', () => {
    expect(() => { lww.add() }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - update addSet if the input with empty string, and throw Error', () => {
    expect(() => { lww.add("") }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - update addSet if the input with undefined, and throw Error', () => {
    expect(() => { lww.add(undefined) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - update addSet if the input with object, and throw Error', () => {
    expect(() => { lww.add({ "test_element": 1676029793371 }) }).toThrow(ErrorMessage.INVALID_DATA_FORMAT);
  });
});

describe('remove', () => {
  test('success - update removeSet if the input with number', () => {
    lww.add(1);
    lww.remove(1);
    expect(lww.removeSet).toStrictEqual({ 1: lww.removeSet[1] })
  });

  test('success - update removeSet if the input with string', () => {
    lww.add("test_element");
    lww.remove("test_element");
    expect(lww.removeSet).toStrictEqual({ "test_element": lww.removeSet["test_element"] })
  });

  test('failed - not update removeSet if the field is not existed in addSet', () => {
    lww.remove(2);
    expect(lww.removeSet).toStrictEqual({})
  });

  test('failed - not update removeSet if the input with null, and throw Error', () => {
    expect(() => { lww.remove() }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - not update removeSet if the input with empty string, and throw Error', () => {
    expect(() => { lww.remove("") }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - not update removeSet if the input with undefined, and throw Error', () => {
    expect(() => { lww.remove(undefined) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failed - not update removeSet if the input with object, and throw Error', () => {
    expect(() => { lww.remove({ "test_element": 1676029793371 }) }).toThrow(ErrorMessage.INVALID_DATA_FORMAT);
  });
});

describe('lookup', () => {
  test('success - run the lookup with number, and return true', () => {
    lww.add(1);
    expect(lww.lookup({ 1: lww.addSet[1] })).toBe(true);
  })

  test('success - run the lookup with string, and return true', () => {
    lww.add("test_element");
    expect(lww.lookup({ "test_element": lww.addSet["test_element"] })).toBe(true);
  })

  test('success - run the lookup with string, and return false', () => {
    lww.add("test_element");
    expect(lww.lookup({ "2": 1676029793371 })).toBe(false);
  })

  test('failed - not run the lookup, and throw Error', () => {
    expect(() => { lww.lookup(1) }).toThrow(ErrorMessage.INVALID_DATA_FORMAT);
  });
});

describe('compare', () => {
  let lwwSetA;
  let lwwSetB;

  beforeEach(() => {
    lwwSetA = new LWWDictionaryStateBased();
    lwwSetB = new LWWDictionaryStateBased();
  });

  test("success - should return true when addSet and removeSet of both LWWDictionaryStateBased objects are equal", () => {
    lwwSetA.addSet = { a: 1, b: 2 };
    lwwSetA.removeSet = { c: 3 };
    lwwSetB.addSet = { a: 1, b: 2 };
    lwwSetB.removeSet = { c: 3 };

    expect(lwwSetA.compare(lwwSetB)).toBe(true);
  });

  test("success - should return false when addSet of LWWDictionaryStateBased object A is not a subset of addSet of LWWDictionaryStateBased object B", () => {
    lwwSetA.addSet = { a: 1, b: 2, d: 3 };
    lwwSetA.removeSet = { c: 3 };
    lwwSetB.addSet = { a: 1, b: 2, d: 4 };
    lwwSetB.removeSet = { c: 3 };

    expect(lwwSetA.compare(lwwSetB)).toBe(false);
  });

  test("success - should return false when removeSet of LWWDictionaryStateBased object A is not a subset of removeSet of LWWDictionaryStateBased object B", () => {
    lwwSetA.addSet = { a: 1, b: 2, d: 3 };
    lwwSetA.removeSet = { d: 3 };
    lwwSetB.addSet = { a: 1, b: 2, d: 4 };
    lwwSetB.removeSet = { c: 3 };

    expect(lwwSetA.compare(lwwSetB)).toBe(false);
  });

  test("failed - replica removeSet invalid input, and throw Error", () => {
    const lwwSetC = { addSet: { a: 1, b: 2, d: 4 } };

    expect(() => { lwwSetA.compare(lwwSetC) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test("failed - replica addSet invalid input, and throw Error", () => {
    const lwwSetC = { removeSet: { a: 1, b: 2, d: 4 } };

    expect(() => { lwwSetA.compare(lwwSetC) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });
});

describe('merge', () => {
  let lwwSetA;
  let lwwSetB;

  beforeEach(() => {
    lwwSetA = new LWWDictionaryStateBased();
    lwwSetB = new LWWDictionaryStateBased();
  });

  test("success - should return a new object with addSet and removeSet of both LWWDictionaryStateBased objects combined", () => {
    lwwSetA.addSet = { a: 1, b: 2 };
    lwwSetA.removeSet = { c: 3 };
    lwwSetB.addSet = { d: 4, e: 5 };
    lwwSetB.removeSet = { f: 6, g: 7 };

    const result = lwwSetA.merge(lwwSetB);

    expect(result.addSet).toEqual({ a: 1, b: 2, d: 4, e: 5 });
    expect(result.removeSet).toEqual({ c: 3, f: 6, g: 7 });
  });

  test("success - should return a new object with addSet and removeSet having latest timestamps for duplicate elements", () => {
    lwwSetA.addSet = { a: 1, b: 2 };
    lwwSetA.removeSet = { c: 3 };
    lwwSetB.addSet = { a: 4, b: 5 };
    lwwSetB.removeSet = { c: 6, d: 7 };

    const result = lwwSetA.merge(lwwSetB);

    expect(result.addSet).toEqual({ a: 4, b: 5 });
    expect(result.removeSet).toEqual({ c: 6, d: 7 });
  });

  test("failed - replica removeSet invalid input, and throw Error", () => {
    const lwwSetC = { addSet: { a: 1 } };

    expect(() => { lwwSetA.merge(lwwSetC) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test("failed - replica addSet invalid input, and throw Error", () => {
    const lwwSetC = { removeSet: { a: 1 } };

    expect(() => { lwwSetA.merge(lwwSetC) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });
});