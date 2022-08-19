/* 업체 */
import { ProjectId } from 'project/domain';


/** 재직 상태 */
export enum BusinessManagerStatus {
  /** 재직 */
  IN_OFFICE   = 'IN_OFFICE',
  /** 퇴사 */
  RESIGNATION = 'RESIGNATION',
  /** 휴직 */
  // LEAVE = 'LEAVE',
}

export const businessManagerStatusList: BusinessManagerStatus[] = [
  BusinessManagerStatus.IN_OFFICE,
  BusinessManagerStatus.RESIGNATION
];

export function businessManagerStatusName(status: BusinessManagerStatus) {
  switch (status) {
    case BusinessManagerStatus.IN_OFFICE:
      return '재직';
    case BusinessManagerStatus.RESIGNATION:
      return '퇴사';
    default:
      return '-';
  }
}

/* 업체 담당자 */
export type BusinessManagerId = number & { readonly _brand: symbol }

export function BusinessManagerId(id: number) {
  return id as BusinessManagerId;
}

export interface BusinessManagerVO {
  id?: BusinessManagerId;
  name: string;
  jobTitle?: string;
  department?: string;
  mobilePhone?: string;
  officePhone?: string;
  email?: string;
  meta?: string[];
  status: BusinessManagerStatus;
}

export const initialBusinessManagerVO: BusinessManagerVO = {
  name:        '',
  jobTitle:    '',
  department:  '',
  mobilePhone: '',
  officePhone: '',
  email:       '',
  meta:        [],
  status:      BusinessManagerStatus.IN_OFFICE,
};

export type BusinessId = number & { readonly _brand: symbol }

export function BusinessId(id: number) {
  return id as BusinessId;
}

export interface BusinessVO {
  id: BusinessId | '';
  name: string;
  ceoName?: string;
  officePhone?: string;
  registrationNumber: string;
  fax?: string;
  address?: string;
  note?: string;
  managerList: BusinessManagerVO[];
}

export interface BusinessShort
  extends BusinessVO {
  managerCount: number;
  projectCount: number;
}

export const initialBusiness: BusinessVO = {
  id:                 '',
  address:            '',
  ceoName:            '',
  managerList:        [initialBusinessManagerVO],
  name:               '',
  note:               '',
  officePhone:        '',
  registrationNumber: ''
};


/* 참여 or 경쟁 프로젝트 정보 */

export interface InvolvedProjectVO {
  id?: ProjectId;
  name: string;
  code: string;
  involvedType: InvolvedType;
  manager: string;
  beginDate: Date;
  closeDate: Date;
}

export interface RivalProjectVO {
  id?: ProjectId;
  code: string;
  name: string;
  bidBeginDate: Date;
  bidCloseDate: Date;
  win: string;
}

/** 관계사 유형 */
export enum InvolvedType {
  /** 발주처 */
  ORDERER       = 'ORDERER',
  /** 시공사 */
  BUILDER       = 'BUILDER',
  /** 건축설계사무소 */
  ARCHITECTURAL = 'ARCHITECTURAL',
  /** 구조설계사무소 */
  STRUCTURAL    = 'STRUCTURAL',
  /** 시행사 */
  ENFORCER      = 'ENFORCER',
  /** 소개자 */
  RECOMMENDER   = 'RECOMMENDER',
}

export const involvedTypeList: InvolvedType[] = [
  InvolvedType.ORDERER,
  InvolvedType.BUILDER,
  InvolvedType.ARCHITECTURAL,
  InvolvedType.STRUCTURAL,
  InvolvedType.ENFORCER,
  InvolvedType.RECOMMENDER,
];

export function involvedTypeName(type: InvolvedType | '') {
  switch (type) {
    case InvolvedType.ORDERER:
      return '발주처';
    case InvolvedType.BUILDER:
      return '시공사';
    case InvolvedType.ARCHITECTURAL:
      return '건축설계사무소';
    case InvolvedType.STRUCTURAL:
      return '구조설계사무소';
    case InvolvedType.ENFORCER:
      return '시행사';
    case InvolvedType.RECOMMENDER:
      return '소개자';
    default:
      return '-';
  }
}
