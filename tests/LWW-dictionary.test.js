const LWWDictionaryStateBased = require('../LWW-dictionary-state-based');

const lww = new LWWDictionaryStateBased();
const addSetInit = [];
const removeSetInit = [];

test('init payload', () => {
  expect(lww.addSet).toStrictEqual(addSetInit);
  expect(lww.removeSet).toStrictEqual(removeSetInit);
});