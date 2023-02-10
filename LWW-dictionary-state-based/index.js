const ErrorMessage = require('../constants/error');
const CommonUtils = require('../utils/common');

// Ref: * https://hal.inria.fr/inria-00555588/PDF/techreport.pdf - Specification 12 State-based 2P-Set
class LWWDictionaryStateBased {
  constructor() {
    this.addSet = {} // { a: timestamp, ... }
    this.removeSet = {}
  }

  /**
   * 
   * @param {*} e 
   * @returns Boolean b
   * b is defined by e is the element of A && e is not the element of B
   */
  lookup(e) {
    // check the key of e is not include this.removeSet
    // check the key of e is include this.addSet, 
    // since this function is for remove to check whether the this.addSet hv this element of not,
    // remove if hv; con't remove if not have.
    if (CommonUtils.isObject(e)) {
      const key = Object.keys(e)[0];
      if (Object.keys(this.addSet).indexOf(key) > -1
        && Object.keys(this.removeSet).indexOf(key) === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }
  }

  /**
   * 
   * @param {*} e 
   * @returns Object o: { [e]: Timestamp }
   * assign the input "e" as a key, and timestamp as a value 
   */
  dto(e) {
    return { [e]: new Date().valueOf() }
  }

  /**
   * 
   * @param {*} e  
   * addSet is defined by A appends { e }
   */
  add(e) {
    if (e === null || e === undefined || e === "") {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    if (CommonUtils.isValidInput(e)) {
      const object = this.dto(e);
      this.addSet = { ...this.addSet, ...object };
    } else {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }
  }

  /**
   * 
   * @param {*} e 
   * removeSet is defined by R appends { e } if lookup(e) returns true
   */
  remove(e) {
    if (e === null || e === undefined || e === "") {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    if (CommonUtils.isValidInput(e)) {
      const object = this.dto(e);
      if (this.lookup(object)) {
        this.removeSet = { ...this.removeSet, ...object }
      }
    } else {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }
  }

  /**
   * 
   * @param {*} s the first set
   * @param {*} t the second set
   * @returns Boolean b
   * b is defined by 
   */
  compare(replica) {
    if (replica.addSet === undefined || replica.removeSet === undefined) {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    const selfAddSetIsSubsetOfReplica = CommonUtils.isSubset(this.addSet, replica.addSet);

    const selfRemoveSetIsSubsetOfReplica = CommonUtils.isSubset(this.removeSet, replica.removeSet);

    return selfAddSetIsSubsetOfReplica && selfRemoveSetIsSubsetOfReplica
  }

  /**
   * 
   * @param {*} s 
   * @param {*} t 
   * @returns payload = { addSet: {}, removeSet: {} }
   */
  merge(replica) {
    if (replica.addSet === undefined || replica.removeSet === undefined) {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    const payload = {
      addSet: {},
      removeSet: {}
    }

    payload.addSet = { ...this.addSet, ...replica.addSet };

    payload.removeSet = { ...this.removeSet, ...replica.removeSet };

    for (const [element, timestamp] of Object.entries(this.addSet)) {
      payload.addSet[element] = Math.max(replica.addSet[element] || 0, timestamp);
    }

    for (const [element, timestamp] of Object.entries(this.removeSet)) {
      payload.removeSet[element] = Math.max(replica.removeSet[element] || 0, timestamp);
    }

    return payload;
  }
}

module.exports = LWWDictionaryStateBased;