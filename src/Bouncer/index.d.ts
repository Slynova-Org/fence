/// <reference path="../Gate/index.d.ts" />

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

/**
 * TypeScript Bouncer class definition
 */
declare class Bouncer {
  constructor(user: object);

  public goThroughGate(gate: string): this;
  public pass(gate: string): this;
  public for(resource: object | string): Gate;
  public callPolicy(ability: string, resource: object): boolean;
}

export as namespace Bouncer;
export = Bouncer;
