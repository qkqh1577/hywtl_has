import { FileItem } from 'services/common/file-item';
import { ListUser } from 'services/user';

export type ProjectTargetReviewStatus =
  'DRAFT'
  | 'DRAFT_CONFIRMED'
  | 'SENT'
  | 'RECONSIDER'
  | 'RECONSIDER_CONFIRMED'
  | 'RECONSIDER_SENT'
  | 'COMPLETE'
  ;

export type ProjectTargetDocument = {
  id: number;
  fileItem: FileItem;
  writer: ListUser;
  memo?: string;
  createdAt: Date;
  modifiedAt?: Date;
}

export type ListProjectTargetReview = {
  id: number;
  status: ProjectTargetReviewStatus;
  confirmed: boolean;
  code: string;
  detailCount: number;
  testList: string[];
  fileCount: number;
  writer: ListUser;
  createdAt: Date;
  modifiedAt?: Date;
}

export type ProjectTargetReviewDetail = {
  id: number;
  buildingName: string;
  floorCount: number;
  baseCount?: number;
  height: number;
  area: number;
  ratio: number;
  specialWindLoadConditionList?: string[];
  testList: string[];
  memo1?: string;
  memo2?: string;
}

export type ProjectTargetReview = {
  id: number;
  status: ProjectTargetReviewStatus;
  confirmed: boolean;
  code: string;
  landFigureCount?: number;
  detailList: ProjectTargetReviewDetail[];
  testList?: string[];
  fileList?: FileItem[];
}
