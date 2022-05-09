import {
  ProjectTargetReviewStatus
} from 'services/project/entity';

export type ProjectFilterView = {
  page: number;
  size: number;
  keyword: string;
}

export type ProjectBasicView = {
  name: string;
  code: string;
  alias: string;
  salesManagerId: number | '';
  projectManagerId: number | '';
  address: string;
  purpose1: string;
  purpose2: string;
  lotArea: number | '';
  totalArea: number | '';
  buildingCount: number | '';
  householdCount: number | '';
  floorCount: number | '';
  baseCount: number | '';
  clientName: string;
  isClientLH: string;
  clientManager: string;
  clientPhone: string;
  clientEmail: string;
}

export type ProjectOrderView = {
  amount: number | '';
  receivedDate: Date | null;
  beginDate: Date | null;
  closeDate: Date | null;
  isOnGoing: string;
}

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

export const initProjectFilter: ProjectFilterView = {
  page: 0,
  size: 10,
  keyword: '',
};

export const initProjectBasic: ProjectBasicView = {
  name: '',
  code: '',
  alias: '',
  salesManagerId: '',
  projectManagerId: '',
  address: '',
  purpose1: '',
  purpose2: '',
  lotArea: '',
  totalArea: '',
  buildingCount: '',
  householdCount: '',
  floorCount: '',
  baseCount: '',
  clientName: '',
  isClientLH: '',
  clientManager: '',
  clientPhone: '',
  clientEmail: '',
};

export const initProjectOrder: ProjectOrderView = {
  amount: '',
  receivedDate: null,
  beginDate: null,
  closeDate: null,
  isOnGoing: '',
};

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

