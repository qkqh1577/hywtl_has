import { UserShortVO } from 'user/domain';

export type ProjectCollectionStageId = number & { readonly _brand: unique symbol; }

export function ProjectCollectionStageId(id: number) {
  return id as ProjectCollectionStageId;
}

export interface ProjectCollectionStageShortVO {
  id: ProjectCollectionStageId;
  /**
   * 기성명
   */
  name: string;
  /**
   * 비율(%)
   */
  rate: number;
  /**
   * 청구 금액(원)
   */
  amount: number;
  /**
   * 예정일
   */
  expectedDate: Date;
  /**
   * 청구일
   */
  askedDate?: Date;
  /**
   * 수금일
   */
  collectedDate?: Date;
  /**
   * 수금액
   */
  collectedAmount?: number;
  /**
   * 수금 비율
   */
  collectedRate?: number;
  modifiedAt: Date;
}

export interface ProjectCollectionStageVO
  extends ProjectCollectionStageShortVO {
  /**
   * 기성 조건
   */
  note?: string;
  /**
   * 이월 사유
   */
  reason?: string;
}

export type ProjectCollectionId = number & { readonly _brand: unique symbol; };

export function ProjectCollectionId(id: number) {
  return id as ProjectCollectionId;
}

export interface ProjectCollectionVO {
  id: ProjectCollectionId;
  user?: UserShortVO;
  stageList: ProjectCollectionStageShortVO[];
  modifiedAt: Date;
}