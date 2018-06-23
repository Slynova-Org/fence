/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { Bouncer } from '../Bouncer'
import { TResource } from '../Contracts'
import { formatResourceName } from '../Helpers'
import { Storage } from '../Storage'

const storage = Storage.instance

class Guard {
  /**
   * User to test.
   */
  private readonly $user: Function | object

  /**
   * Constructor.
   *
   * @param user User to test.
   */
  constructor (user: Function | object) {
    this.$user = user
  }

  /**
   * Creates a Bouncer with the given user.
   *
   * @param user User to test
   */
  public static can (user: Function | object): Bouncer {
    return new Bouncer(user)
  }

  /**
   * Sets a default user for any call.
   *
   * @param user User to test
   */
  public static setDefaultUser (user: Function | object): Guard {
    return new Guard(user)
  }

  /**
   * Check the bouncer if the gate/policy allows the user.
   *
   * @param ability  Ability to test
   * @param resource Resource to test
   * @param user     Optional. User to verify
   */
  public allows (ability: string, resource: TResource, user: Function | object | undefined): boolean {
    const usedUser = (user !== undefined) ? user : this.$user

    try {
      if (this.$correspondsToPolicy(resource)) {
        return (new Bouncer(usedUser)).callPolicy(ability, resource)
      }

      return (new Bouncer(usedUser)).pass(ability).for(resource)
    } catch (e) {
      return false
    }
  }

  /**
   * Creates a Bouncer with the given user.
   *
   * @param user User to test
   */
  public can (user: Function | object): Bouncer {
    return Guard.can(user)
  }

  /**
   * Check the bouncer if the gate/policy denies the user.
   *
   * @param ability  Ability to test
   * @param resource Resource to test
   * @param user     Optional. User to verify
   */
  public denies (ability: string, resource: TResource, user: Function | object | undefined): boolean {
    return !this.allows(ability, resource, user)
  }

  /**
   * Verifies if the resource has a policy assiociated.
   *
   * @param resource Resource to verify
   */
  private $correspondsToPolicy (resource: TResource): boolean {
    const resourceName = formatResourceName(resource)

    return (storage.retrievePolicy(resourceName) !== undefined)
      ? true
      : false
  }
}

export { Guard }
