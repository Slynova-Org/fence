/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

/**
 * TypeScript (Exported) Gate class definition
 */
declare class Gate {
  public define(name: string, callback: Function| string): this;
  public policy(resource: Function|object|string, policy: Function|object): this;
}

export as namespace Gate;
export = new Gate();
