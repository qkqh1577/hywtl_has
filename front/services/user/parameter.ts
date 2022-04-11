import User, { UserRole } from './User';

export type UserQuery = {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
  role: UserRole[];
}

export type UserAddParameter = Omit<User,
  'id'
  | 'username'
  | 'createdTime'
  | 'signedInTime'
  | 'passwordChangedTime'>;

export type UserChangeParameter = {
  id: number;
  name: string;
  email: string;
}
