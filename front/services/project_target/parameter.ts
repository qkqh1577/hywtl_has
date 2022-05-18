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
  title: string;
  confirmed: boolean;
  status: ProjectTargetReviewStatus;
  memo?: string;
  detailList: ProjectTargetReviewDetailParameter[];
}

export type ProjectTargetParameter = {
  landModelCount?: number;
}