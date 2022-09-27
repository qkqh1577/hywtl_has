import {
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessShort
} from 'business/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { ProjectComplexTestVO } from 'project_complex/domain';

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

export interface ProjectBasicTest extends ProjectComplexTestVO {
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
  }
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
