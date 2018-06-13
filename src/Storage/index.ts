/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TGate } from '../Contracts'

const instance = Symbol('Instance')
const instanceEnforcer = Symbol('InstanceEnforcer')

class Storage {
  /**
   * Storage where all the gates reside.
   */
  private $gates = {}

  /**
   * Storage where all the polices reside.
   */
  private $policies = {}

  /**
   * Constructor.
   */
  private constructor (enforcer: symbol) {
    if (enforcer !== instanceEnforcer) {
      throw Error('Cannot Construct Singleton')
    }
  }

  /**
   * Returns the unique instance of the storage.
   */
  static get instance (): Storage {
    if (!this[instance]) {
      this[instance] = new Storage(instanceEnforcer)
    }

    return this[instance]
  }

  /**
   * Retrieves a gate with the given name.
   *
   * @param name Name of the gate
   */
  public retrieveGate (name: string): TGate {
    return this.$gates[name]
  }

  /**
   * Retrieves a policy with the given resource.
   *
   * @param resource Name of the resource
   */
  public retrievePolicy (resource: string): Function {
    return this.$policies[name]
  }

  /**
   * Stores a gate inside the storage.
   *
   * @param name     Name of the gate
   * @param callback Gate
   */
  public storeGate (name: string, callback: TGate): void {
    this.$gates[name] = callback
  }

  /**
   * Stores a policy inside the storage.
   *
   * @param resource Name of the resource
   * @param policy   Policy for the given resource
   */
  public storePolicy (resource: string, policy: Function): void {
    this.$policies[resource] = policy
  }

  /**
   * Resets the state of the storage.
   */
  private $reset (): void {
    this.$gates = {}
    this.$policies = {}
  }
}

export = Storage
