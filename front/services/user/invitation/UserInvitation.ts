import Department from 'services/department/Department';
import { UserRole } from 'services/user/User';

type UserInvitation = {
  name: string;
  email: string;
  department: Department;
  userRole: UserRole;
}

export default UserInvitation;
