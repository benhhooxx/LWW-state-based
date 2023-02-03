

class LLWStateBased {
  constructor() {
    this.payload = {
      x: null,
      timestamp: 0
    }
  }

  update() {
    // based on the timestamp, consistent with causality
  }

  query() {
    return this.payload;
  }

  compare() {

  }

  merge() {

  }
}

module.exports = LLWStateBased;