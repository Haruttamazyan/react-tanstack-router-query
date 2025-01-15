export enum Status {
    INACTIVE = 'inactive',
    ACTIVE = 'active'
  }


export type User = {
    id: number,
    phone: string,
    ssn: string,
    name: string,
    email?: string,
    status: Status
}