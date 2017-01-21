'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Storage = require('../Storage').instance

 /**
  * @class Bouncer
  */
class Bouncer {

  /**
   * Constructor.
   *
   * @constructor
   * @param  {object} user
   * @return {void}
   */
  constructor (user) {
    this.$user = user
  }

  /**
   * Registers the gate name.
   *
   * @method goThroughGate
   * @param  {string} ability
   * @return {this}
   */
  goThroughGate (gate) {
    this.$gate = gate

    return this
  }

  /**
   * Verifies the given gate for the given resource.
   *
   * @method for
   * @param  {object|string} resource
   * @return {boolean}
   */
  for (resource) {
    const gate = Storage.retrieveGate(this.$gate)

    return gate(this.$user, resource)
  }

  /**
   * Verifies the update policy for the given resource.
   *
   * @method create
   * @param  {function|object} resource
   * @return {boolean}
   */
  create (resource) {
    const resourceName = this.$formatResourceName(resource)
    const policy = Storage.retrievePolicy(resourceName)

    return policy.create(this.$user)
  }

  /**
   * Verifies the update policy for the given resource.
   *
   * @method update
   * @param  {object} resource
   * @return {boolean}
   */
  update (resource) {
    const resourceName = this.$formatResourceName(resource)
    const policy = Storage.retrievePolicy(resourceName)

    return policy.update(this.$user, resource)
  }

  /**
   * Verifies the delete policy for the given resource.
   *
   * @method delete
   * @param  {object} resource
   * @return {boolean}
   */
  delete (resource) {
    const resourceName = this.$formatResourceName(resource)
    const policy = Storage.retrievePolicy(resourceName)

    return policy.update(this.$user, resource)
  }

  /**
   * @private
   * @method formatResourceName
   * @param  {function|object} resource
   * @return {string}
   */
  $formatResourceName (resource) {
    if (typeof resource === 'function') {
      return resource.name
    } else if (typeof resource === 'object' && resource.constructor.name !== 'Object') {
      return resource.constructor.name
    } else if (typeof resource === 'object' && resource.constructor.name === 'Object') {
      return resource._className
    }
  }

}

module.exports = Bouncer
