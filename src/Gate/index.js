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
  static define (name, callback) {
    Storage.storeGate(name, callback)
  }

  /**
   * Defines a new Policy.
   *
   * @method policy
   * @param  {function|object|string} resource
   * @param  {function|object} policy
   * @return {this}
   */
  static policy (resource, policy) {
    const resourceName = Helpers.formatResourceName(resource)

    if (typeof policy === 'function') {
      policy = new policy()
    }

    Storage.storePolicy(resourceName, policy)
  }

}

module.exports = Gate
