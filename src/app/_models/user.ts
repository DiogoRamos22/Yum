import { Role } from './role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  birth?: string;
  gender?: string;
  address?: string;
  district?: string;
  county?: string;
  nickname: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  token?: string;
  role: Role;
  card: string;
  type: string;
}
