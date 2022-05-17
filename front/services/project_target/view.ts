import { ProjectTargetReviewStatus } from 'services/project_target';
import { FileItemView } from 'services/common/file-item';

export type ProjectTargetView = {
  landModelCount: number | '';
}

export type ProjectTargetReviewDetailView = {
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
  status: ProjectTargetReviewStatus | '';
  confirmed: 'Y' | 'N' | '';
  title: string;
  memo: string;
  detailList: ProjectTargetReviewDetailView[];
}

export type ProjectTargetDocumentView = {
  fileItem: FileItemView | null;
  memo: string;
}
export const initProjectTarget: ProjectTargetView = {
  landModelCount: '',
};

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
  status: '',
  confirmed: '',
  title: '',
  memo: '',
  detailList: [initProjectTargetDetailReview],
};

export const initProjectTargetDocument: ProjectTargetDocumentView = {
  fileItem: null,
  memo: '',
};
