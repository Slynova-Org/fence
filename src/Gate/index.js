'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Helpers = require('../Helpers')
const Storage = require('../Storage').instance

 /**
  * @class Gate
  */
class Gate {

  /**
   * Defines a new Gate.
   *
   * @method define
   * @param  {string} name
   * @param  {function|string} callback
   * @return {this}
   */
  define (name, callback) {
    Storage.storeGate(name, callback)

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
    const resourceName = Helpers.formatResourceName(resource)

    Storage.storePolicy(resourceName, policy)

    return this
  }

}

module.exports = Gate
