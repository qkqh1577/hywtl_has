import { ProjectEstimateSheetStatus } from 'services/project_estimate';

export type ProjectEstimateView = {
  receivedDate: Date | null;
  figureLevel: string;
  testLevel: string;
  reportLevel: string;
}

export type ProjectEstimateSheetDetailView = {
  title: string;
  subTitleList: string[];
  unit: string;
  count: number | '';
  unitPrice: number | '';
  totalPrice: number | '';
  isIncluded: boolean;
  memo: string;
}

export type ProjectEstimateSheetCommentView = {
  description: string;
  inUse: boolean;
}

export type ProjectEstimateSheetView = {
  confirmed: 'Y' | 'N' | '';
  status: ProjectEstimateSheetStatus | '';
  title: string;
  memo: string;
  estimateDate: Date | null;
  expectedStartMonth: Date | null;
  salesTeamLeaderId: number | '';
  salesManagementLeaderId: number | '';
  reviewId: number | '';
  detailList: ProjectEstimateSheetDetailView[];
  specialDiscount: number | '';
  commentList: ProjectEstimateSheetCommentView[];
}

export const initProjectEstimateView: ProjectEstimateView = {
  receivedDate: null,
  figureLevel: '',
  testLevel: '',
  reportLevel: '',
};

export const initProjectEstimateSheetView: ProjectEstimateSheetView = {
  confirmed: '',
  status: '',
  title: '',
  memo: '',
  estimateDate: null,
  expectedStartMonth: null,
  salesTeamLeaderId: '',
  salesManagementLeaderId: '',
  reviewId: '',
  detailList: [],
  specialDiscount: '',
  commentList: [],
};
