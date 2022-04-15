import Department, { DepartmentCategory } from 'services/department/entity';

export type DepartmentQuery = {
  page: number;
  size: number;
  parentId?: (number | null)[];
  category?: DepartmentCategory[];
  keywordType?: 'by_name';
  keyword?: string;
}

export type DepartmentChangeParameter = Omit<Department, 'seq' | 'childrenList' | 'userList'>;
export type DepartmentAddParameter = Omit<DepartmentChangeParameter, 'id'>;
export type DepartmentTreeParameter = {
  id: number;
  parentId?: number;
  seq: number;
};
export type DepartmentChangeTreeParameter = {
  list: DepartmentTreeParameter[];
};

