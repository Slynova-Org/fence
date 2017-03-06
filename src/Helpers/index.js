'use strict'

const co = require('co')

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
   *
   * @private
   */
  static $isGenerator (fn) {
    return fn.constructor.name === 'GeneratorFunction'
  }

  /**
   * @static
   * @method isGenerator
   * @param  {function} fn
   * @return {function}
   *
   * @private
   */
  static $wrapGenerator (fn) {
    return co.wrap(function * () {
      return yield fn.apply(this, arguments)
    })
  }

  /**
   * @static
   * @method wrapIfGenerator
   * @param  {function} fn
   * @return {boolean}
   */
  static wrapIfGenerator (fn) {
    return Helpers.$isGenerator(fn) ? Helpers.$wrapGenerator(fn) : fn
  }

}

module.exports = Helpers
