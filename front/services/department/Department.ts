import User from '../user/User';

export type DepartmentCategory = 'COMPANY' | 'HQ' | 'TEAM' | 'PART' | 'PERSON' | 'EXTRA';

type Department = {
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
  userCount?: number;
  childrenCount?: number;
}

export default Department;