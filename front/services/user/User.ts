export type UserRole = '';

type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  userRole: UserRole;
  departmentId: number;
}

export default User;
