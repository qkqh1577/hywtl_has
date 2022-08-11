import { DepartmentVO } from 'department/domain';

export interface DepartmentParameter
  extends Omit<DepartmentVO, | 'seq' | 'userList' | 'childrenList'> {

}