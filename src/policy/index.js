'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Ability = require('../abilities')
const Storage = require('../storage').instance

class Policy {

  /**
   * Constructor.
   * @param  {object} config
   * @return {void}
   */
  constructor (config) {
    this._retrieveUUID = config.retrieveUUID
    this._retrieveClassName = config.retrieveClassName
  }

  /**
   * Sets a role for the policy.
   *
   * @param  {string} role
   * @return {this}
   */
  forRole (role) {
    this.role = role

    return this
  }

  /**
   * Sets the policy type to allow.
   *
   * @return {this}
   */
  get allowing () {
    this.allow = true

    return this
  }

  /**
   * Sets the policy type to disallow.
   *
   * @return {void}
   */
  get disallowing () {
    this.allow = false

    return this
  }

  /**
   * Alias to have a more fluent API.
   *
   * @return {this}
   */
  get to () {
    return this
  }

  _define (resource, ability) {
    let resourceName = this._retrieveClassName(resource)

    this.ability = new (Ability[ability])(resourceName)

    this._store()
  }

  create (resource) {
    this._define(resource, 'create')

    return this
  }

  update (resource) {
    this._define(resource, 'update')

    return this
  }

  view (resource) {
    this._define(resource, 'view')

    return this
  }

  delete (resource) {
    this._define(resource, 'delete')

    return this
  }

  _store () {
    Storage.store(this)
  }

  only (fields) {
    this.ability.onlyFor(fields)
  }

}

module.exports = Policy
