const ErrorMessage = require('../constants/error');

// Ref: * https://hal.inria.fr/inria-00555588/PDF/techreport.pdf - Specification 8 State-based LWW-Register
class LWWStateBased {
  constructor() {
    this.payload = {
      x: null,
      timestamp: 0
    }
  }

  /**
   * 
   * @param {*} w: any but not undefined
   * @returns payload: { x: any, timestamp: integer }
   */
  update(w) {
    // w is able to be null, or empty string
    if (w !== undefined) {
      this.payload = {
        x: w,
        timestamp: new Date().valueOf() // set the now() unix timestamp
      }
      return this.payload;
    } else {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }
  }

  /**
   * 
   * @returns payload: { x: any, timestamp: integer }
   */
  query() {
    // make sure "query" return a valid payload
    if (typeof this.payload.timestamp === "number" && this.payload.x !== undefined) {
      return this.payload;
    } else {
      throw new Error(ErrorMessage.INVALID_TIMESTAMP);
    }
  }

  /**
   * 
   * @param {*} r1: { x: any, timestamp: integer }
   * @param {*} r2: { x: any, timestamp: integer }
   * @returns Boolean
   */
  compare(r1, r2) {
    if (!!!r1 || r1.x === undefined || typeof r1.timestamp !== "number" || r1.timestamp < 0) {
      throw new Error(ErrorMessage.INVALID_RECORD_ONE);
    }

    if (!!!r2 || r2.x === undefined || typeof r2.timestamp !== "number" || r2.timestamp < 0) {
      throw new Error(ErrorMessage.INVALID_RECORD_TWO);
    }

    if (r1.timestamp <= r2.timestamp) return true;
    else return false;
  }

  /**
   * 
   * @param {*} r1: { x: any, timestamp: integer }
   * @param {*} r2: { x: any, timestamp: integer } 
   * @returns R''
   */
  merge(r1, r2) {
    // "compare" will handle the invalid data structure case
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