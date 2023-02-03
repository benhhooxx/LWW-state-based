

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
    if (typeof this.payload.timestamp === "number" && this.payload.x !== undefined) {
      return this.payload;
    } else {
      throw new Error('Invalid timestamp');
    }
  }

  compare(r1, r2) {
    if (!!!r1 || r1.x === undefined || typeof r1.timestamp !== "number" || r1.timestamp < 0) {
      throw new Error('Record one is invalid data structure');
    }

    if (!!!r2 || r2.x === undefined || typeof r2.timestamp !== "number" || r2.timestamp < 0) {
      throw new Error('Record two is invalid data structure');
    }

    if (r1.timestamp <= r2.timestamp) return true;
    else return false;
  }

  merge(r1, r2) {
    if (this.compare(r1, r2)) {
      return {
        x: r2.x,
        timestamp: r2.timestamp
      }
    } else {
      return {
        x: r1.x,
        timestamp: r1.timestamp
      }
    }
  }
}

module.exports = LWWStateBased;