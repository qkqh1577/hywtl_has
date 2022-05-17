import { Department } from 'services/department';
import { UserRole } from 'services/user';

export type UserInvitation = {
  name: string;
  email: string;
  department: Department;
  userRole: UserRole;
}
