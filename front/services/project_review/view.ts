import { FileItemView } from 'services/common/file-item';
import { ProjectReviewStatus } from 'services/project_review';

export type ProjectReviewDetailView = {
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

export type ProjectReviewView = {
  confirmed: 'Y' | 'N';
  status: ProjectReviewStatus | '';
  code: string;
  landFigureCount: number | '';
  detailList: ProjectReviewDetailView[];
  testList: string[];
  fileList: FileItemView[];
}

export const initProjectDetailReview: ProjectReviewDetailView = {
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

export const initProjectReview: ProjectReviewView = {
  confirmed: 'N',
  status: '',
  code: '',
  landFigureCount: '',
  testList: [],
  detailList: [initProjectDetailReview],
  fileList: [],
};
