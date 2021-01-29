interface Address {
  address: string;
  number: string;
  postCode: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface Resource {
  _id: number;
  defaultPermission: string;
  name: string;
  aclResource: string;
}
export interface Profile {
  _id: number;
  name: string;
  acl: any;
  createdAt?: Date;
  updatedAt?: Date;
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
