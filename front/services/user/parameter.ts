import { UserRole } from './User';

export type UserQuery = {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
  role: UserRole[];
}

export type AddUserParameter = {
  name: string;
  username: string;
  password: string;
  email: string;
  authKey: string;

}

export type ChangeUserParameter = {
  id: number;
  name: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
}

export type ChangeUserPasswordParameter = {
  id: number;
  nowPassword: string;
  newPassword: string;
}
