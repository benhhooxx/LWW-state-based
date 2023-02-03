const LLWStateBased = require('../LWW-state-based');

const _LLWStateBased = new LLWStateBased();

test('init payload', () => {
  expect(_LLWStateBased.query()).toStrictEqual({ "timestamp": 0, "x": null });
});