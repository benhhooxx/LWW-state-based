const ErrorMessage = require('../constants/error');

// Ref: * https://hal.inria.fr/inria-00555588/PDF/techreport.pdf - Specification 12 State-based 2P-Set
class LWWDictionaryStateBased {
  constructor() {
    this.addSet = []
    this.removeSet = []
  }

  /**
   * 
   * @param {*} e 
   * @returns Boolean
   */
  lookup(e) { }

  /**
   * 
   * @param {*} e  
   */
  updateAdd(e) { }

  /**
   * 
   * @param {*} e 
   */
  updateRemove(e) { }

  /**
   * 
   * @param {*} s 
   * @param {*} t 
   * @returns Boolean
   */
  compare(s, t) { }

  /**
   * 
   * @param {*} s 
   * @param {*} t 
   * @returns payload 
   */
  merge(s, t) { }
}

module.exports = LWWDictionaryStateBased;