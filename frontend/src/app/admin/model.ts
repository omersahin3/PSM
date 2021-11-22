export interface ServiceResponse {
  id: number,
  name: string,
  description: string,
  status:boolean,
  createdAt: string,
  updatedAt: string
}
export interface ServerResponse {
  id: number,
  dns_name: string,
  description: string,
  ip_adress: string,
  createdAt: string,
  updatedAt: string,
  services: Array<any>;
}
export class Service{ 
  id!: number;
  name!: string;
  description!: string;
  status!: boolean;
  createdAt!: string;
  updatedAt!: string;
}
export class Server{ 
  id!: number;
  dns_name!: string;
  description!: string;
  ip_adress!: boolean;
  createdAt!: string;
  updatedAt!: string;
}