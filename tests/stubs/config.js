'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | Default Permission
   |--------------------------------------------------------------------------
   |
   | When no roles or policies is defined allow|deny the ability.
   |
   | Available Settings: "allow", "deny"
   |
   */
  'default': 'deny',

  /*
   |--------------------------------------------------------------------------
   | Permission Precedence
   |--------------------------------------------------------------------------
   |
   | If you have multiple roles assigned to a user, each roles has
   | a common permission.  When we compile permissions, we need
   | to know which permissions take precedence over the other.
   |
   | Available Settings: "allow", "deny"
   |
   */
  'precedence': 'allow',

  /*
   |--------------------------------------------------------------------------
   | Retrieve UUID
   |--------------------------------------------------------------------------
   |
   | Defined how we retrieve the UUID of an object.
   |
   */
  'retrieveUUID': (object) => { return object.id },

  /*
   |--------------------------------------------------------------------------
   | Retrieve Class Name
   |--------------------------------------------------------------------------
   |
   | Defined how we retrieve the name of an object.
   |
   */
  'retrieveClassName': (object) => { return object._className },

  /*
   |--------------------------------------------------------------------------
   | Retrieve user's roles
   |--------------------------------------------------------------------------
   |
   | Defined how we retrieve user's roles.
   |
   | Note : It shoulds return an array of strings.
   |
   */
  'retrieveUserRoles': (user) => { return user.roles_id },

  /*
   |--------------------------------------------------------------------------
   | Conditions
   |--------------------------------------------------------------------------
   |
   | You can defined multiple dynamic conditions into node-fence.
   |
   */
  'conditions': {

    // We assume that 1 is the ID of the current logged in user
    'ownerCondition': (object) => { return object.owner_id === 1 }

  }

}
