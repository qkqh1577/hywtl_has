import {
  DepartmentId,
  DepartmentVO
} from 'department/domain';

export interface DepartmentParameter
  extends Omit<DepartmentVO,
    | 'id'
    | 'seq'
    | 'userList'
    | 'childrenList'> {
  id?: DepartmentId;
}

export const initialDepartmentParameter = {
  edit: true
} as unknown as DepartmentParameter;