import {
  ProjectStatus,
  ProjectTargetReviewStatus
} from 'services/project/entity';

export const projectStatusName = (status: ProjectStatus): string => {
  if (status === 'ON_GOING') {
    return '진행중';
  }
  if (status === 'TEMPLATE') {
    return '가등록';
  }
  return '';
};

export const projectTargetReviewStatusName = (status: ProjectTargetReviewStatus): string => {
  if (status === 'DRAFT') {
    return '초안';
  }
  if (status === 'RECONSIDER') {
    return '재검토';
  }
  if (status === 'COMPLETE') {
    return '완료';
  }
  return '';
};

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

