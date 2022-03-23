import User from 'user/User';

export type DepartmentCategory = 'COMPANY' | 'HQ' | 'TEAM' | 'PART' | 'PERSON' | 'EXTRA';

type Department = {
  id: number;
  name: string;
  category: DepartmentCategory;
  parentId?: number;
  memo?: string;
  childrenList: Department[];
  userList: User[];
}

export default Department;