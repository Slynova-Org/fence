export type TGate = (user: object, resource: object) => boolean
export type TResource = new () => any | { _className: string } | string
