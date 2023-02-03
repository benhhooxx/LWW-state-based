const LWWStateBased = require('../LWW-state-based');
const ErrorMessage = require('../constants/error');

const lww = new LWWStateBased();
const lww2 = new LWWStateBased();
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
    expect(() => { lww.update(undefined) }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
  });

  test('failure - not update payload with input X is undefined, and throw Error', () => {
    expect(() => { lww.update() }).toThrow(ErrorMessage.UNDEFINED_INPUT_VALUE);
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

  test('failure - query the payload failed when the timestamp is invalid date - string, and throw Error', () => {
    lww.payload.timestamp = 'abc';
    expect(() => { lww.query() }).toThrow(ErrorMessage.INVALID_TIMESTAMP);
  });

  test('failure - query the payload failed when the timestamp is invalid date - object, and throw Error', () => {
    lww.payload.timestamp = { a: 'abc' };
    expect(() => { lww.query() }).toThrow(ErrorMessage.INVALID_TIMESTAMP);
  });

  test('failure - query the payload failed when the X is undefined, and throw Error', () => {
    lww.payload.x = undefined;
    expect(() => { lww.query() }).toThrow(ErrorMessage.INVALID_TIMESTAMP);
  });
})

describe('compare', () => {
  test('success - compare payload and input, and return true. With timestamp of input is larger than the timestamp of payload', () => {
    lww.update("test");
    setTimeout(async () => {
      lww2.update("test2");
      const replica = lww.query();
      const replica2 = lww2.query();
      expect(lww.compare(replica, replica2)).toBe(true);
    }, [100])
  });

  test('success - compare payload and input, and return true. With timestamp of input is equal to the timestamp of payload', () => {
    lww.update("test");
    lww2.update("test2");

    const _timestamp = new Date().valueOf();

    lww.payload.timestamp = _timestamp;
    lww2.payload.timestamp = _timestamp;

    const replica = lww.query();
    const replica2 = lww2.query();

    expect(lww.compare(replica, replica2)).toBe(true);
  });

  test('success - compare payload and input, and return false. With timestamp of input is smaller than the timestamp of payload', async () => {
    lww2.update("test3");
    setTimeout(() => {
      lww.update("test4");
      const replica = lww.query();
      const replica2 = lww2.query();
      expect(lww.compare(replica, replica2)).toBe(false);
    }, [0])
  });

  test('failure - compare payload with an invalid X from record one, and throw Error', () => {
    lww.update("test5");
    lww2.update("test6");

    const replica = lww.query();
    const replica2 = lww2.query();

    replica.x = undefined;

    expect(() => { lww.compare(replica, replica2) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });

  test('failure - compare payload with an invalid timestamp from record one, and throw Error', () => {
    lww.update("test7");
    lww2.update("test8");

    const replica = lww.query();
    const replica2 = lww2.query();

    replica.timestamp = "abc";

    expect(() => { lww.compare(replica, replica2) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });

  test('failure - compare payload with an invalid X from record two, and throw Error', () => {
    lww.update("test9");
    lww2.update("test10");

    const replica = lww.query();
    const replica2 = lww2.query();

    replica2.x = undefined;

    expect(() => { lww.compare(replica, replica2) }).toThrow(ErrorMessage.INVALID_RECORD_TWO);
  });

  // NOTE: this testcase really traced the wrong code, typeof r1.timestamp => typeof r2.timestamp in compare second condition
  test('failure - compare payload with an invalid timestamp from record two, and throw Error', () => {
    lww.update("test11");
    lww2.update("test12");

    const replica = lww.query();
    const replica2 = lww2.query();

    replica2.timestamp = "abc";

    expect(() => { lww.compare(replica, replica2) }).toThrow(ErrorMessage.INVALID_RECORD_TWO);
  });

  test('failure - compare payload with missed record one, and throw Error', () => {
    lww2.update("test13");
    const replica2 = lww2.query();
    expect(() => { lww.compare(undefined, replica2) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });

  test('failure - compare payload with missed record two, and throw Error', () => {
    lww.update("test14");
    const replica = lww.query();
    expect(() => { lww.compare(replica, undefined) }).toThrow(ErrorMessage.INVALID_RECORD_TWO);
  });

  test('failure - compare payload with missed record two, and throw Error', () => {
    expect(() => { lww.compare(undefined, undefined) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });
})

describe('merge', () => {
  let payload = {};
  const invalidPayload = {
    x: null,
    timestamp: "abc"
  };
  const decrementingPayload = {
    x: null,
    timestamp: -1
  };

  test('success - merge payload and input if compare returned true, and return updated payload by input', () => {
    lww.update("test");
    payload = lww.query();
    setTimeout(() => {
      lww2.update("test2");
      const replica = lww2.query();
      const result = lww.merge(payload, replica);
      expect(result).toMatchObject(replica);
    }, [100])
  });

  test('success - merge payload and input if compare returned false, and return update payload by original payload', () => {
    lww.update("test3");
    setTimeout(() => {
      lww2.update("test4");
      payload = lww2.query();
      const replica = lww.query();
      const result = lww.merge(payload, replica);
      expect(result).toMatchObject(payload);
    }, [100])
  });

  test('failure - update payload failed with input timestamp is invalid date from record one, and throw Error', () => {
    lww.update("test5");
    const replica = lww.query();
    expect(() => { lww.merge(invalidPayload, replica) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });

  test('failure - update payload failed with input timestamp is invalid date from record two, and throw Error', () => {
    lww.update("test6");
    const replica = lww.query();
    expect(() => { lww.merge(replica, invalidPayload) }).toThrow(ErrorMessage.INVALID_RECORD_TWO);
  });

  test('failure - update payload failed with input timestamp is negative number (decrementing) from record one, and throw Error', () => {
    lww.update("test7");
    const replica = lww.query();
    expect(() => { lww.merge(decrementingPayload, replica) }).toThrow(ErrorMessage.INVALID_RECORD_ONE);
  });

  test('failure - update payload failed with input timestamp is negative number (decrementing) from record two, and throw Error', () => {
    lww.update("test8");
    const replica = lww.query();
    expect(() => { lww.merge(replica, decrementingPayload) }).toThrow(ErrorMessage.INVALID_RECORD_TWO);
  });
})