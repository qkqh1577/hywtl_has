import {
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessShort
} from 'business/domain';

export type ProjectBasicBusinessId = number & { readonly _brand: unique symbol; }

export function ProjectBasicBusinessId(id: number) {
  return id as ProjectBasicBusinessId;
}

export interface ProjectBasicBusiness {
  id: ProjectBasicBusinessId;
  business: BusinessShort;
  businessManager: BusinessManagerVO;
  involvedType: BusinessInvolvedType;
  modifiedAt: Date;
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


export interface ProjectBasicFailReason {
  win: BusinessShort;
  testAmount: number;
  reviewAmount: number;
  totalAmount: number;
  expectedDuration: string;
  reason: string;
  modifiedAt: Date;
}
