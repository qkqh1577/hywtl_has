import { Department } from 'services/department';

export type UserRole = 'NORMAL' | 'ADMIN' | 'MASTER';

export type UserShort = {
  id: number;
  name: string;
  username: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
  departmentName: string;
}

export type User = Omit<UserShort, 'departmentId' | 'departmentName'> & {
  department: Department;
  createdAt: Date;
  loginAt?: Date;
  passwordChangedAt?: Date;
}
