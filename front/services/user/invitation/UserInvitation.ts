import Department from 'services/department/entity';
import { UserRole } from 'services/user/entity';

type UserInvitation = {
  name: string;
  email: string;
  department: Department;
  userRole: UserRole;
}

export default UserInvitation;
