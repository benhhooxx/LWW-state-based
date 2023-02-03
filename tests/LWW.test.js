const LWWStateBased = require('../LWW-state-based');

const lww = new LWWStateBased();

test('init payload', () => {
  expect(lww.query()).toStrictEqual({ "timestamp": 0, "x": null });
});

describe('update', () => {
  test('success - update payload successfully with timestamp of input is larger than the timestamp of payload', () => {

  });

  test('failure - update payload failed with input is an empty value', () => {

  });

  test('failure - update payload failed with input with the invalid date timestamp', () => {

  });

  test('failure - update payload failed with with timestamp of input is smaller than the timestamp of payload', () => {

  });
});

describe('query', () => {
  test('success - query the init payload', () => {

  })

  test('success - query the updated payload w/ timestamp of input is larger than the timestamp of payload', () => {

  })

  test('success - query the non-update payload w/ timestamp of input is smaller than the timestamp of payload', () => {

  })

  test('failure - query the payload failed when the timestamp is invalid date', () => {

  })
})