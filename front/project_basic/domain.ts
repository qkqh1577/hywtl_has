import {
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessShort
} from 'business/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectBasicBidType } from 'project_status/domain';
import { UserVO } from 'user/domain';
import { ProjectId } from 'project/domain';

export interface ProjectBasic {
  id: ProjectId;
  code?: string;
  name: string;
  alias: string;
  bidType: ProjectBasicBidType;
  receptionManager: UserVO;
  salesManager?: UserVO;
  projectManager?: UserVO;
  expectedMonth?: Date;
  requestedMonth?: Date;
  isLh?: boolean;
  modifiedAt?: Date;
}

export type ProjectBasicBusinessId = number & { readonly _brand: unique symbol; }

export function ProjectBasicBusinessId(id: number) {
  return id as ProjectBasicBusinessId;
}

export interface ProjectBasicBusiness {
  id: ProjectBasicBusinessId;
  business: BusinessShort;
  businessManager: BusinessManagerVO;
  involvedType: BusinessInvolvedType;
}

export interface ProjectBasicDesign {
  city?: string; // 시/도
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

export interface ProjectBasicTest
  extends ProjectComplexTestVO {
}

export interface ProjectBasicEstimate {
  estimate?: ProjectBasicEstimateVO;
  rivalEstimateList?: RivalEstimateVO[];
}

// TODO: API 사양과 해당 Domain 불일치로 임시로 정의 및 사용
export interface ProjectBasicEstimateVO {
  code: string;
  confirmed: boolean;
  plan?: {
    estimateDate?: Date;
    testAmount?: number;
    reviewAmount?: number;
    totalAmount?: number;
    expectedDuration?: string;
  };
}

export interface ProjectBasicBid {
  bid?: ProjectBidVO;
  rivalBidList?: RivalBidVO[];
}

// TODO: 현재 구현부가 없음으로 임시로 정의 및 사용
export type RivalBidId = number & { readonly _brand: unique symbol; }

export function RivalBidId(id: number) {
  return id as RivalBidId;
}

export interface RivalBidVO {
  id: RivalBidId;
  business?: BusinessShort;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
  modifiedAt: Date;
}

// TODO: 협의 중이므로 임시로 정의 및 사용
export interface ProjectBasicContract {
  orderer1?: string;
  orderer2?: string;
  orderer3?: string;
  orderer4?: string;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
  projectContractCollectionStageList?: {
    name: string; // 단계명
    ratio: number; // 비율
    condition: string; // 조건
    note?: string; // 비고
  }[];
}

export interface ProjectBasicFailReason {
  win?: BusinessShort; // 수주 업체
  testAmount?: number; // 풍동 금액
  reviewAmount?: number; // 구검 금액
  totalAmount?: number; // 총액
  expectedDuration?: string; // 일정
  reason?: string; // 원인
  modifiedAt: Date;
}
