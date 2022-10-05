import { UserVO } from 'user/domain';

export type DepartmentId = number & { readonly _brand: symbol }

/**
 * 조직 유형
 */
export enum DepartmentCategory {
  /** 회사 */
  COMPANY = 'COMPANY',
  /** 본부 */
  HQ      = 'HQ',
  /** 팀 */
  TEAM    = 'TEAM',
  /** 파트 */
  PART    = 'PART',
  /** 개인 */
  PERSON  = 'PERSON',
  /** 기타 */
  EXTRA   = 'EXTRA'
}

export const departmentCategoryList: DepartmentCategory[] = [
  DepartmentCategory.COMPANY,
  DepartmentCategory.HQ,
  DepartmentCategory.TEAM,
  DepartmentCategory.PART,
  DepartmentCategory.PERSON,
  DepartmentCategory.EXTRA
];

export function departmentCategoryName(category: DepartmentCategory | '') {
  switch (category) {
    case DepartmentCategory.COMPANY:
      return '회사';
    case DepartmentCategory.HQ:
      return '본부';
    case DepartmentCategory.TEAM:
      return '팀';
    case DepartmentCategory.PART:
      return '파트';
    case DepartmentCategory.PERSON:
      return '개인';
    case DepartmentCategory.EXTRA:
      return '기타';
    default:
      return '-';
  }
}

export function DepartmentId(id: number) {
  return id as DepartmentId;
}

export interface DepartmentVO {
  id: DepartmentId;
  name: string;
  parent?: DepartmentVO;
  category: DepartmentCategory;
  seq: number;
  parentId?: number;
  note?: string;
  childrenList?: DepartmentVO[];
  userList?: UserVO[];
}

export interface DepartmentShort
  extends DepartmentVO {
  userCount: number;
  childrenCount: number;
}
