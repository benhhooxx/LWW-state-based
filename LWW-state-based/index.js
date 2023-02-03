

class LWWStateBased {
  constructor() {
    this.payload = {
      x: null,
      timestamp: 0
    }
  }

  update(w) {
    if (w !== undefined) {
      this.payload = {
        x: w,
        timestamp: new Date().valueOf()
      }
      return this.payload;
    } else {
      throw new Error('Undefined input value');
    }
  }

  query() {
    if (typeof this.payload.timestamp === "number") {
      return this.payload;
    } else {
      throw new Error('Invalid timestamp');
    }
  }

  compare() {

  }

  merge() {

  }
}

module.exports = LWWStateBased;