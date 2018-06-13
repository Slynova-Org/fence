/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TGate, TResource } from '../Contracts'
import { formatResourceName } from '../Helpers'
import Storage from '../Storage'

const storage = Storage.instance

class Gate {
  /**
   * Defines a new Gate.
   *
   * @param name     Name of the gate
   * @param callback Callback
   */
  public define (name: string, callback: TGate): void {
    storage.storeGate(name, callback)
  }

  /**
   * Defines a new Policy.
   *
   * @param resource Resource to create policy for
   * @param policy   Policy assigned to the resource
   */
  public policy (resource: TResource, policy: Function): void {
    const resourceName = formatResourceName(resource)

    if (typeof policy === 'function') {
      policy = new policy() // tslint:disable-line
    }

    storage.storePolicy(name, policy)
  }
}

export = new Gate()
