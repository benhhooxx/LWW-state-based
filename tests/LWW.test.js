const LLWStateBased = require('../LWW-state-based');

const _LLWStateBased = new LLWStateBased();

test('init payload', () => {
  expect(_LLWStateBased.query()).toStrictEqual({ "timestamp": 0, "x": null });
});

describe('update payload', () => {
  test('success - update payload successfully with timestamp of input is larger than the timestamp of payload', () => {

  });

  test('failure - update payload failed with input is an empty value', () => {

  });

  test('failure - update payload failed with input with the invalid days timestamp', () => {

  });

  test('failure - update payload failed with with timestamp of input is smaller than the timestamp of payload', () => {

  });
});