const LWWStateBased = require('../LWW-state-based');

const lww = new LWWStateBased();
const init = { "timestamp": 0, "x": null };

test('init payload', () => {
  expect(lww.query()).toStrictEqual(init);
});

afterEach(() => {
  // reset the payload for all test suits
  lww.payload = init;
});

describe('update', () => {
  test('success - update payload if the input with the correct data structure, e.g. timestamp (date format) and x (any)', () => {
    const result = lww.update("test");
    expect(result.x).toBe("test");
    expect(typeof result.timestamp).toBe("number")
    expect(new Date(result.timestamp)).toBeInstanceOf(Date)
  });

  // the data structure X is allow user to submit the empty value
  test('success - update payload with input X is an empty string', () => {
    const result = lww.update("");
    expect(result.x).toBe("");
  });

  test('success - update payload with input X is an null', () => {
    const result = lww.update(null);
    expect(result.x).toBe(null);
  });

  test('failure - update payload with input X is an undefined', () => {
    expect(() => { lww.update(undefined) }).toThrow('Undefined input value');
  });

  test('failure - not update payload with input X is undefined, and throw Error', () => {
    expect(() => { lww.update() }).toThrow('Undefined input value');
  })
});

describe('query', () => {
  test('success - query the init payload', () => {
    expect(lww.query()).toStrictEqual({ "timestamp": 0, "x": null });
  });

  test('success - query the updated payload', () => {
    const result = lww.update("test");
    expect(lww.query()).toStrictEqual(result);
  })

  test('success - query the updated payload w/ timestamp of input is larger than the timestamp of payload', () => {

  });

  test('success - query the non-update payload w/ timestamp of input is smaller than the timestamp of payload', () => {

  });

  test('failure - query the payload failed when the timestamp is invalid date - string, and throw Error', () => {
    lww.payload.timestamp = 'abc';
    expect(() => { lww.query() }).toThrow('Invalid timestamp');
  });

  test('failure - query the payload failed when the timestamp is invalid date - object, and throw Error', () => {
    lww.payload.timestamp = { a: 'abc' };
    expect(() => { lww.query() }).toThrow('Invalid timestamp');
  });

  test('failure - query the payload failed when the X is undefined, and throw Error', () => {
    lww.payload.x = undefined;
    expect(() => { lww.query() }).toThrow('Invalid timestamp');
  });
})

describe('compare', () => {
  test('success - compare payload and input, and return true. With timestamp of input is larger than the timestamp of payload', () => {

  });

  test('success - compare payload and input, and return true. With timestamp of input is equal to the timestamp of payload', () => {

  });

  test('success - compare payload and input, and return false. With timestamp of input is smaller than the timestamp of payload', () => {

  });

  test('failure - compare payload with an invalid input, and throw Error', () => {

  });

  test('failure - compare payload with input timestamp is invalid date, and throw Error', () => {

  });
})

describe('merge', () => {
  // const payload = {};

  test('success - merge payload and input if compare returned true, and return updated payload by input', () => {

  });

  test('success - merge payload and input if compare returned false, and return update payload by original payload', () => {

  });

  test('failure - update payload failed with input timestamp is invalid date, and throw Error', () => {

  });

  test('failure - update payload failed with input timestamp is negative number (decrementing), and throw Error', () => {

  });
})