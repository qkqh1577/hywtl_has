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

export type ListDepartment = {
  id: number;
  name: string;
  category: DepartmentCategory;
  parent?: ListDepartment;
  parentId?: number;
  userCount?: number;
  childrenCount?: number;
}
