'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

let instance = Symbol()
let instanceEnforcer = Symbol()

class Storage {

  /**
   * Create a new storage instance.
   *
   * @param {Symbol} enforcer
   */
  constructor (enforcer) {
    if (enforcer !== instanceEnforcer) {
      throw Error('Cannot Construct Singleton')
    }

    this._reset()
  }

  /**
   * Store the policy into the storage.
   *
   * @param  {Policy} policy
   * @return {void}
   */
  store (policy) {
    this.policies[policy.ability.resource] = this.policies[policy.ability.resource] || []
    this.policies[policy.ability.resource].push(policy)
  }

  /**
   * Pull all policies.
   *
   * @return {object}
   */
  pull () {
    return this.policies
  }

  /**
   * Pull all policies for a given role.
   *
   * @param  {string} role
   * @return {array}
   */
  pullForRole (role) {
    let rolePolicies = []

    for (let resource in this.policies) {
      for (let policy of this.policies[resource]) {
        if (policy.role === role) {
          rolePolicies.push(policy)
        }
      }
    }

    if (rolePolicies.length === 0) {
      return null
    }

    return rolePolicies
  }

  /**
   * Pull all policies for a given resource.
   *
   * @param  {string} resource
   * @return {array}
   */
  pullForResource (resource) {
    if (this.policies[resource] === void 0) {
      return null
    }

    return this.policies[resource]
  }

  /**
   * Reset all policies.
   *
   * @return {void}
   */
  _reset () {
    this.policies = {}
  }

  /**
   * Get the current instance.
   *
   * @return {Storage}
   */
  static get instance () {
    if (!this[instance]) {
      this[instance] = new Storage(instanceEnforcer)
    }

    return this[instance]
  }

}

module.exports = Storage
