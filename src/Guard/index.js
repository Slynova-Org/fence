'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Bouncer = require('../Bouncer')

 /**
  * @class Guard
  */
class Guard {

  /**
   * ...
   *
   * @method user
   * @param  {object} user
   * @return {boolean}
   */
  can (user) {
    return new Bouncer(user)
  }

}

module.exports = Guard
