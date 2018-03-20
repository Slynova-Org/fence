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
    }

    if (typeof resource === 'object' && resource.constructor.name !== 'Object') {
      return resource.constructor.name
    }

    if (typeof resource === 'object' && resource.constructor.name === 'Object') {
      return resource._className
    }

    return resource
  }
}

module.exports = Helpers
