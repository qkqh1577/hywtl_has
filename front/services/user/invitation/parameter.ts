import { UserRole } from 'services/user';

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
