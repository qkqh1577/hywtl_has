import { UserRole } from './User';

export type UserQuery = {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
  role: UserRole[];
}

export type UserAddParameter = {
  name: string;
  username: string;
  password: string;
  email: string;
  authKey: string;

}

export type UserChangeParameter = {
  id: number;
  name: string;
  email: string;
}
