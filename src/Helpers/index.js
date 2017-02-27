'use strict'

class Helpers {

  /**
   * @static
   * @method formatResourceName
   * @param  {function|object} resource
   * @return {string}
   */
  static formatResourceName (resource) {
    if (typeof resource === 'function') {
      return resource.name
    } else if (typeof resource === 'object' && resource.constructor.name !== 'Object') {
      return resource.constructor.name
    } else if (typeof resource === 'object' && resource.constructor.name === 'Object') {
      return resource._className
    }

    return resource
  }

  /**
   * @static
   * @method isGenerator
   * @param  {function} fn
   * @return {boolean}
   */
  static isGenerator (fn) {
    return fn.constructor.name === 'GeneratorFunction'
  }

}

module.exports = Helpers
