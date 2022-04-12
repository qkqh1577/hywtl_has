import Department from 'services/department/Department';

export type UserRole = 'NORMAL' | 'ADMIN' | 'MASTER';

export type ListUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
  departmentName: string;
}

type UserDetail = Omit<ListUser, 'departmentId' | 'departmentName'> & {
  department: Department;
  createdTime: Date;
  signedInTime?: Date;
  passwordChangedTime?: Date;
}
export default UserDetail;
