import {UserVO} from "../user/domain";
import {DepartmentId, DepartmentVO} from "../department/domain";

export type DepartmentCategory = 'COMPANY' | 'HQ' | 'TEAM' | 'PART' | 'PERSON' | 'EXTRA';

type Department = {
  id: DepartmentId;
  name: string;
  parent?: Department;
  category: DepartmentCategory;
  seq: number;
  parentId?: number;
  note?: string;
  childrenList?: Department[];
  userList?: UserVO[];
}

export interface ListDepartment extends DepartmentVO {
  userCount: number;
  childrenCount: number;
}

export default Department;