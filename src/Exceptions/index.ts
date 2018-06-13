/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

// tslint:disable

import NE from 'node-exceptions'

export class InvalidUser extends NE.LogicalException {}
export class GateNotFound extends NE.LogicalException {}
export class PolicyNotFound extends NE.LogicalException {}


