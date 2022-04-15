import Department from 'services/department/entity';

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

type User = Omit<ListUser, 'departmentId' | 'departmentName'> & {
  department: Department;
  createdTime: Date;
  loginTime?: Date;
  passwordChangedTime?: Date;
}
export default User;
