import { DepartmentVO } from 'department/domain/department';

export interface DepartmentParameter
  extends Omit<DepartmentVO, |'seq'> {

}