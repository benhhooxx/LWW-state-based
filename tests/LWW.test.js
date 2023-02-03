const LWWStateBased = require('../LWW-state-based');

const lww = new LWWStateBased();

test('init payload', () => {
  expect(lww.query()).toStrictEqual({ "timestamp": 0, "x": null });
});

describe('update', () => {
  test('success - update payload if the input with the correct data structure, e.g. timestamp (date format) and x (any)', () => {

  });

  // the data structure X is allow user to submit the empty value
  test('success - update payload with input X is an empty value', () => {

  });

  test('failure - update payload failed with input timestamp is invalid date, and throw Error', () => {

  });
});

describe('query', () => {
  test('success - query the init payload', () => {

  })

  test('success - query the updated payload w/ timestamp of input is larger than the timestamp of payload', () => {

  })

  test('success - query the non-update payload w/ timestamp of input is smaller than the timestamp of payload', () => {

  })

  test('failure - query the payload failed when the timestamp is invalid date, and throw Error', () => {

  })
})

describe('compare', () => {
  test('success - compare payload and input, and return true. With timestamp of input is larger than the timestamp of payload', () => {

  });

  test('success - compare payload and input, and return true. With timestamp of input is equal to the timestamp of payload', () => {

  })

  test('success - compare payload and input, and return false. With timestamp of input is smaller than the timestamp of payload', () => {

  });

  test('failure - compare payload with an invalid input, and throw Error', () => {

  })

  test('failure - compare payload with input timestamp is invalid date, and throw Error', () => {

  })
})