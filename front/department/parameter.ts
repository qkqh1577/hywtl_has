import Department, { DepartmentCategory } from 'department/Department';

export type DepartmentQuery = {
  page: number;
  size: number;
  parentId?: number;
  category: DepartmentCategory[];
}

export type DepartmentAddParameter = Omit<Department, 'id' | 'seq' | 'childrenList' | 'userList'>;

export type DepartmentChangeParameter = Omit<Department, 'parentId' | 'childrenList' | 'userList'>;
