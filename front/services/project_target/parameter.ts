import { FileItemParameter } from 'services/common/file-item';
import { ProjectTargetReviewStatus } from 'services/project_target';

export type ProjectTargetDocumentAddParameter = {
  fileItem: FileItemParameter;
  memo?: string;
}

export type ProjectTargetDocumentChangeParameter = {
  memo?: string;
}
export type ProjectTargetReviewDetailParameter = {
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

export type ProjectTargetReviewParameter = {
  status: ProjectTargetReviewStatus;
  code: string;
  landFigureCount?: number;
  testList?: string[];
  detailList: ProjectTargetReviewDetailParameter[];
  fileList?: FileItemParameter[];
}