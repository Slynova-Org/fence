export type TGate = (user: object, resource: TResource) => boolean
export type TResource = { new(...args): any } | { _className: string } | string
