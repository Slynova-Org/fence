'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

class Ability {

  static get VIEW () { return 0 }
  static get CREATE () { return 1 }
  static get UPDATE () { return 2 }
  static get DELETE () { return 3 }

  /**
   * Constructor.
   *
   * @param  {object} resource
   * @return {void}
   */
  constructor (resource) {
    this.resource = resource
    this.restriction = false
  }

  onlyFor (fields) {
    this.restriction = true
    this.fields = fields
  }

}

module.exports = Ability
