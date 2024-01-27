export interface IUpdateUserDTO {
  id: string;
  password: string;
  name?: string;
  email?: string;
  photo?: string;
  new_password?: string;
}
