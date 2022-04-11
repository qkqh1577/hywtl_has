import { UserRole } from 'services/user/User';

export type UserInvitationQuery = {
  email: string;
  authKey: string;
}

export type UserInvitationInviteParameter = {
  name: string;
  email: string;
  userRole: UserRole;
  departmentId: number;
};
