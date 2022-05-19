import { ProjectReviewStatus } from 'services/project_review';
import { FileItemParameter } from 'services/common/file-item';

export type ProjectReviewDetailParameter = {
  id?: number;
  buildingName: string;
  floorCount: number;
  baseCount?: number;
  height: number;
  area: number;
  ratio: number;
  specialWindLoadConditionList: string[];
  testList: string[];
  memo1?: string;
  memo2?: string;
}

export type ProjectReviewParameter = {
  status: ProjectReviewStatus;
  code: string;
  landFigureCount?: number;
  testList?: string[];
  detailList: ProjectReviewDetailParameter[];
  fileList?: FileItemParameter[];
}