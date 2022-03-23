import { DepartmentCategory } from 'department/Department';

export type DepartmentAddParameter = {
  name: string;
  category: DepartmentCategory;
  parentId?: number;
  memo?: string;
}
