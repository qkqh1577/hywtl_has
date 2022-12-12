import { UserShortVO } from 'user/domain';

export type ProjectCollectionStageId = number & { readonly _brand: unique symbol; }

export function ProjectCollectionStageId(id: number) {
  return id as ProjectCollectionStageId;
}

export enum ProjectCollectionStageStatusType {
  ASKED     = 'ASKED',
  COLLECTED = 'COLLECTED',
  CARRYOVER = 'CARRYOVER',
}

export const projectCollectionStageStatusTypeList: ProjectCollectionStageStatusType[] = [
  ProjectCollectionStageStatusType.ASKED,
  ProjectCollectionStageStatusType.COLLECTED,
  ProjectCollectionStageStatusType.CARRYOVER,
];

export function projectCollectionStageStatusTypeName(type: ProjectCollectionStageStatusType): string {
  switch (type) {
    case ProjectCollectionStageStatusType.ASKED:
      return '청구';
    case ProjectCollectionStageStatusType.COLLECTED:
      return '수금';
    case ProjectCollectionStageStatusType.CARRYOVER:
      return '이월';
    default:
      return '-';
  }
}

export interface ProjectCollectionStageStatusVO {
  type: ProjectCollectionStageStatusType;
  requestedDate?: Date;
  expectedDate?:Date;
  delayedDate?:Date;
  amount?: number;
  note?: string;
  modifiedAt: Date;
}

export interface ProjectCollectionStageVersionVO {
  name: string;
  amount: number;
  rate: number;
  note?: string;
  expectedDate: Date;
  reason: string;
  modifiedAt: Date;
  statusList: ProjectCollectionStageStatusVO[];
}

export interface ProjectCollectionStageShortVO {
  id: ProjectCollectionStageId;
  name: string;
  rate: number;
  amount: number;
  expectedDate: Date;
  modifiedAt: Date;
  /**
   * 청구일
   */
  askedDate?: Date;
  /**
   * 청구액
   */
  askedAmount?: number;
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
  /**
   * 이월일
   */
  carryoverDate?: Date;
  /**
   * 이월 금액
   */
  carryoverAmount?: number;
}

export interface ProjectCollectionStageVO {
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
   * 기성 총 금액(원)
   */
  amount: number;
  /**
   * 예정일
   */
  expectedDate: Date;
  /**
   * 기성 조건
   */
  note?: string;
  modifiedAt: Date;
  statusList: ProjectCollectionStageStatusVO[];
  versionList: ProjectCollectionStageVersionVO[];
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
