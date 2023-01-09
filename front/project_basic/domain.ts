import {
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessShortVO
} from 'business/domain';
import { UserShortVO } from 'user/domain';

export type ProjectBasicContributorId = number & { readonly _brand: unique symbol; };

export function ProjectBasicContributorId(id: number) {
  return id as ProjectBasicContributorId;
}

interface ProjectBasicContributorVO {
  id: ProjectBasicContributorId;
  rate?: number;
  modifiedAt: Date;
}

export interface ProjectBasicInternalContributorVO
  extends ProjectBasicContributorVO {
  user?: UserShortVO;
}

export interface ProjectBasicExternalContributorVO
  extends ProjectBasicContributorVO {
  business?: BusinessShortVO;
  businessManager?: BusinessManagerVO;
}

export type ProjectBasicBusinessId = number & { readonly _brand: unique symbol; }

export function ProjectBasicBusinessId(id: number) {
  return id as ProjectBasicBusinessId;
}

export interface ProjectBasicBusiness {
  id: ProjectBasicBusinessId;
  business: BusinessShortVO;
  businessManager: BusinessManagerVO;
  involvedType: BusinessInvolvedType;
  modifiedAt: Date;
}

export interface ProjectBasicDesignVO {
  city1?: string; // 시/도1
  city2?: string; // 시/도2
  address?: string; // 주소
  complexCount?: number; // 단지 수
  purpose1?: string; // 건물 용도 1
  purpose2?: string; // 건물 용도 2
  lotArea?: number; // 대지면적
  totalArea?: number; // 연면적
  totalBuildingCount?: number; // 총 동 수
  householdCount?: number; // 세대 수
  maximumFloor?: number; // 최고 층 수
  maximumHeight?: number; // 최고 높이
  modifiedAt?: Date; // 최종수정일시
}


export interface ProjectBasicFailReasonVO {
  win: BusinessShortVO;
  testAmount: number;
  reviewAmount: number;
  totalAmount: number;
  expectedDuration: string;
  reason: string;
  modifiedAt: Date;
}

/**
 * 기본 정보 설계 개요 건물용도 1
 */
export enum BuildingPurpose1Type {
  /**
   * LH
   */
  LH     = 'LH',
  /**
   * 기타
   */
  ETC     = '기타',

  /**
   * 일반 건축
   */
  GENERAL_ARCHITECTURE = '일반건축',

  /**
   * 정비 사업
   */
  MAINTENANCE_BUSINESS = '정비사업',
  /**
   * 지역주택조합
   */
  REGIONAL_HOUSING_COOPERATIVE = '지역주택조합',
}

/**
 * 기본 정보 설계 개요 건물용도 2
 */
export enum BuildingPurpose2Type {
  /**
   * 아파트
   */
  APARTMENT_HOUSE  = '아파트',
  /**
   * 주거복합
   */
  RESIDENTIAL_COMPLEX = '주거복합',
  /**
   * 일반건축
   */
  GENERAL_ARCHITECTURE = '일반건축',
  /**
   * 오피스텔
   */
  OFFICE_TEL = '오피스텔',
  /**
   * 주상복합
   */
  RESIDENTIAL_COMMERCIAL_BUILDING = '주상복합',
  /**
   * 기타
   */
  ETC   = '기타'
}

export const buildingPurpose1List: BuildingPurpose1Type[] = [
  BuildingPurpose1Type.MAINTENANCE_BUSINESS,
  BuildingPurpose1Type.GENERAL_ARCHITECTURE,
  BuildingPurpose1Type.REGIONAL_HOUSING_COOPERATIVE,
  BuildingPurpose1Type.LH,
  BuildingPurpose1Type.ETC
];

export const buildingPurpose2List: BuildingPurpose2Type[] = [
  BuildingPurpose2Type.APARTMENT_HOUSE,
  BuildingPurpose2Type.OFFICE_TEL,
  BuildingPurpose2Type.RESIDENTIAL_COMMERCIAL_BUILDING,
  BuildingPurpose2Type.RESIDENTIAL_COMPLEX,
  BuildingPurpose2Type.GENERAL_ARCHITECTURE,
  BuildingPurpose2Type.ETC
];

export function buildingPurpose1Name(type: BuildingPurpose1Type | '') {
  switch (type) {
    case BuildingPurpose1Type.MAINTENANCE_BUSINESS:
      return '정비사업';
    case BuildingPurpose1Type.GENERAL_ARCHITECTURE:
      return '일반건축';
    case BuildingPurpose1Type.REGIONAL_HOUSING_COOPERATIVE:
      return '지역주택조합';
    case BuildingPurpose1Type.LH:
      return 'LH';
    case BuildingPurpose1Type.ETC:
      return '기타';
    default:
      return '-';
  }
}

export function buildingPurpose2Name(type: BuildingPurpose2Type | '') {
  switch (type) {
    case BuildingPurpose2Type.APARTMENT_HOUSE:
      return '아파트';
    case BuildingPurpose2Type.OFFICE_TEL:
      return '오피스텔';
    case BuildingPurpose2Type.RESIDENTIAL_COMMERCIAL_BUILDING:
      return '주상복합';
    case BuildingPurpose2Type.RESIDENTIAL_COMPLEX:
      return '주거복합';
    case BuildingPurpose2Type.GENERAL_ARCHITECTURE:
      return '일반주택';
    case BuildingPurpose2Type.ETC:
      return '기타';
    default:
      return '-';
  }
}

/* 시군구 api */

export interface CityDataVO {
  code: string,
  name: string
}

export enum NO_DATA {
  NO_OPTION = 'NO_OPTION',
}
