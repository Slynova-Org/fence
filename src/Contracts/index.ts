export type TGate = (user: object, resource: object) => boolean
export type TResource = { new(...args): any } | { _className: string } | string
