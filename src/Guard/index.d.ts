/// <reference path="../Bouncer/index.d.ts" />

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

/**
 * TypeScript (Exported) Guard class definition
 */
declare class Guard {
    public setDefaultUser(user: object): void;
    public can(user: object): Bouncer;
    public allows(ability: string, resource: object | string): boolean;
    public denies(ability: string, resource: object | string): boolean;
}

export as namespace Guard;
export = new Guard();
