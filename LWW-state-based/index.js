

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
        timestamp: new Date()
      }
      return this.payload;
    } else {
      throw new Error('Undefined input value');
    }
  }

  query() {
    return this.payload;
  }

  compare() {

  }

  merge() {

  }
}

module.exports = LWWStateBased;