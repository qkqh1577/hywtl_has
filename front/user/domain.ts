import {
  DepartmentVO,
  initialDepartment
} from 'department/domain';

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
  name: string;
  username: string;
  email: string;
  role: UserRole;
  department: DepartmentVO;
  createdAt: Date;
  loginAt?: Date;
  passwordChangedAt?: Date;
  englishName?: string;
  sex?: string;
  mobilePhone?: string;
  privateEmail?: string;
  emergencyPhone?: string;
  relationShip?: string;
  address?: string;
  birthDate?: Date;
}

export interface UserShort{
  name: string;
  username: string;
  email: string;
  englishName?: string;
  sex?: string;
  mobilePhone?: string;
  privateEmail?: string;
  emergencyPhone?: string;
  relationShip?: string;
  address?: string;
  birthDate?: Date;
}

export const initialUser: UserVO = {
  name:       '',
  username:   '',
  email:      '',
  role:       UserRole.NORMAL,
  department: initialDepartment,
  createdAt:  new Date(),
  englishName: '',
  sex: '',
  mobilePhone: '',
  privateEmail: '',
  emergencyPhone: '',
  relationShip: '',
  address: '',
  birthDate: undefined,
};
