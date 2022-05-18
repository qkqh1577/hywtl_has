import { ProjectTargetReviewStatus } from 'services/project_target';
import { FileItemView } from 'services/common/file-item';

export type ProjectTargetReviewDetailView = {
  id?: number;
  buildingName: string;
  floorCount: number | '';
  baseCount: number | '';
  height: number | '';
  area: number | '';
  ratio: number | '';
  specialWindLoadConditionList: string[];
  testList: string[];
  memo1: string;
  memo2: string;
}

export type ProjectTargetReviewView = {
  confirmed: 'Y' | 'N';
  status: ProjectTargetReviewStatus | '';
  code: string;
  landFigureCount: number | '';
  detailList: ProjectTargetReviewDetailView[];
  testList: string[];
  fileList: FileItemView[];
}

export type ProjectTargetDocumentView = {
  fileItem: FileItemView | null;
  memo: string;
}

export const initProjectTargetDetailReview: ProjectTargetReviewDetailView = {
  buildingName: '',
  floorCount: '',
  baseCount: '',
  height: '',
  area: '',
  ratio: '',
  specialWindLoadConditionList: [],
  testList: [],
  memo1: '',
  memo2: '',
};

export const initProjectTargetReview: ProjectTargetReviewView = {
  confirmed: 'N',
  status: '',
  code: '',
  landFigureCount: '',
  testList: [],
  detailList: [initProjectTargetDetailReview],
  fileList: [],
};

export const initProjectTargetDocument: ProjectTargetDocumentView = {
  fileItem: null,
  memo: '',
};
