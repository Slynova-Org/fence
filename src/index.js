'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Policy = require('./policy')
const Bouncer = require('./bouncer')

class Guard {

  /**
   * Constructor.
   *
   * @param  {object} config
   * @return {void}
   */
  constructor (config) {
    this.config = config
  }

  /**
   * Allow an ability to a certain role.
   *
   * @param  {string} role
   * @return {Policy}
   */
  allow (role) {
    return new Policy(this.config).forRole(role).allowing
  }

  /**
   * Disallow an ability to a certain role.
   *
   * @param  {string} role
   * @return {Policy}
   */
  disallow (role) {
    return new Policy(this.config).forRole(role).disallowing
  }

  can (user) {
    return new Bouncer(this.config).forUser(user)
  }

}

module.exports = Guard
