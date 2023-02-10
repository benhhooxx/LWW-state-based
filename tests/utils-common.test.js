const CommonUtils = require('../utils/common');

describe('isSubset', () => {
  test("returns true if obj1 is a subset of obj2", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(CommonUtils.isSubset(obj1, obj2)).toBe(true);
  });

  test("returns false if obj1 is not a subset of obj2", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 3 };
    expect(CommonUtils.isSubset(obj1, obj2)).toBe(false);
  });

  test("returns false if obj1 has a property wtesth a different value than obj2", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(CommonUtils.isSubset(obj1, obj2)).toBe(false);
  });
})

describe("isObject", () => {
  test("returns true for an object input", () => {
    const input = { key: "value" };
    expect(CommonUtils.isObject(input)).toBe(true);
  });

  test("returns false for null input", () => {
    const input = null;
    expect(CommonUtils.isObject(input)).toBe(false);
  });

  test("returns false for a non-object input", () => {
    const input = "string";
    expect(CommonUtils.isObject(input)).toBe(false);
  });
});

describe("isValidInput", () => {
  test("returns true for a string input", () => {
    const input = "string";
    expect(CommonUtils.isValidInput(input)).toBe(true);
  });

  test("returns true for a number input", () => {
    const input = 123;
    expect(CommonUtils.isValidInput(input)).toBe(true);
  });

  test("returns false for an object input", () => {
    const input = { key: "value" };
    expect(CommonUtils.isValidInput(input)).toBe(false);
  });

  test("returns false for a boolean input", () => {
    const input = true;
    expect(CommonUtils.isValidInput(input)).toBe(false);
  });
});