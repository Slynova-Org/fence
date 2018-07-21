/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TResource } from '../Contracts'
import { GateNotFound, InvalidUser, PolicyNotFound } from '../Exceptions'
import { formatResourceName } from '../Helpers'
import { Storage } from '../Storage'

const storage = Storage.instance

class Bouncer {
  /**
   * Gate to test.
   */
  private $gate: string

  /**
   * User to test.
   */
  private readonly $user: Function | object

  /**
   * Constructor.
   *
   * @param user User to test
   */
  constructor (user: Function | object | undefined | null) {
    if (user === undefined || user === null) {
      // @ts-ignore
      throw new InvalidUser('You need to specify a user for the Bouncer.')
    }

    this.$user = user
  }

  /**
   * Call the given policy method.
   *
   * @param ability  Ability to test
   * @param resource Resource to test
   */
  public callPolicy (ability: string, resource: TResource): boolean {
    const resourceName = formatResourceName(resource)
    const policy = storage.retrievePolicy(resourceName)

    if (policy === undefined) {
      // @ts-ignore
      throw new PolicyNotFound(`The policy for ${resourceName} has not been found.`)
    }

    return policy[ability](this.$user, resource)  // tslint:disable-line
  }

  /**
   * Verifies the given gate for the given resource.
   *
   * @param resource Resource to test
   */
  public for (resource: TResource): boolean {
    const gate = storage.retrieveGate(this.$gate)

    if (gate === undefined) {
      // @ts-ignore
      throw new GateNotFound(`The gate ${this.$gate} has not been found.`)
    }

    return gate(this.$user, resource)
  }

  /**
   * Registers the gate name.
   *
   * @param gate Gate to test
   */
  public pass (gate: string): this {
    this.$gate = gate

    return this
  }
}

export { Bouncer }
