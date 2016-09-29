'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Ability = require('../abilities/ability')
const Storage = require('../storage').instance

class Bouncer {

  /**
   * Constructor.
   *
   * @param  {object} config
   * @return {void}
   */
  constructor (config) {
    this.field = null
    this.default = config.default
    this.precedence = config.precedence
    this._retrieveUUID = config.retrieveUUID
    this._retrieveClassName = config.retrieveClassName
    this._retrieveUserRoles = config.retrieveUserRoles
  }

  get can () {
    return this
  }

  forUser (user) {
    this.user = user

    return this
  }

  view (resource) {
    this.type = Ability.VIEW

    if (typeof resource !== 'string') {
      return this.of(resource)
    }

    this.field = resource
    return this
  }

  create (resource) {
    this.type = Ability.CREATE

    if (typeof resource !== 'string') {
      return this.of(resource)
    }

    this.field = resource
    return this
  }

  update (resource) {
    this.type = Ability.UPDATE

    if (typeof resource !== 'string') {
      return this.of(resource)
    }

    this.field = resource
    return this
  }

  delete (resource) {
    this.type = Ability.DELETE

    if (typeof resource !== 'string') {
      return this.of(resource)
    }

    this.field = resource
    return this
  }

  of (resource) {
    const resourceName = this._retrieveClassName(resource)
    const roles = this._retrieveUserRoles(this.user)

    let defaultAuthorization = (this.default === 'allow')
    let precedenceIsAllowed = (this.precedence === 'allow')
    let conditionHasField = (this.field !== null)
    let policies = Storage.pullForResource(resourceName)
    let allow = false
    let deny = false

    if (policies === null) { return defaultAuthorization }

    for (let policy of policies) {
      if (!roles.includes(policy.role)) continue

      if (policy.ability.type === this.type) {
        if (policy.allow) {
          if (conditionHasField) {
            if (policy.ability.fields.includes(this.field)) {
              allow = true
            } else deny = deny || !defaultAuthorization
          } else allow = true
        } else {
          if (conditionHasField) {
            if (policy.ability.fields.includes(this.field)) {
              deny = true
            } else allow = allow || defaultAuthorization
          } else deny = true
        }
      } // if type
    } // for end

    if (allow || deny) {
      if (precedenceIsAllowed) {
        return allow
      } else {
        return !deny
      }
    }

    return defaultAuthorization
  }

}

module.exports = Bouncer
