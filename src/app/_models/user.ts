import { Role } from './role';
import { FormGroup } from "@angular/forms";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    birth?: string;
    gender?: string;
    address?: string;
    district?: string;
    county?: string;
    username: string;
    email?: string;
    password: string;
    confirmPassword?: string;
    token?: string;
    role: Role;
}
