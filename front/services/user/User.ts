export type UserRole = 'NORMAL' | 'ADMIN' | 'MASTER';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
  departmentName: string;
}

export default User;
