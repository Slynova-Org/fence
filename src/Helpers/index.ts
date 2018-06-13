/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TResource } from '../Contracts'

/**
 * Returns the name of a resource by using the class name or
 * the attributs `_className` when it's a dumb object.
 *
 * @param  resource  Resource to search the name for
 */
export function formatResourceName (resource: TResource): string {
  if (typeof resource === 'function') {
    return resource.name
  }

  if (typeof resource === 'object' && resource.constructor.name !== 'Object') {
    return resource.constructor.name
  }

  if (typeof resource === 'object' && resource.constructor.name === 'Object') {
    return resource._className
  }

  return resource
}
