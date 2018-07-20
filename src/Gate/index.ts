/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TGate, TResource } from '../Contracts'
import { formatResourceName } from '../Helpers'
import { Storage } from '../Storage'

const storage = Storage.instance

abstract class Gate {
  /**
   * Defines a new Gate.
   *
   * @param name     Name of the gate
   * @param callback Callback
   */
  public static define (name: string, callback: TGate): void {
    Gate.$getStorage().storeGate(name, callback)
  }

  /**
   * Defines a new Policy.
   *
   * @param resource Resource to create policy for
   * @param policy   Policy assigned to the resource
   */
  public static policy (resource: TResource, policy: Function | object): void {
    const resourceName = formatResourceName(resource)

    if (typeof policy === 'function') {
      // @ts-ignore
      policy = new policy() // tslint:disable-line
    }

    Gate.$getStorage().storePolicy(resourceName, policy)
  }

  /**
   * Returns the storage.
   *
   * @return Storage used
   */
  private static $getStorage (): Storage {
    return storage
  }
}

export { Gate }
