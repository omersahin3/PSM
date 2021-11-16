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
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string
}
export class Service{ // export typescript kodu dışardan erişilmesini sağlıyor.
  id!: number;
  name!: string;
  description!: string;
  status!: boolean;
  createdAt!: string;
  updatedAt!: string;
}