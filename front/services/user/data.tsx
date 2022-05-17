import { UserRole } from 'services/user';

export const userRoleList: UserRole[] = [
  'NORMAL',
  'ADMIN',
  'MASTER'
];

export const userRoleName = (userRole: UserRole): string => {
  switch (userRole) {
    case 'NORMAL':
      return '일반';
    case 'ADMIN':
      return '관리자';
    case 'MASTER':
      return '최고관리자';
    default:
      return '-';
  }
};
