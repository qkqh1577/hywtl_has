import { ListUser } from 'services/user';
import { FileItem } from 'services/common/file-item';

export type ProjectReviewStatus =
  'DRAFT'
  | 'DRAFT_CONFIRMED'
  | 'SENT'
  | 'RECONSIDER'
  | 'RECONSIDER_CONFIRMED'
  | 'RECONSIDER_SENT'
  | 'COMPLETE'
  ;

export type ListProjectReview = {
  id: number;
  status: ProjectReviewStatus;
  confirmed: boolean;
  code: string;
  detailCount: number;
  testList: string[];
  fileCount: number;
  writer: ListUser;
  createdAt: Date;
  modifiedAt?: Date;
}

export type ProjectReviewDetail = {
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

export type ProjectReview = {
  id: number;
  status: ProjectReviewStatus;
  confirmed: boolean;
  code: string;
  landFigureCount?: number;
  detailList: ProjectReviewDetail[];
  testList?: string[];
  fileList?: FileItem[];
}
