import { DepartmentVO } from 'department/domain';
import { FileItemView } from 'file-item';
import { initialDepartmentParameter } from 'department/parameter';

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

export interface UserVO {
  id?: UserId;
  role: UserRole;
  department: DepartmentVO;
  createdAt: Date;
  loginAt?: Date;
  passwordChangedAt?: Date;
  name: string;
  username: string;
  email: string;
  englishName?: string;
  sex?: string;
  mobilePhone?: string;
  privateEmail?: string;
  emergencyPhone?: string;
  relationship?: string;
  address?: string;
  birthDate?: Date;
  profile?: FileItemView;
}

export interface UserShortVO {
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  englishName: string | undefined;
  sex?: string;
  mobilePhone?: string | undefined;
  privateEmail?: string | undefined;
  emergencyPhone?: string | undefined;
  relationship?: string | undefined;
  address?: string | undefined;
  birthDate?: Date;
  profile?: FileItemView;
}

export const initialUser: UserVO = {
  name:           '',
  username:       '',
  email:          '',
  role:           UserRole.NORMAL,
  department:     initialDepartmentParameter as DepartmentVO,
  createdAt:      new Date(),
  englishName:    '',
  sex:            '',
  mobilePhone:    '',
  privateEmail:   '',
  emergencyPhone: '',
  relationship:   '',
  address:        '',
  birthDate:      undefined,
};

/**
 * 성별
 */
export enum SexType {
  /**
   * 남자
   */
  MALE   = 'MALE',

  /**
   * 여자
   */
  FEMALE = 'FEMALE',
}

export const sexTypeList: SexType[] = [
  SexType.MALE,
  SexType.FEMALE
];

export function sexTypeName(sexType: SexType | '') {
  switch (sexType) {
    case SexType.MALE:
      return '남자';
    case SexType.FEMALE:
      return '여자';
    default:
      return '-';
  }
}
