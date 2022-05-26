import { User } from 'services/user';

export type DepartmentCategory = 'COMPANY' | 'HQ' | 'TEAM' | 'PART' | 'PERSON' | 'EXTRA';

export type Department = {
  id: number;
  name: string;
  category: DepartmentCategory;
  seq: number;
  parentId?: number;
  memo?: string;
  childrenList: Department[];
  userList: User[];
}

export type DepartmentShort = {
  id: number;
  name: string;
  category: DepartmentCategory;
  parent?: DepartmentShort;
  parentId?: number;
  userCount?: number;
  childrenCount?: number;
}
