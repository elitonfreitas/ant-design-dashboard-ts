interface Address {
  address: string;
  number: string;
  postCode: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface Profile {
  _id: number;
  name: string;
  acl: unknown;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  profiles: any[];
  addresses?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
