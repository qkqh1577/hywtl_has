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
  id: BusinessManagerId;
  name: string;
  jobTitle?: string;
  department?: string;
  mobilePhone?: string;
  officePhone?: string;
  email?: string;
  meta?: string[];
  status: BusinessManagerStatus;
}

export type BusinessId = number & { readonly _brand: symbol }

export function BusinessId(id: number) {
  return id as BusinessId;
}

export interface BusinessVO {
  id: BusinessId;
  name: string;
  ceoName?: string;
  officePhone?: string;
  registrationNumber: string;
  fax?: string;
  address?: string;
  note?: string;
  managerList: BusinessManagerVO[];
}

export interface BusinessShortVO
  extends BusinessVO {
  managerCount: number;
  projectCount: number;
}


/* 참여 or 경쟁 프로젝트 정보 */

export interface BusinessInvolvedProjectVO {
  id: ProjectId;
  name: string;
  code: string;
  involvedType: BusinessInvolvedType;
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
  win: BusinessShortVO;
}

/** 관계사 유형 */
export enum BusinessInvolvedType {
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

export const businessInvolvedTypeList: BusinessInvolvedType[] = [
  BusinessInvolvedType.ORDERER,
  BusinessInvolvedType.BUILDER,
  BusinessInvolvedType.ARCHITECTURAL,
  BusinessInvolvedType.STRUCTURAL,
  BusinessInvolvedType.ENFORCER,
  BusinessInvolvedType.RECOMMENDER,
];

export function businessInvolvedTypeName(type: BusinessInvolvedType | '') {
  switch (type) {
    case BusinessInvolvedType.ORDERER:
      return '발주처';
    case BusinessInvolvedType.BUILDER:
      return '시공사';
    case BusinessInvolvedType.ARCHITECTURAL:
      return '건축설계사무소';
    case BusinessInvolvedType.STRUCTURAL:
      return '구조설계사무소';
    case BusinessInvolvedType.ENFORCER:
      return '시행사';
    case BusinessInvolvedType.RECOMMENDER:
      return '소개자';
    default:
      return '-';
  }
}
