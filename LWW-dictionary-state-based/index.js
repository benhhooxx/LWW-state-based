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
    if (!CommonUtils.isObject(e)) {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }

    const [key] = Object.keys(e);
    return (key in this.addSet) && !(key in this.removeSet);
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
    if (!!!e) {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    if (!CommonUtils.isValidInput(e)) {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }

    this.addSet = { ...this.addSet, ...this.dto(e) };
  }

  /**
   * 
   * @param {*} e 
   * removeSet is defined by R appends { e } if lookup(e) returns true
   */
  remove(e) {
    if (!!!e) {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    if (!CommonUtils.isValidInput(e)) {
      throw new Error(ErrorMessage.INVALID_DATA_FORMAT);
    }

    if (this.lookup(this.dto(e))) {
      this.removeSet = { ...this.removeSet, ...this.dto(e) }
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
    if (!replica.addSet || !replica.removeSet) {
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
    if (!replica.addSet || !replica.removeSet) {
      throw new Error(ErrorMessage.UNDEFINED_INPUT_VALUE);
    }

    const addSet = { ...this.addSet, ...replica.addSet };
    const removeSet = { ...this.removeSet, ...replica.removeSet };

    for (const [element, timestamp] of Object.entries(this.addSet)) {
      addSet[element] = Math.max(replica.addSet[element] || 0, timestamp);
    }

    for (const [element, timestamp] of Object.entries(this.removeSet)) {
      removeSet[element] = Math.max(replica.removeSet[element] || 0, timestamp);
    }

    return { addSet, removeSet };
  }
}

module.exports = LWWDictionaryStateBased;