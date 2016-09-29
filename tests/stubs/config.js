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
   | Retrieve Class Name
   |--------------------------------------------------------------------------
   |
   | Defined how we retrieve the name of an object.
   |
   | When we store a policy that you defined for a resource we need to store it
   | with a key. The class name of your resource is used to be the key.
   | So when you call `guard.can(user).view(article)` the variable
   | `article` will be send to `retrieveClassName` function.
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
   | When we store a policy that you defined for a resource we need to store it
   | for a role. So when you call `guard.can(user).view(article)` the variable
   | `user` will be send to `retrieveUserRoles` function and expect to
   | have an array of strings in return.
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

    // We assume that 1 is the ID of the current logged in user as an example.
    'ownerCondition': (object) => { return object.owner_id === 1 }

  }

}
