import { DepartmentVO } from 'department/domain';
import { FileItemView } from 'file-item';

/**
 * 유저 권한
 */
export enum UserRole {
  /** 일반 */
  NORMAL = 'NORMAL',
  /** 관리자 */
  ADMIN  = 'ADMIN',
  /** 최고관리자 */
  MASTER = 'MASTER'
}

export const userRoleList: UserRole[] = [
  UserRole.NORMAL,
  UserRole.ADMIN,
  UserRole.MASTER,
];

export function userRoleName(role: UserRole) {
  switch (role) {
    case UserRole.NORMAL:
      return '일반';
    case UserRole.ADMIN:
      return '관리자';
    case UserRole.MASTER:
      return '최고관리자';
  }
}

export type UserId = number & { readonly _brand: symbol };

export function UserId(id: number) {
  return id as UserId;
}

export interface UserShortVO {
  id: UserId;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  department: DepartmentVO;
  profile?: FileItemView;
}

export interface UserVO
  extends UserShortVO {
  englishName?: string;
  sex?: string;
  mobilePhone?: string;
  privateEmail?: string;
  emergencyPhone?: string;
  relationship?: string;
  address?: string;
  birthDate?: Date;
  createdAt: Date;
  loginAt?: Date;
  passwordChangedAt?: Date;
}

export enum SexCategory {
  MALE   = '남성',
  FEMALE = '여성',
}

export const sexCategoryList: SexCategory[] = [
  SexCategory.MALE,
  SexCategory.FEMALE
];
