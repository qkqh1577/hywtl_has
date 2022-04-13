import Department, { DepartmentCategory } from './Department';

export type DepartmentQuery = {
  page: number;
  size: number;
  parentId?: (number | null)[];
  category?: DepartmentCategory[];
  keywordType?: 'by_name';
  keyword?: string;
}

export type DepartmentAddParameter = Omit<Department, 'id' | 'seq' | 'childrenList' | 'userList'>;

export type DepartmentChangeParameter = Omit<Department, 'parentId' | 'childrenList' | 'userList'>;
