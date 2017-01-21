'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Storage = require('../Storage').instance

 /**
  * @class Gate
  */
class Gate {

  /**
   * Defines a new Gate.
   *
   * @method define
   * @param  {ability} name
   * @param  {function|string} callback
   * @return {this}
   */
  define (ability, callback) {
    Storage.storeGate(ability, callback)

    return this
  }

  /**
   * Defines a new Policy.
   *
   * @method policy
   * @param  {function|object|string} resource
   * @param  {object} policy
   * @return {this}
   */
  policy (resource, policy) {
    if (typeof resource === 'function') {
      resource = resource.name
    } else if (typeof resource === 'object' && resource.constructor.name !== 'Object') {
      resource = resource.constructor.name
    } else if (typeof resource === 'object' && resource.constructor.name === 'Object') {
      resource = resource._className
    }


    Storage.storePolicy(resource, policy)

    return this
  }

}

module.exports = Gate
