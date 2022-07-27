import { Department } from 'services/department';

export type UserRole = 'NORMAL' | 'ADMIN' | 'MASTER';

export interface UserShort {
  id: number;
  name: string;
  username: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
  departmentName: string;
}

export interface User
  extends Omit<UserShort, 'departmentId' | 'departmentName'> {
  department: Department;
  createdAt: Date;
  loginAt?: Date;
  passwordChangedAt?: Date;
}


export interface UserForm
  extends User {
  departmentId: number;
}