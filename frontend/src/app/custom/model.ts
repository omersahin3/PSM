export interface UserResponse {
  id: number,
  username: string,
  email: string,
  password: string,
  phone: string,
  dateofbirth: string,
  adress: string,
}
export class UserEdit{ 
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  phone!: string;
  dateofbirth!: string;
  adress!: string;
}
export class UserpassEdit{ 
  current_password!: string;
  new_password!: string;
  confirm_new_password!: string;
}