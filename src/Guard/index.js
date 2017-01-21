'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Bouncer = require('../Bouncer')
const Storage = require('../Storage').instance

 /**
  * @class Guard
  */
class Guard {

  /**
   * Set a default user for any call.
   *
   * @method setDefaultUser
   * @param  {object} user
   * @return {void}
   */
  setDefaultUser (user) {
    Storage.storeUser(user)
  }

  /**
   * Create a Bouncer with the given user.
   *
   * @method can
   * @param  {object} user
   * @return {boolean}
   */
  can (user) {
    return new Bouncer(user)
  }

  /**
   * Check the bouncer if the gate allows the user.
   *
   * @method allows
   * @param  {string} gate
   * @param  {object|string} resource
   * @return {boolean}
   */
  allows (gate, resource) {
    const bouncer = new Bouncer(Storage.retrieveUser())

    return bouncer.goThroughGate(gate).for(resource)
  }

  /**
   * Check the bouncer if the gate denies the user.
   *
   * @method denies
   * @param  {string} gate
   * @param  {object|string} resource
   * @return {boolean}
   */
  denies (gate, resource) {
    const bouncer = new Bouncer(Storage.retrieveUser())

    return ! bouncer.goThroughGate(gate).for(resource)
  }

}

module.exports = Guard
