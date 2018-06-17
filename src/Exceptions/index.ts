/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

// tslint:disable

import { LogicalException } from 'node-exceptions'

export class InvalidUser extends LogicalException {}
export class GateNotFound extends LogicalException {}
export class PolicyNotFound extends LogicalException {}
