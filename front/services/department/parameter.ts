import { Department, DepartmentCategory } from 'services/department';

export type DepartmentQuery = {
  page: number;
  size: number;
  parentId?: (number | null)[];
  category?: DepartmentCategory[];
  keywordType?: 'by_name';
  keyword?: string;
}

export type DepartmentParameter = Omit<Department, 'id' | 'seq' | 'childrenList' | 'userList'> & {
  id?: number;
};

export type DepartmentTreeParameter = {
  id: number;
  parentId?: number;
  seq: number;
};

export type DepartmentChangeTreeParameter = {
  list: DepartmentTreeParameter[];
};
