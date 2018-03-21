'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Helpers = require('../Helpers')
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
   * @param  {string} ability
   * @param  {object|string} resource
   * @return {boolean}
   */
  allows (ability, resource) {
    try {
      if (this.$correspondsToPolicy(resource)) {
        return (new Bouncer()).callPolicy(ability, resource)
      }

      return (new Bouncer()).goThroughGate(ability).for(resource)
    } catch (e) {
      return false
    }
  }

  /**
   * Check the bouncer if the gate denies the user.
   *
   * @method denies
   * @param  {string} ability
   * @param  {object|string} resource
   * @return {boolean}
   */
  denies (ability, resource) {
    try {
      if (this.$correspondsToPolicy(resource)) {
        return !(new Bouncer()).callPolicy(ability, resource)
      }

      return !(new Bouncer()).goThroughGate(ability).for(resource)
    } catch (e) {
      return true
    }
  }

  $correspondsToPolicy (resource) {
    const resourceName = Helpers.formatResourceName(resource)

    if (Storage.retrievePolicy(resourceName)) {
      return true
    }

    return false
  }
}

module.exports = new Guard()
